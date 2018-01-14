import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Controls from './controls';
import Wrapper from './wrapper';
import {BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Controls/>
          <Wrapper/>
        </div>
      </Router>
    );
  }
}

export default App;
