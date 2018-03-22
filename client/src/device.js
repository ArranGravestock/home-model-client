import React, {Component} from 'react';

class Device extends Component {
    constructor() {
      super();
      this.state = {}
    }
  
    render() {
      return (
        <div>
          <h1>Device selection</h1>
          <form>
            <select name="device" multiple>
                <option value="test">raspberry-pi-3</option>
            </select>           
          </form>
        </div>
      )
    }
}
  
export default Device;