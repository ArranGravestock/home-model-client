import React, {Component} from 'react';
import {RemoteCard} from '../card';
import 'whatwg-fetch';

class Remotes extends Component {

    state = {}

    componentWillMount() {
        fetch(`http://localhost:3000/device/${localStorage.deviceid}/remotes`, {credentials: 'include'})
        .then(res => res.json())
        .then(json => {
            console.log(json);
            var remotes = json.map(remote => {
                return(
                    <RemoteCard key={remote.ThingID} title={remote.ThingName} id={remote.ThingID} state={remote.ThingState}/>
                )
            })
            this.setState({remotes: remotes})
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return(
            <div className="content">
                {this.state.remotes}
            </div>
        )
    }
}

export default Remotes;