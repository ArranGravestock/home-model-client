import React, { Component } from 'react';
// import {Link, Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
// import {fakeAuth} from './privateroute';
import './login.css'
import 'whatwg-fetch';

class LoginForm extends Component {
    state = {
        authenticated: false,
        username: '',
        password: ''
    }

    login = (e) => {
        e.preventDefault();
        // fakeAuth.authenticate(() => {
        //   this.setState({ redirectToReferrer: true })
        // })
        fetch(`http://localhost:3000/login?username=${this.state.username}&password=${this.state.password}`, {method: 'POST'}).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                console.log(res);
                this.setState({ 
                    authenticated: true
                })
            } else {
                alert("Password or username is incorrect!");
            }
        })
    }

    updatePass = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    updateUser = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    
    render() {

        // const { from } = this.props.location.state || { from: { pathname: '/' } }
        // const { redirectToReferrer } = this.state
        
        // if (redirectToReferrer) {
        //     return (
        //     <Redirect to={from}/>
        //     )
        // }

        return(
            <div className="wrapper-login">
                <div className="card card-login">
                    <div className="card-header">
                        <h1>login</h1>
                    </div>
                    <div className="card-content">
                        <form className="login-controls">
                            <label htmlFor="username">username</label><br/>
                            <input id="username" type="text" onChange={this.updateUser.bind(this)}/><br/>
                            <label htmlFor="password">password<br/></label>
                            <input id="password" type="password" onChange={this.updatePass.bind(this)}/><br/>
                            
                            <button onClick={this.login}><Link to="/auth/home">login</Link></button>
                            <button>Sign up</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

// <button onClick={this.login}><Link to="/auth/home">login</Link></button>

export default LoginForm;