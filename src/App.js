import React from 'react';
import './App.css';
import TopNav from './dashboard/view/topnav';
import {LoginForm} from './login/view/login';
import {TextCard} from './dashboard/view/card';
import Signup from './login/view/signup';
import {PrivateRoute} from './login/view/privateroute';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './scss/sass_compiled.css'

//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
/*
const BrowserRouter = require('react-router-dom/Router');
const Route = require('react-router-dom/Route');
const Switch = require('react-router-dom/Switch');
*/


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
        <Route path="/signup" component={Signup}/>
        <PrivateRoute path="/auth" component={TopNav}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>
)
//
export default App;