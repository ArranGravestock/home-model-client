import React, { Component } from 'react';
import './nav.css';

class Nav extends Component {
  render() {
    return (
      <div className={`nav-sidebar ${this.props.className}`}>
        <ul className="nav-sidebar-list">
            <li className="nav-sidebar_title">Dashboard</li>
            <li className="nav-sidebar-active"><a href="#home">Home</a></li>
            <li><a href="#light">Lights</a></li>
            <li><a href="#door">Doors</a></li>
            <li><a href="#water">Water Sensor</a></li>
            <li><a href="#gas">Gas Sensor</a></li>
        </ul>
      </div>
    );
  }
}

export default Nav;
