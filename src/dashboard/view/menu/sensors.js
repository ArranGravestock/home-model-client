import React, {Component} from 'react';
import 'whatwg-fetch';
import {ChartCard} from '../card';


class Sensors extends Component {






  
  
  render() {
    return(
      <div className="content">
        <ChartCard deviceid={1} sensorid={3}/>
        <ChartCard deviceid={1} sensorid={4}/>
        <ChartCard deviceid={1} sensorid={5}/>
        <ChartCard deviceid={1} sensorid={6}/>
      </div>
    )
  }
}

export default Sensors;