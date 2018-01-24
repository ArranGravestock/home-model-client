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
        <div className="wrapper-login">
            <div className="card card-login">
                <div className="card-header">
                    <h1>login</h1>
                </div>
                <div className="card-content">
                    <form className="login-controls">
                        <label htmlFor="username">email</label><br/>
                        <input id="username" type="text" placeholder="john@doe.com"/><br/>
                        <label htmlFor="password">password<br/></label>
                        <input id="password" type="password"/><br/>
                        
                        <button onClick={this.login}><Link to="/auth/home">login</Link></button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default LoginForm;