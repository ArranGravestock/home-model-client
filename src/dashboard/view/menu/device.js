import React, {Component} from 'react';
import {DeviceCard, ErrorCard} from '../card';
import '../../css/card.css';
import '../../css/device.css'

import Input, { InputLabel } from 'material-ui/Input';
import {FormControl} from 'material-ui/Form'

class Device extends Component {

  state = {
    devicetoken: '',
    messages: []
  }

  removeItem = (id) => {
    this.setState({
      devices: this.state.devices.filter((x,i) => i !== id-1 )
    })
  }

  removeMessage = (id) => {
    console.log(id);
    this.setState(prevState => ({
      messages: this.state.messages.filter((x,i) => i !== id-1 )
    }))
  }

  pushMessage = (message, errorType) => {
    var errCard = (<li key={Date.now()}><ErrorCard error={message} type={errorType}/></li>)

    this.setState(prevState => ({
      messages: [...prevState.messages, errCard]
    }))

    //remove message after 3 seconds
    setTimeout( () => {
      this.setState(prevState => ({
        messages: [...prevState.messages.slice(1, prevState.length)]
      }))
    }, 3500)
  }

  removeDevice = (id) => {
    fetch(`http://localhost:3000/removedevice/${id}`, 
    {
        method: 'PUT', 
        credentials: 'include',
        headers: {
          'content-type':'application/json',
          'Access-Control-Allow-Origin':'localhost:3001',
        }
    })
    .then(res => {
      if (res.ok) {
        this.removeItem(id);
      } else {
        this.pushMessage(`${res.statusText} - Unable to remove device: ${id}`, "warning")
      }
    })
    .catch(err => {
      this.pushMessage(err, "error")
    })
  }

  fetchDevices = () => {
    fetch(`http://localhost:3000/devices`, {credentials: 'include', 
      headers: {
        'content-type':'application/json',
        'Access-Control-Allow-Origin':'localhost:3001',
      }
    })
    .then(res => {
      if (res.ok && res.status !== 204) {
        return res.json()
      } else if (res.status === 204) {
        this.pushMessage("No devices found", "info")
      } else {
        this.pushMessage(res.statusText, "error")
      }
    })
    .then(json => {
      var devices = json.map(name => {
        return(
          <DeviceCard key={name.DeviceID} title={name.DeviceName} id={name.DeviceID} click={() => this.removeDevice(name.DeviceID)}/>
        )
      })
      this.setState({devices: devices})
    })
    .catch(err => {
      if (err.message === "No Content") {
        //not the best way to handle this...
        //no need to do anything at the moment...
      } else {
        this.pushMessage(err.message, "error")
      }
    })
  }

  componentWillMount() {
    this.fetchDevices();

  }

  registerDevice = (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/registerdevice/${this.state.devicetoken}`, {method: 'POST', credentials: 'include', 
      headers: { 'Access-Control-Allow-Origin':'localhost:3001'}})
      .then(res => {
          if (res.ok) {
            this.pushMessage("new device registered", "success")
            this.fetchDevices();
          } else {
            this.pushMessage("something unexpected happened!", "warning")
          }
        }
      )
      .catch(() => {
        this.pushMessage("device token is incorrect", "warning")
      })
  }

  handleChange = prop => (event) => {
      this.setState({[prop]: event.target.value})
  }

  render() {
    return (
      <div>
        <ul className="status-messages">
          {this.state.messages}
        </ul>
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