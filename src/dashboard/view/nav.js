import { Link } from 'react-router-dom';
import React, {Component} from 'react';
import '../css/nav.css';
const FontAwesome = require('react-fontawesome')

const listItems = [
  {link: "/home", icon: "home", name: "home"},
  {link: "/cal", icon: "calendar", name: "data logging"},
  {link: "/move", icon: "user", name: "movement detection"},
  {link: "/lights", icon: "lightbulb-o", name: "lights"},
  {link: "/doors", icon: "lock", name: "doors"},
  {link: "/water", icon: "tint", name: "water"},
  {link: "/gas", icon: "fire", name: "gas"},
  {link: "/temp", icon: "thermometer-half", name: "temperature"},
  {link: "/cloud", icon: "cloud", name: "humidity"},
].map((item, i) => 
  <li key={i} onClick={item.onClick}><Link to={`/auth${item.link}`}><FontAwesome name={item.icon}/>{item.name}</Link></li>
)

class Nav extends Component {
  render() {
    return(
      <div className={`nav-sidebar ${this.props.className}`}>
        <ul className="nav-sidebar-list">
            <li className="nav-sidebar_title">{localStorage.device}</li>
            {listItems}
        </ul>
      </div>
    )
  }  
}


export default Nav;
