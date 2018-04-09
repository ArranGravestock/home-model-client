import React, {Component} from 'react';
import {LightCard} from '../card';
import 'whatwg-fetch';

class Controls extends Component {

    state = {}

    componentWillMount() {
        fetch(`http://localhost:3000/device/${localStorage.deviceid}/controls`, {credentials: 'include'})
        .then(res => res.json())
        .then(json => {
            console.log(json);
            var lights = json.map(light => {
                return(
                    <LightCard key={light.ThingID} title={light.ThingName} id={light.ThingID} state={light.ThingState}/>
                )
            })
            this.setState({lights: lights})
        })
        .catch(err => {
            console.log(err);
        })
    }


    render() {
        return(
            <div className="content">

            </div>
        )
    }
}

export default Controls;