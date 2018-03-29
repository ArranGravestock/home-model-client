import React, {Component} from 'react';
import 'whatwg-fetch';
import {ChartCard} from '../card';


class Sensors extends Component {






  
  
  render() {
    return(
      <div className="content">
        <ChartCard deviceid={1} sensorid={1}/>
        <ChartCard deviceid={1} sensorid={2}/>
        <ChartCard deviceid={1} sensorid={3}/>
      </div>
    )
  }
}

export default Sensors;