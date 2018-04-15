import React, {Component} from 'react';
import {DeviceCard, ErrorCard} from '../card';

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
          <div className="card-header">
              <h1>Register a new device</h1>
          </div>
          <div className="card-content">
              <form>
                  <input type="text" name="deviceid" onChange={this.handleChange("devicetoken")}/>
                  <button onClick={this.registerDevice}>Add</button>
              </form>
          </div>
        </div>
        {this.state.devices}
      </div>
    )
  }
}
  
export {Device};