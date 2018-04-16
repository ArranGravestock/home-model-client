import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import 'whatwg-fetch';

import '../css/login.css'
import '../../css/button.css'



import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import IconButton from 'material-ui/IconButton';
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';


const auth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100);
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100);
    }
}

class LoginForm extends Component {
    state = {
        error: '',
        showPassword: false,
        redirectToReferrer: false,
		user: {
		}
	}

    login = (e) => {
        
        fetch(`http://localhost:3000/login`, 
            {
                method: 'POST', 
                credentials: 'include',
                headers: {
                    'content-type':'application/json',
                    'Access-Control-Allow-Origin':'localhost:3001',
                },
                //mode: 'cors',
                body: JSON.stringify(this.state.user)
            }
        )
        .then(res => {
            if (res.ok) {
                auth.authenticate(() => {
                    this.setState({ redirectToReferrer: true })
                })
            } else {
                alert("Password or username is incorrect!");
            }
        })
    }

    handleChange = prop => event => {
        this.setState(({ 
            user: {
                ...this.state.user,
                [prop]: event.target.value
            }
        }));
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
                        <h1>Login</h1>
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
                            <FormHelperText id="password-reset">Forgot your password? <Link to="/forgot-details">Click here</Link></FormHelperText>
                            </FormControl>
                        </form>
                        
                    </div>

                    <div className="card-action" style={{textAlign: 'center'}}>
                            <Link to="/auth/home"><button className="button-blue" type="button" onClick={this.login}>log in</button></Link>
                            <p>Don't have an account? <Link to="/signup">Create one</Link></p>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export {LoginForm, auth};