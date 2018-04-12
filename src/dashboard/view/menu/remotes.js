import React, {Component} from 'react';
import {RemoteCard, ErrorCard} from '../card';
import 'whatwg-fetch';

class Remotes extends Component {

    state = {}
    componentWillMount() {
        if (localStorage.deviceid) {
            fetch(`http://localhost:3000/device/${localStorage.deviceid}/remotes`, {credentials: 'include'})
            .then(res => {
                if (res.ok) {
                  return res.json()
                } else {
                  throw Error(res.statusText)
                }
              })
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
                var errCard = <ErrorCard error={err.message} type="error"/>
                this.setState({remotes: errCard})
            })
        } else {
            var errCard = <ErrorCard error="no device found" type="warning"/>
            this.setState({remotes: errCard})
        }
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