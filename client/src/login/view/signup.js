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
import {FormControl} from 'material-ui/Form'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';

const validateForm = (user, pass, email) => {
    //regex testing
    return true;
}

class Signup extends Component {
    state = {
        error: '',
        showPassword: false,
        redirectToReferrer: false,
        username: '',
        password: ''
    }

    register = (e) => {
        //e.preventDefault();
        if(validateForm(this.state.username, this.state.password, this.state.email, this.state.confirm_password)) {
            fetch(`http://localhost:3000/signup?username=${this.state.username}&password=${this.state.password}&email=${this.state.email}`, {method: 'POST'}).then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    console.log(res);
                    alert("Successfully registered!");
                } else {
                    alert("something went wrong!");
                }
            })
        }
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
                        <h1>REGISTER</h1>
                    </div>
                    <div className="card-error">
                    {this.state.error !== '' ? (<p style={{color: '#f44336'}}>this.state.error</p>) : ('')}
                    </div>
                    <div className="card-content">
                        
                        <form className="login-controls">

                            <FormControl className="login-form-control">
                                <InputLabel htmlFor="input-email">Email</InputLabel>
                                <Input id="input-email" value={this.state.email} onChange={this.handleChange("email")} 
                                />
                            </FormControl>

                            <FormControl className="login-form-control">
                                <InputLabel htmlFor="input-username">Username</InputLabel>
                                <Input id="input-username" value={this.state.name} onChange={this.handleChange("username")} />
                            </FormControl>

                            <FormControl className="login-form-control">
                            <InputLabel htmlFor="input-password">Password</InputLabel>
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
                            </FormControl>

                            <FormControl className="login-form-control">
                            <InputLabel htmlFor="input-password-confirm">Confirm Password</InputLabel>
                            <Input
                                id="input-password-confirm"
                                type={this.state.showPassword ? "text" : "password"}
                                value={this.state.confirm_password}
                                onChange={this.handleChange("confirm_password")}
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
                            </FormControl>
                        </form>
                    </div>
                    <div className="card-action">
                        <button onClick={this.register}>Register</button>
                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;