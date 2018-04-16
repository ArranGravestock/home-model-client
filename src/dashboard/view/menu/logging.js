import React, {Component} from 'react';
import 'whatwg-fetch';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {ErrorCard} from '../card';
import '../../css/logging.css'


class Logging extends Component {

  state = {
    data: [],
  }

  componentWillMount() {
    if (localStorage.deviceid) {
      fetch(`http://localhost:3000/device/${localStorage.deviceid}/top/1000`, {credentials: 'include', headers: { 'Access-Control-Allow-Origin':'localhost:3001',}})
      .then(res => res.json())
      .then(json => {
        var logs = json.map(log => {
          return (
            {
              date: log.CreatedAt.slice(0, 10),
              time: log.CreatedAt.slice(11, 19),
              name: log.ThingName,
              state: log.ThingState,
              type: log.ThingType
            }
          )
          })
          this.setState({data: logs});
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      var errCard = <ErrorCard error="no device found" type="warning"/>
      this.setState({err: errCard})
    }
  }

  columns = [
    {
      Header: 'Date',
      accessor: 'date',
    },{
      Header: 'Time',
      accessor: 'time',
    }, {
      Header: 'Name',
      accessor: 'name', 
    }, 
    {
      Header: 'Type',
      accessor: 'type'
    },
    {
      Header: 'State',
      accessor: 'state'
    }
  ]

  render() {

    return(
      <div>
        {this.state.err}
        <div className="card card-misc">
          
            <div className="card-header">
                <h1>Data Logging</h1>
            </div>
            <div className="card-content" style={{padding: 0}}>
                <ReactTable className="-striped -highlight" data={this.state.data} columns={this.columns} filterable={true} resizable={false} style={{ height: 'calc(100vh - 10em)',}}/>
            </div>
        </div>
      </div>
    )
  }
}

export default Logging;