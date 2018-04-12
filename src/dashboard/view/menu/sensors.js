import React, {Component} from 'react';
import 'whatwg-fetch';
import {ChartCard, ErrorCard} from '../card';


class Sensors extends Component {

  state = {}

  componentWillMount() {
    if (localStorage.deviceid) {
      fetch(`http://localhost:3000/device/${localStorage.deviceid}/sensors`, {credentials: 'include'})
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw Error(res.statusText)
        }
      })
      .then(json => {
        console.log(json);
        var sensors = json.map(sensor => {
          return(
            <ChartCard key={sensor.ThingID} deviceid={localStorage.deviceid} sensorid={sensor.ThingID}/>
          )
        })
        this.setState({sensors: sensors})
      })
      .catch(err => {
        var errCard = <ErrorCard error={err.message} type="error"/>
        this.setState({sensor: errCard})
      })
    } else {
      var errCard = <ErrorCard error="no device found" type="warning"/>
      this.setState({sensors: errCard})
    }
  }


  
  
  render() {
    return(
      <div className="content">
        {this.state.sensors}
      </div>
    )
  }
}

export default Sensors;