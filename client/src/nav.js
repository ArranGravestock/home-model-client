import { Link } from 'react-router-dom';
import './nav.css';

const React = require('react')
const FontAwesome = require('react-fontawesome')

const listItems = [
  {link: "/", icon: "home", name: "home"},
  {link: "/", icon: "calendar", name: "data logging"},
  {link: "/", icon: "user", name: "movement detection"},
  {link: "/lights", icon: "lightbulb-o", name: "lights"},
  {link: "/doors", icon: "lock", name: "doors"},
  {link: "/water", icon: "tint", name: "water"},
  {link: "/gas", icon: "fire", name: "gas"},
  {link: "/", icon: "thermometer-half", name: "temperature"},
  {link: "/", icon: "cloud", name: "humidity"},
].map((item, i) => 
  <li key={i} onClick={item.onClick}><Link to={`/auth${item.link}`}><FontAwesome name={item.icon}/>{item.name}</Link></li>
)

const Nav = ({className}) => (
  <div className={`nav-sidebar ${className}`}>
    <ul className="nav-sidebar-list">
        <li className="nav-sidebar_title">Dashboard</li>
        {listItems}
    </ul>
  </div>
)

export default Nav;
