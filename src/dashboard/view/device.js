import React, {Component} from 'react';
import {DeviceCard, TextCard, RegisterDeviceCard} from './card';

const deviceSelected = {
  curDevice: true,
  setDevice() {
    // this.curDevice = false
    console.log(this.curDevice);
  }
}

class Device extends Component {
    constructor() {
      super();
      this.state = {}
    }
  
    componentWillMount() {
      fetch(`http://localhost:3000/devices`, {credentials: 'include'}).then((res) => 
        // if(res.status >=200 && res.status < 300) {
          res.json()
        // } else {
        //   console.log("here");
        //   var err = <TextCard title="no devices found"></TextCard>
        //   this.setState({devices: err})
        // }
      ).then((json) => {
        console.log(json);
        var devices = json.map(name => {
          return(
            <DeviceCard key={name.DeviceID} title={name.DeviceName} id={name.DeviceID}/>
          )
        })
        this.setState({devices: devices})
      }).catch((err)=> {
        console.log(err);
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
  
export {Device, deviceSelected};