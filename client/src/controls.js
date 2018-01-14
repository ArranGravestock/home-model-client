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
        }));
    }

    render() {
        var toggleActive = `nav-hidden-${this.state.toggled}`
        return (
        <div>
            <ul className="controls">
                <li className={`nav-control-${this.state.toggled}`} onClick={this.handleClick}>
                    <a href="#nav-control">{this.state.toggled ? 'close' : 'menu'}</a>
                </li>
                <li className="controls-settings"><a href="#settings">settings</a></li>
            </ul>
            <Nav className={toggleActive} onClick={this.handleClick}/>
        </div>
        );
    }
}

export default Controls;
