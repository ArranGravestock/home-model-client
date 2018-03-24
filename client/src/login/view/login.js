import React, { Component } from 'react';
// import {Link, Redirect} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
// import {fakeAuth} from './privateroute';
import '../css/login.css'
import 'whatwg-fetch';


import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff';

import IconButton from 'material-ui/IconButton';
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';


const auth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100)
    }
}

class LoginForm extends Component {
    state = {
        error: '',
        showPassword: false,
        redirectToReferrer: false,
        username: '',
        password: ''
    }

    login = (e) => {
        //e.preventDefault();
        fetch(`http://localhost:3000/login?username=${this.state.username}&password=${this.state.password}`, {method: 'POST'}).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                console.log(res);
                auth.authenticate(() => {
                    console.log("redirect true");
                    this.setState({ redirectToReferrer: true })
                });
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

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPasssword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };
    
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
                        <h1>LOGIN</h1>
                    </div>
                    <div className="card-error">
                    {this.state.error !== '' ? (<p style={{color: '#f44336'}}>this.state.error</p>) : ('')}
                    </div>
                    <div className="card-content">
                        
                        <form className="login-controls">

                            <FormControl className="login-form-control">
                                <InputLabel htmlFor="input-username">Enter your username</InputLabel>
                                <Input id="input-username" value={this.state.name} onChange={this.handleChange("username")} />
                            </FormControl>

                            <FormControl className="login-form-control">
                            <InputLabel htmlFor="input-password">Enter your password</InputLabel>
                            <Input
                                id="input-password"
                                type={this.state.showPassword ? "text" : "password"}
                                value={this.state.password}
                                onChange={this.handleChange("password")}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPasssword}
                                    onMouseDown={this.handleMouseDownPassword}
                                    >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />
                            <FormHelperText id="password-reset">Forgot your password? <a href="#">Click here</a></FormHelperText>
                            </FormControl>
                        </form>
                    </div>
                    <div className="card-action">
                        <button onClick={this.login}><Link to="/auth/home">log in</Link></button>
                        <p>Don't have an account? <Link to="/signup">Create one</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

export {LoginForm, auth};