import React from 'react';
import {Link} from 'react-router-dom';

const LoginForm = () => (
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
            <button><Link to="/auth/">Login</Link></button>
        </form>
    </div>
)

export default LoginForm;