import '../css/card.css';
import  React, {Component} from 'react';
import {HuePicker, AlphaPicker} from 'react-color';
import {deviceSelected} from './device';
import {Line} from 'react-chartjs';
import FontAwesome from 'react-fontawesome';

class ChartCard extends Component {

    state = {
        title: 'test',
        data: [],
        labels: []
      }     

      ChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
      }

    componentWillMount() {
        var interval = setInterval( () => {
            fetch(`http://localhost:3000/device/${this.props.deviceid}/sensor/${this.props.sensorid}`, 
            {
                method: 'GET', 
                credentials: 'include',
                headers: {
                    'content-type':'application/json',
                    'access-control-allow-origin':'*'
                }
            }).then((res) => res.json()).then(json => {
                var d = new Date();
                var dateString = `${d.toLocaleTimeString()}`
                this.setState({title: json[0].ThingName})
                if(this.state.data.length > 10) {
                    
                    this.setState(prevState => ({
                        title: json[0].ThingName,
                        labels: [...prevState.labels.splice(1,10), dateString],
                        data: [...prevState.data.splice(1, 10), json[0].ThingState]
                    }))
                } else {
                    var d = new Date();
                    this.setState(prevState => ({
                        title: json[0].ThingName,
                        labels: [...prevState.labels, dateString],
                        data: [...prevState.data, json[0].ThingState]
                    }))
                }
                
                // this.setState(prevState => ({
                //     title: json[0].SensorName,
                //     labels: [...prevState.labels, d.getMinutes()],
                //     data: [...prevState.data, json[0].SensorState]
                // }))
            })
        }, 2000)
        this.setState({ fetch: interval })
        console.log(this.state.data);
    }

    componentWillUnmount() {
        clearInterval(this.state.fetch);
    }
    
    render() {
        var LineChartData = {
            labels: this.state.labels,
            datasets: [
              {
                label: "Motion",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: this.state.data,
              }
            ]
          }
        return(
            <div className="card card-chart">
                <div className="card-header">
                    <h1>{this.state.title}</h1>
                </div>
                <div className="card-content">
                    <Line id={`line-chart${this.props.deviceid}`} data={LineChartData} options={this.ChartOptions}/>
                </div>
            </div>
        )
    }
}

const TextCard = ({title, desc, state, style}) => (
    <div className="card card-text">
        <div className="card-header">
            <h1>{title}</h1>
        </div>
        <div className="card-content" style={style}>
            <p className={(state==="locked") ? "state-locked" : "state-unlocked"}>{desc}</p>
        </div>
    </div>
)

const MiscCard = ({obj, title, desc}) => (
    <div className="card card-misc">
        <div className="card-header">
            <h1>{title}</h1>
        </div>
        <div className="card-content">
            {obj}
            <p>{desc}</p>
        </div>
    </div>
)

const StatsCard = ({title, stats, type, style}) => (
    <div className="card card-stats">
        <div className="card-header">
            <h1>{title}</h1>
        </div>
        <div className="card-content" style={style}>
            <h2>{stats}</h2>
            <FontAwesome className={type} name={(type==="stats-up") ? "long-arrow-up" : "long-arrow-down"}/>
            <span className={type}>12.3%</span>
            <span>this month</span>
        </div>
    </div>
)

class RegisterDeviceCard extends Component {

    state = {
        devicetoken: '',
    }

    registerDevice = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/registerdevice/${this.state.devicetoken}`, {method: 'POST', credentials: 'include'}).then(
            () => {
                alert("new device registered");
            }
        ).catch(
            () => {
                alert("device token incorrect!");
            }
        )
    }

    handleChange = prop => (event) => {
        this.setState({[prop]: event.target.value})
    }

    render() {
        return (
            <div className="card card-text">
                <div className="card-header">
                    <h1>Register a new device</h1>
                </div>
                <div className="card-content">
                    <form>
                        <input type="text" name="deviceid" onChange={this.handleChange("devicetoken")}/>
                        <button onClick={this.registerDevice}>Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

class DeviceCard extends Component {
    updateDevice = (name, id) => {
        localStorage.deviceid = id;
        localStorage.device = name;
    }
    render() {
        return (
            <div className="card card-device">
            <div className="card-header">
                <h1>{this.props.title}</h1>
            </div>
            <div className="card-content">
                <button onClick={() => this.updateDevice(this.props.title, this.props.id)}>Select</button>
            </div>
        </div>
        )
    }
}

class LightCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentState: 0,
            brightness: 20,
        }
    }

    handleOnChange = (value) => {
        this.setState({
            brightness: value
        })
    }

    toggleLight = () => {
        //update light
    }

    render() {
        const {brightness} = this.state;
        return (
        <div className="card card-light">
            <div className="card-header">
                <h1>{this.props.id}:{this.props.title}</h1>

                <label className="switch">
                    <input type="checkbox" className={this.props.title} checked={this.props.state ? true : false} onClick={this.toggleLight} onChange={()=> {!this.props.state}}/>
                    <span className="slider round"></span>
                </label>
            </div>
            <div className="card-content">
                <div className="slider">
                    <HuePicker width="100%"/>
                    <AlphaPicker width="100%"/>
                    <div className="brightness-container">
                        <input type="range" step="1" min="1" max="100" value={brightness} className="bightness-slider" onChange={this.handleOnChange}/>
                    </div>
                </div>
            </div>
        </div>
        )
    }

}
/*

const LightCard = ({title}) => (
    <div className="card card-light">
        <div className="card-header">
            <h1>{title}</h1>

            <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
            </label>
        </div>
        <div className="card-content">
            <div className="slider">
                <HuePicker width="100%"/>
                <AlphaPicker width="100%"/>
                <div className="brightness-container">
                    <input type="range" min="1" max="100" value="50" className="bightness-slider" id="range" onChange={sliderInput}/>
                </div>
            </div>
        </div>
    </div>
)
*/

export {ChartCard, TextCard, MiscCard, StatsCard, LightCard, DeviceCard, RegisterDeviceCard};