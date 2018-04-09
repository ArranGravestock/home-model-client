import React, {Component} from 'react';
import {LightCard} from '../card';
import 'whatwg-fetch';

class Lights extends Component {

  state = {

  }

  componentWillMount() {
    fetch(`http://localhost:3000/device/${localStorage.deviceid}/lights`, {credentials: 'include'}).then((res) => res.json()
      ).then((json => {
        console.log(json);
        var lights = json.map(light => {
          return(
            <LightCard key={light.ThingID} title={light.ThingName} id={light.ThingID} state={light.ThingState}/>
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