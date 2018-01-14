import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Doors from './doors';
import Wrapper from './wrapper';

import './nav.css';

class Nav extends Component {
  render() {

    var React = require('react')
    var FontAwesome = require('react-fontawesome')

    return (
   
        <div className={`nav-sidebar ${this.props.className}`}>
          <ul className="nav-sidebar-list">
              <li className="nav-sidebar_title">Dashboard</li>
              <li className="nav-sidebar-active"><Link to="/"><FontAwesome name="home" />Home</Link></li>
              <li><Link to="/lights"><FontAwesome name="lightbulb-o" />Lights</Link></li>
              <li><Link to="/doors"><FontAwesome name="arrow-right" />Doors</Link></li>
              <li><Link to="/water"><FontAwesome name="tint" />Water Sensor</Link></li>
              <li><Link to="/gas"><FontAwesome name="fire" />Gas Sensor</Link></li>
          </ul>
        </div>


    );
    
  }
}
  const Home = () => ( 
    <div className="home">
      <p>home</p>
    </div>
  )

  const Gas = () => ( 
    <div>
      
    </div>
  )
  const Water = () => ( 
  <div>    
  </div>
)



export default Nav;
