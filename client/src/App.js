import React from 'react';
import './App.css';
import Controls from './controls';
import LoginForm from './login';
import {TextCard} from './card';
import {PrivateRoute} from './privateroute';

//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
const BrowserRouter = require('react-router-dom/Router');
const Route = require('react-router-dom/Route');
const Switch = require('react-router-dom/Switch');

import './responsive.css';

const NoMatch = ({location}) => (
  <div>
    <TextCard title="404 Error!" description={`${location.pathname} unknown!`}/>
  </div>
)

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route path="/login" component={LoginForm}/>
        <PrivateRoute path="/auth" component={Controls}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>
)

export default App;