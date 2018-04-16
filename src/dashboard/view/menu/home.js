import React, {Component} from 'react';
import {StatsDoughnut, StatCard} from '../card';
//import Driver from 'driver.js';

class Home extends Component {

  state = {}

  componentWillMount() {
    if (localStorage.deviceid) {
      var render = (
        <div className="content">
          <div className="smallStats">
            <StatCard title="API Calls" icon="far fa-envelope" type="message" category="light" color="#F88369" deviceid={localStorage.deviceid}/>
            <StatCard title="Lights Registered" icon="far fa-lightbulb" type="category" category="light" color="#59B6D2" deviceid={localStorage.deviceid}/>
            <StatCard title="Remote Registered" icon="fas fa-mobile-alt" type="category" category="remote" color="#AE9CCD" deviceid={localStorage.deviceid}/>
            <StatCard title="Sensors Registered" icon="fas fa-eye" type="category" category="sensor" color="#76CBC1" deviceid={localStorage.deviceid}/>
          </div>
          <StatsDoughnut deviceid={localStorage.deviceid}/>
        </div>
      )
      this.setState({renderPage: render})
    } else {
      //give them some kind of tutorial
    }
  }

  render() {

    return (
      <div> 
        {this.state.renderPage}
      </div>
    )

  }
}

export default Home;