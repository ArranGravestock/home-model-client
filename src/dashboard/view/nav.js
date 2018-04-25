import { Link } from 'react-router-dom';
import React, {Component} from 'react';

const items = [
  {link: "/home", icon: "fas fa-home", name: "home"},
  {link: "/device", icon: "fas fa-mobile-alt", name: "devices"},
  {link: "/logs", icon: "far fa-clock", name: "data logging"},
  {link: "/sensors", icon: "fas fa-eye", name: "sensors"},
  {link: "/lights", icon: "far fa-lightbulb", name: "lights"},
  {link: "/remotes", icon: "fas fa-toggle-off", name: "remotes"},
  {link: "/admin", icon: "fas fa-toggle-off", name: "admin"},
]

class Nav extends Component {

  state = {}

  navItems = items.map((item, i) => 
    <li key={i} onClick={item.onClick}>
      <Link to={`/auth${item.link}`}>
          <i className={item.icon}/>
          <span>{item.name}</span>
      </Link>
    </li>
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
