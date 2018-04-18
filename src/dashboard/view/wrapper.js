import React from 'react';
import {Route} from 'react-router-dom';
import Home from './menu/home';
import Lights from './menu/lights';
import Sensors from './menu/sensors';
import Remotes from './menu/remotes';
import {Device} from './menu/device';
import Logging from './menu/logging';

const Wrapper = ({className}) => (
  <div className={className}>
    <Route path="/auth/home" component={Home}/>
    <Route path="/auth/logs" component={Logging}/>
    <Route path="/auth/lights" component={Lights}/>
    <Route path="/auth/sensors" component={Sensors}/>
    <Route path="/auth/remotes" component={Remotes}/>
    <Route path="/auth/device" component={Device}/>
  </div>
)

export default Wrapper;