import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {fakeAuth} from './privateroute';

class LoginForm extends Component {
    state = {
        redirectToReferrer: false
    }

    login = () => {
        fakeAuth.authenticate(() => {
          this.setState({ redirectToReferrer: true })
        })
    }

    
    render() {

        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state
        
        if (redirectToReferrer) {
        return (
            <Redirect to={from}/>
        )
        }

        return(
        
        <div className="card">
        <h1>login</h1>
        <div>
        <img src="https://placeimg.com/150/150/any" alt="placeholder"/>
        </div>
        <form className="login-controls">
        <label>username
        <br/>
        <input placeholder="Username"/><br/>
        </label>
        
        <label>password
        <br/>
        <input placeholder="Password"/><br/>
        </label>
        <button onClick={this.login}><Link to="/auth">login</Link></button>
        </form>
        </div>
        )
    }
}

export default LoginForm;