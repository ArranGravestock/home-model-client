import React, {Component} from 'react';
import {DeviceCard, TextCard, RegisterDeviceCard} from './card';

class Device extends Component {
  state = {}

  componentWillMount() {
    fetch(`http://localhost:3000/devices`, {credentials: 'include'})
    .then(res => res.json())
    .then(json => {
      var devices = json.map(name => {
        return(
          <DeviceCard key={name.DeviceID} title={name.DeviceName} id={name.DeviceID}/>
        )
      })
      this.setState({devices: devices})
    })
    .catch(err => {
      console.log(err);
      var errCard = <TextCard title="no devices found"/>
      this.setState({devices: errCard})
    })
  }

  render() {
    return (
      <div>
        <RegisterDeviceCard/>
        {this.state.devices}
      </div>
    )
  }
}
  
export {Device};