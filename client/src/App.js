import React, { Component } from 'react';
import './App.css';
import Controls from './controls';
import Wrapper from './wrapper';
import LoginForm from './login';
import {BrowserRouter as Router, Route, Redirect, withRouter} from 'react-router-dom';

const App = () => (
  <Router>
    <div className="App">
      <Route path="/login" component={LoginForm}/>
      <Route path="/auth" component={Controls}/>
    </div>
  </Router>
)

export default App;