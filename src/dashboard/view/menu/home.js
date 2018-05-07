import React, {Component} from 'react';
import {ChartBarCard, StatCard, LineChartCard} from '../card';
import {Link} from 'react-router-dom';
import 'whatwg-fetch';
class Tutorial extends Component {

  render() {
    return (
      <div className="content">
        <div className="card card-tutorial" style={{display: 'flex', flexWrap: 'row wrap'}}>
        <div className="card-header">
          <h1>Welcome to your dashboard!</h1>
          <h3>Take a look at the steps below to get going with your hub</h3>
        </div>

          <div className="tutorial-section">
            <div className="header">
              <div className="icon">
                <i className="fas fa-microchip"/>
              </div>
              <div className="title">
                <h1>Connect your devices</h1>
              </div>
            </div>
            <div className="body">
              <p>Each device hub has a unique token associated with it. This is the key that is used to give permission to a user to access the hub and modify any lights, sensors or remotes connected to it. Keep this key secret, if it is lost you may be giving someone unknown access to your hub.</p>
              <br/>
              <p>The button below will take you straight to adding your unique key and get going with your hub straight away!</p>
            </div>
            <div className="footer">
            <Link to="/auth/device"><button className="button-blue">Connect Device</button></Link>
            </div>
          </div>

          <div className="tutorial-section section-middle">
            <div className="header">
              <div className="icon">
                <i className="fab fa-leanpub"/>
              </div>
              <div className="title">
                <h1>Learn how to use your dashboard</h1>
              </div>
            </div>
            <div className="body">
              <p>Unsure how to get going with your application? There's a written guide that you can follow to ensure that you are getting the most out of your hub.</p>
              <br/>
              <p>Follow the documentation to explore your hub more!</p>
            </div>
            <div className="footer">
            <a href="#docs"><button className="button-blue">Go to Docs</button></a>
            </div>
          </div>

          <div className="tutorial-section">
            <div className="header">
              <div className="icon">
                <i className="far fa-comments"/>
              </div>
              <div className="title">
                <h1>Provide feedback</h1>
              </div>
            </div>
            <div className="body">
              <p>Not happy with your hub? Missing features? Provide some feedback and we'll make sure you get the most out of your hub.</p>
            </div>
            <div className="footer">
            <a href="#feedback"><button className="button-blue">Provide Feedback</button></a>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

class Default extends Component {
  render() {
    return (
      <div className="content">
        <div className="top-header">
          <div className="smallStats">
            <StatCard title="API Calls" icon="far fa-envelope" type="message" category="light" color="#F88369" deviceid={localStorage.deviceid}/>
            <StatCard title="Lights Registered" icon="far fa-lightbulb" type="category" category="light" color="#59B6D2" deviceid={localStorage.deviceid}/>
            <StatCard title="Remote Registered" icon="fas fa-mobile-alt" type="category" category="remote" color="#AE9CCD" deviceid={localStorage.deviceid}/>
            <StatCard title="Sensors Registered" icon="fas fa-eye" type="category" category="sensor" color="#76CBC1" deviceid={localStorage.deviceid}/>
          </div>
          <ChartBarCard deviceid={localStorage.deviceid} type="count" fetchurl={`http://localhost:3000/device/${localStorage.deviceid}/countallthings`}/>  
        </div>
        <LineChartCard title="ultrasonic" deviceid={localStorage.deviceid} thingid={29} type="averagedays"/>
        <LineChartCard title="temperature" deviceid={localStorage.deviceid} thingid={26} type="averagedays"/>
    </div>
    )
  }
}

class Home extends Component {

  state = {}

  componentWillMount() {
    if (localStorage.deviceid) {
      this.setState({pageContent: <Default/>})
    } else {
      this.setState({pageContent: <Tutorial/>})
    }
  }

  render() {

    return (
      <div> 
        {this.state.pageContent}
      </div>
    )

  }
}

export default Home;