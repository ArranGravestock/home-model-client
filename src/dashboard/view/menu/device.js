import React, {Component} from 'react';
import {DeviceCard, ErrorCard} from '../card';
import '../../css/card.css';
import '../../css/device.css'

import Input, { InputLabel } from 'material-ui/Input';
import {FormControl} from 'material-ui/Form'

class Device extends Component {

  state = {
    devicetoken: '',
  }

  fetchDevices = () => {
    fetch(`http://localhost:3000/devices`, {credentials: 'include', headers: {
      'content-type':'application/json',
      'Access-Control-Allow-Origin':'localhost:3001',
  },})
    .then(res => {
      if (res.ok && res.status !== 204) {
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
      if (err.message === "No Content") {
        //not the best way to handle this...
        //no need to do anything at the moment...
      } else {
        var errCard = <ErrorCard error={`${err.message}`} type="error"/>
        this.setState({errors: errCard})
      }
    })
  }

  componentWillMount() {
    this.fetchDevices(); 
  }

  registerDevice = (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/registerdevice/${this.state.devicetoken}`, {method: 'POST', credentials: 'include', headers: { 'Access-Control-Allow-Origin':'localhost:3001'}}).then(
          () => {
              alert("new device registered");
              this.fetchDevices();
          }
      ).catch(
          () => {
              alert("device token incorrect!");
          }
      )
  }

  handleChange = prop => (event) => {
      this.setState({[prop]: event.target.value})
  }

  render() {
    return (
      <div>
        {this.state.errors}
        <div className="card card-text">
          <div className="card-content">
              <form style={{display: 'flex', flexDirection: 'column'}}>
                <FormControl style={{paddingBottom: '1.5em'}} className="login-form-control">
                  <InputLabel htmlFor="input-devicetoken" >Enter your device token</InputLabel>
                  <Input id="input-devicetoken" value={this.state.name} onChange={this.handleChange("devicetoken")} />
                </FormControl>
                <button className="button-blue" onClick={this.registerDevice}>register new device</button>
              </form>
          </div>
        </div>
        <div className="device-wrapper">
          {this.state.devices}
        </div>
      </div>
    )
  }
}
  
export {Device};