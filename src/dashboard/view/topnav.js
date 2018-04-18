import React, { Component } from 'react';
import Nav from './nav';
import {withRouter} from 'react-router-dom';
import Wrapper from './wrapper';
import {auth} from '../../login/view/login';

const AuthButton = withRouter(({ history }) => (

    auth.isAuthenticated ? (
        <li onClick={() => {
            fetch(`http://localhost:3000/logout`, 
                {
                    method: 'POST', 
                    credentials: 'include',
                    headers: {
                        'content-type':'application/json',
                        'Access-Control-Allow-Origin':'localhost:3001',
                    }
                }
            )
            auth.signout(() => history.push('/login'))
        }}>logout</li>
    ) : (
      <p>UNAUTHED!!</p>
    )
))

class TopNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggled: true,
        };

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.setState(prevState => ({
            toggled: !prevState.toggled
        }))
    }

    render() {
        return (
            
        <div>
            <div>
                <ul className="controls">
                    <li className="nav-button-close" onClick={this.handleClick}>
                        {this.state.toggled ? 'close' : 'menu'}
                    </li>
                    <AuthButton/>
                </ul>
                <Nav className={`nav-hidden-${this.state.toggled}`} onClick={this.handleClick}/>
                
            </div>
            <Wrapper className={`wrapper wrapper-push-${this.state.toggled}`}/>
        </div>
        )
    }
}

export default TopNav;
