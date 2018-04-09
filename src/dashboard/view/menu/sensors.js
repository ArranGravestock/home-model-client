import React, {Component} from 'react';
import 'whatwg-fetch';
import {ChartCard} from '../card';


class Sensors extends Component {

  state = {}

  componentWillMount() {
    fetch(`http://localhost:3000/device/${localStorage.deviceid}/sensors`, {credentials: 'include'})
    .then(res => res.json())
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
      console.log(err);
    })
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