import React, {Component} from 'react';
import 'whatwg-fetch';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Admin extends Component {
    state = {
        data: [],
    }

    columns = [
        {
            Header: 'Username',
            accessor: 'username',
        },
        {
            Header: 'Admin',
            accessor: 'admin'
        },
        {
            Header: 'Remove',
            accessor: 'remove'
        }
    ]

    componentWillMount() {
    if (localStorage.deviceid) {
        fetch(`http://localhost:3000/registeredusers/device/${localStorage.deviceid}`, {credentials: 'include', method: 'GET', headers: { 'Access-Control-Allow-Origin':'localhost:3001',}})
        .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw Error(res.statusText)
        }
        })
        .then(json => {
            var logs = json.map(log => {
                return (
                    {
                        username: log.UserName,
                        admin: log.Admin
                    }
                )
            })
            this.setState({data: logs});
        })
        .catch(err => {
            console.log(err);
        })
        } else {
            console.log("no device id associated with user");
        }
    }

    render() {
        return (
        <div style={{width: '100%'}}>
            <div className="card card-misc">
            
                <div className="card-header">
                    <h1>[{localStorage.device}] User's Registered</h1>
                </div>
                <div className="card-content" style={{padding: 0}}>
                    <ReactTable className="-striped -highlight"  data={this.state.data} columns={this.columns} filterable={false} resizable={false} style={{ height: 'calc(100vh - 10em)',}}/>
                </div>
            </div>
        </div>
        )
    }
}

class Lights extends Component {

  state = {}

  componentWillMount() {
    if (localStorage.deviceid) {
      fetch(`http://localhost:3000/checkadmin/device/${localStorage.deviceid}`, {credentials: 'include', method: 'POST', headers: { 'Access-Control-Allow-Origin':'localhost:3001',}})
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw Error(res.statusText)
        }
      })
      .then(json => {
          if (json[0].Admin) {
              this.setState({content: <Admin/>});
          } else {
              console.log("not an admin");
          }
      })
      .catch(err => {
        console.log(err);
      })
        } else {
            console.log("no device id associated with user");
        }
    }

  render() {
    return(
      <div className="content">
        {this.state.content}
      </div>
    )
  }
}

export default Lights;