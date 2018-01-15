import React from 'react';
import {Route} from 'react-router-dom';
import './wrapper.css';
import Home from './home';
import Lights from './lights';
import Doors from './doors';
import Water from './water';
import Gas from './gas';

const Wrapper = () => (
  <div className="wrapper">
    <Route exact path="auth/" component={Home}/>
    <Route path="/auth/lights" component={Lights}/>
    <Route path="/auth/doors" component={Doors}/>
    <Route path="/auth/water" component={Water}/>
    <Route path="/auth/gas" component={Gas}/>
  </div>
)

export default Wrapper;