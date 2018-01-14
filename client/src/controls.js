import React, { Component } from 'react';
import './controls.css';
import Nav from './nav';

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
            <ul className="controls">
                <li onClick={this.handleClick}>
                    <a>{this.state.toggled ? 'close' : 'menu'}</a>
                </li>
                <li><a>settings</a></li>
            </ul>
            <Nav className={`nav-hidden-${this.state.toggled}`} onClick={this.handleClick}/>
        </div>
        )
    }
}

export default Controls;
