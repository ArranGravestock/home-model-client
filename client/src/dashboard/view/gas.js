import React, {Component} from 'react';
import 'whatwg-fetch';

/*
const Gas = () => (
  <div>
    <h1>gas</h1>
  </div>
)
*/

class Gas extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    fetch(`http://localhost:8080/test`).then(function(res) {
      console.log(res);
    }, function(err) {
      console.log(err);
      return (err);
    })
  }

  render() {
    return (
      <div>
        <h1>gas</h1>
      </div>
    )
  }
}

export default Gas;