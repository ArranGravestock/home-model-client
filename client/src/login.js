import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {fakeAuth} from './privateroute';
import './login.css'

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
        <div className="login-flex">
            <div className="card login">
                <h1>login</h1>
                    <form className="login-controls">
                        <label>email</label>
                        <br/>
                        <input type="text" placeholder="john@doe.com"/><br/>
                        
                        
                        <label>password</label>
                        <br/>
                        <input type="password"/><br/>
                        
                    <button onClick={this.login}><Link to="/auth/home">login</Link></button>
                </form>
            </div>
        </div>
        )
    }
}

export default LoginForm;