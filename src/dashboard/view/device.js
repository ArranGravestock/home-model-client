import React, {Component} from 'react';
import {DeviceCard, ErrorCard, RegisterDeviceCard} from './card';

class Device extends Component {
  state = {}

  componentWillMount() {
    fetch(`http://localhost:3000/devices`, {credentials: 'include'})
    .then(res => {
      if (res.ok && res.status != 204) {
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
      if (err.message == "No Content") {
        //not the best way to handle this...
        //no need to do anything at the moment...
      } else {
        var errCard = <ErrorCard error={`${err.message}`} type="error"/>
        this.setState({errors: errCard})
      }
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