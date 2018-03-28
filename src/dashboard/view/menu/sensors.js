import React, {Component} from 'react';
import {LightCard} from '../card';
import 'whatwg-fetch';

class Sensors extends Component {

  state = {

  }

  componentWillMount() {
    fetch(`http://localhost:3000/device/${localStorage.deviceid}/lights`, {credentials: 'include'}).then((res) => res.json()
      ).then((json => {
        console.log(json);
        var lights = json.map(light => {
          return(
            <LightCard key={light.LightID} title={light.LightName} id={light.LightID} state={light.LightState}/>
          )
        })
        this.setState({lights: lights})
      })
    )
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