import React, {Component} from 'react';
import {LightCard, ErrorCard} from '../card';
import 'whatwg-fetch';

class Lights extends Component {

  state = {}

  componentWillMount() {
    if (localStorage.deviceid) {
      
      fetch(`http://localhost:3000/device/${localStorage.deviceid}/type/light`, {credentials: 'include'})
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw Error(res.statusText)
        }
      })
      .then(json => {
        var lights = json.map(light => {
          return(
            <LightCard key={light.ThingID} title={light.ThingName} id={light.ThingID} toggled={light.ThingState} brightness={20}/>
          )
        })
        this.setState({lights: lights})
      })
      .catch(err => {
        var errCard = <ErrorCard error={err.message} type="error"/>
        this.setState({lights: errCard})
      })

    } else {
      var errCard = <ErrorCard error="no device found" type="warning"/>
      this.setState({lights: errCard})
    }
}

  render() {
    return(
      <div className="content">
        {this.state.lights}
      </div>
    )
  }
}

export default Lights;