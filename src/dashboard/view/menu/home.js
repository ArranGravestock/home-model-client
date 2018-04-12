import React, {Component} from 'react';
import {StatsDoughnut, TextCard, StatCard, ErrorCard} from '../card';
import Driver from 'driver.js';

class Home extends Component {

  state = {}

  componentWillMount() {
    if (localStorage.deviceid) {
      var render = (
        <div className="content">
          <StatCard title="API Calls" icon="fa fa-comments-o" type="message" category="light" color="#F88369" deviceid={localStorage.deviceid}/>
          <StatCard title="Lights Registered" icon="fa fa-comments-o" type="category" category="light" color="#59B6D2" deviceid={localStorage.deviceid}/>
          <StatCard title="Remote Registered" icon="fa fa-comments-o" type="category" category="remote" color="#AE9CCD" deviceid={localStorage.deviceid}/>
          <StatCard title="Sensors Registered" icon="fa fa-comments-o" type="category" category="sensor" color="#76CBC1" deviceid={localStorage.deviceid}/>
          <StatsDoughnut title="Times Activated" deviceid={localStorage.deviceid}/>
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