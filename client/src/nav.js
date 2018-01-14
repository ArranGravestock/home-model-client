import { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

class Nav extends Component {
  render() {

    const React = require('react')
    const FontAwesome = require('react-fontawesome')

    const listItems = [
      {link: "/", icon: "home", name: "home"},
      {link: "/lights", icon: "lightbulb-o", name: "lights"},
      {link: "/doors", icon: "arrow-right", name: "doors"},
      {link: "/water", icon: "tint", name: "water"},
      {link: "/gas", icon: "fire", name: "gas"},
    ].map((item, i) => 
      <li key={i} onClick={this.props.onClick}><Link to={item.link}><FontAwesome name={item.icon} />{item.name}</Link></li>
    )

    return (
      <div className={`nav-sidebar ${this.props.className}`}>
        <ul className="nav-sidebar-list">
            <li className="nav-sidebar_title">Dashboard</li>
            {listItems}
        </ul>
      </div>
    );  
  }
}

export default Nav;
