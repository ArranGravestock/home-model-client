import { Link } from 'react-router-dom';
import React, {Component} from 'react';
import '../css/nav.css';
import FontAwesome from 'react-fontawesome';

const items = [
  {link: "/home", icon: "home", name: "home"},
  {link: "/logs", icon: "calendar", name: "data logging"},
  {link: "/sensors", icon: "user", name: "sensors"},
  {link: "/lights", icon: "lightbulb-o", name: "lights"},
  {link: "/remotes", icon: "toggle-on", name: "remotes"},
]

class Nav extends Component {

  navItems = items.map((item, i) => 
    <li key={i} onClick={item.onClick}><Link to={`/auth${item.link}`}><FontAwesome name={item.icon}/>{item.name}</Link></li>
  ) 

  render() {
    return(
      <div className={`nav-sidebar ${this.props.className}`}>
        <div className="nav-sidebar_title">
          {localStorage.device ? localStorage.device : 'Dashboard'}
        </div>
        <ul className="nav-sidebar-list">
            {this.navItems}
        </ul>
      </div>
    )
  }  
}

export default Nav;
