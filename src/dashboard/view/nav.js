import { Link } from 'react-router-dom';
import React, {Component} from 'react';
import '../css/nav.css';

const FontAwesome = require('react-fontawesome')

//  {link: "/doors", icon: "lock", name: "doors"},
//  {link: "/water", icon: "tint", name: "water"},
//  {link: "/gas", icon: "fire", name: "gas"},
// {link: "/temp", icon: "thermometer-half", name: "temperature"},
// {link: "/cloud", icon: "cloud", name: "humidity"},
const listItems = [
  {link: "/home", icon: "home", name: "home"},
  {link: "/logs", icon: "calendar", name: "data logging"},
  {link: "/sensors", icon: "user", name: "sensors"},
  {link: "/lights", icon: "lightbulb-o", name: "lights"},
  {link: "/controls", icon: "toggle-on", name: "controls"},

].map((item, i) => 
  <li key={i} onClick={item.onClick}><Link to={`/auth${item.link}`}><FontAwesome name={item.icon}/>{item.name}</Link></li>
)

class Nav extends Component {
  render() {
    return(
      <div className={`nav-sidebar ${this.props.className}`}>
      <div className="nav-sidebar_title">{localStorage.device}</div>
        <ul className="nav-sidebar-list">
            {listItems}
        </ul>
      </div>
    )
  }  
}

export default Nav;
