import { Link } from 'react-router-dom';
import React, {Component} from 'react';
import '../css/nav.css';

const FontAwesome = require('react-fontawesome')

const listItems = [
  {link: "/home", icon: "home", name: "home"},
  {link: "/logs", icon: "calendar", name: "data logging"},
  {link: "/sensors", icon: "user", name: "sensors"},
  {link: "/lights", icon: "lightbulb-o", name: "lights"},
  {link: "/remotes", icon: "toggle-on", name: "remotes"},

].map((item, i) => 
  <li key={i} onClick={item.onClick}><Link to={`/auth${item.link}`}><FontAwesome name={item.icon}/>{item.name}</Link></li>
)

class Nav extends Component {

  state = {
    navHeader: 'Dashboard'  
  }

  componentWillMount() {
    if (localStorage.device) {
      this.setState({navHeader: localStorage.device})
    }
  }

  render() {
    return(
      <div className={`nav-sidebar ${this.props.className}`}>
      <div className="nav-sidebar_title">{this.state.navHeader}</div>
        <ul className="nav-sidebar-list">
            {listItems}
        </ul>
      </div>
    )
  }  
}

export default Nav;
