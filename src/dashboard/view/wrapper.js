import React from 'react';
import {Route} from 'react-router-dom';
import '../css/wrapper.css';
import Home from './menu/home';
import Lights from './menu/lights';
import {Device} from './device';

const Wrapper = ({className}) => (
  <div className={className}>
    <Route path="/auth/home" component={Home}/>
    <Route path="/auth/logs" component={Lights}/>
    <Route path="/auth/lights" component={Lights}/>
    <Route path="/auth/sensors" component={Lights}/>
    <Route path="/auth/controls" component={Lights}/>

    <Route path="/auth/settings" component={Lights}/>
    <Route path="/auth/device" component={Device}/>
  </div>
)

export default Wrapper;