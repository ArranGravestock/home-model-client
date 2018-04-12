import React, {Component} from 'react';
import {DeviceCard, ErrorCard, RegisterDeviceCard} from './card';

class Device extends Component {
  state = {}

  componentWillMount() {
    fetch(`http://localhost:3000/devices`, {credentials: 'include'})
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error(res.statusText)
      }
    })
    .then(json => {
      var devices = json.map(name => {
        return(
          <DeviceCard key={name.DeviceID} title={name.DeviceName} id={name.DeviceID}/>
        )
      })
      this.setState({devices: devices})
    })
    .catch(err => {
      var errCard = <ErrorCard error={`${err.message}`} type="error"/>
      this.setState({errors: errCard})
    })
  }

  render() {
    return (
      <div>
        {this.state.errors}
        <RegisterDeviceCard/>
        {this.state.devices}
      </div>
    )
  }
}
  
export {Device};