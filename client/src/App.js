import React from 'react';
import './App.css';
import Controls from './controls';
import LoginForm from './login';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => (
  <Router>
    <div className="App">
      <Route path="/login" component={LoginForm}/>
      <Route path="/auth" component={Controls}/>
    </div>
  </Router>
)

export default App;