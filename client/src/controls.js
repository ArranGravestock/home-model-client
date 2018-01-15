import React, { Component } from 'react';
import './controls.css';
import Nav from './nav';
import {Link, withRouter} from 'react-router-dom';
import Wrapper from './wrapper';
import {fakeAuth} from './privateroute';

const AuthButton = withRouter(({ history }) => (

    fakeAuth.isAuthenticated ? (
        <li onClick={() => {
          fakeAuth.signout(() => history.push('/login'))
        }}>logout</li>
    ) : (
      <p>UNAUTHED!!</p>
    )
))

class Controls extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggled: false,
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
                    <li onClick={this.handleClick}>
                        {this.state.toggled ? 'close' : 'menu'}
                    </li>
                    <li><Link to="/auth/settings">settings</Link></li>
                    <AuthButton/>
                </ul>
                <Nav className={`nav-hidden-${this.state.toggled}`} onClick={this.handleClick}/>
                
            </div>
            <Wrapper/>
        </div>
        )
    }
}

export default Controls;
