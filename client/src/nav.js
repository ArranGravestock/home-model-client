import { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const React = require('react')
const FontAwesome = require('react-fontawesome')

const listItems = [
  {link: "/auth/", icon: "home", name: "home"},
  {link: "/auth/lights", icon: "lightbulb-o", name: "lights"},
  {link: "/auth/doors", icon: "arrow-right", name: "doors"},
  {link: "/auth/water", icon: "tint", name: "water"},
  {link: "/auth/gas", icon: "fire", name: "gas"},
].map((item, i) => 
  <li key={i} onClick={item.onClick}><Link to={item.link}><FontAwesome name={item.icon}/>{item.name}</Link></li>
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
