import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './wrapper.css';
import Home from './home';
import Lights from './lights';
import Doors from './doors';
import Water from './water';
import Gas from './gas';

class Wrapper extends Component {
    render() {
      return (
        <div className="wrapper">
            <Route exact path="/" component={Home}/>
            <Route path="/lights" component={Lights}/>
            <Route path="/doors" component={Doors}/>
            <Route path="/water" component={Water}/>
            <Route path="/gas" component={Gas}/>
        </div>
      )
    }
}

export default Wrapper;