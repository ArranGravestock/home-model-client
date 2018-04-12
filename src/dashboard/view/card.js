import '../css/card.css';
import  React, {Component} from 'react';
import {HuePicker} from 'react-color';
import {Line, Doughnut, Pie} from 'react-chartjs';
import FontAwesome from 'react-fontawesome';

class ChartCard extends Component {

    state = {
        title: 'undefined',
        data: [],
        labels: []
    }     

    ChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
    }

    fetch = () => {
        fetch(`http://localhost:3000/device/${this.props.deviceid}/sensor/${this.props.sensorid}`, 
        {
            method: 'GET', 
            credentials: 'include',
            headers: {
                'content-type':'application/json',
                'access-control-allow-origin':'*'
            }
        })
        .then(res => res.json())
        .then(json => {
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
                this.setState(prevState => ({
                    title: json[0].ThingName,
                    labels: [...prevState.labels, dateString],
                    data: [...prevState.data, json[0].ThingState]
                }))
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentWillMount() {
        
        //initial fetch
        this.fetch()

        //set fetch interval
        var interval = setInterval( () => {
            this.fetch()
        }, 2000)
        this.setState({ fetch: interval })
    }

    componentWillUnmount() {
        clearInterval(this.state.fetch);
    }
    
    render() {
        var LineChartData = {
            labels: this.state.labels,
            datasets: [{
                label: "untitled",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: this.state.data,
            }]
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

class StatsDoughnut extends Component {
    state = {
        data: []
    }     

    ChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
    }

    componentWillMount () {
        fetch(`http://localhost:3000/device/${this.props.deviceid}/countallthings`, 
        {
            method: 'GET', 
            credentials: 'include',
            headers: {
                'content-type':'application/json',
                'access-control-allow-origin':'*'
            }
        })
        .then(res => res.json())
        .then(json => {
            json.map(data => {
                this.setState(prevState => ({
                    data: [...prevState.data, {value: data.TotalCount, label: data.ThingName}]
                }))
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        var ChartData = this.state.data;

        return (
        <div className="card card-stats-doughnut">
            <div className="card-header">
                <h1>{this.props.title}</h1>
            </div>
            <div className="card-content">
                <Pie data={ChartData} options={this.ChartOptions}/>
            </div>
        </div>
        )
    }
}

class StatCard extends Component {

    state = {}

    fetchCountByCategory = () => {
        fetch(`http://localhost:3000/device/${this.props.deviceid}/category/${this.props.category}/count`, 
        {
            method: 'GET', 
            credentials: 'include',
            headers: {
                'content-type':'application/json',
                'access-control-allow-origin':'*'
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            json.map(data => {
                this.setState({
                    count: data.TotalCount
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    fetchAPICount = () => {
        fetch(`http://localhost:3000/device/${this.props.deviceid}/count`, 
        {
            method: 'GET', 
            credentials: 'include',
            headers: {
                'content-type':'application/json',
                'access-control-allow-origin':'*'
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            json.map(data => {
                this.setState({
                    count: data.TotalCount
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentWillMount () {
       if (this.props.type == "category") {
            this.fetchCountByCategory()
       } else if (this.props.type == "message") { 
            this.fetchAPICount()
       }
    }

    render() {
    
        var {icon, title} = this.props;
        
        var iconStyle = {
          color: this.props.color,
          background: this.props.color
        };

        var titleStyle = {
            color: this.props.color,
        }
        
        return (
          
          <div className="basic-card-container">
            <div className="icon" style={iconStyle}>
              <i className={icon} aria-hidden="true"></i>
            </div>
            
            <div className="obj">
              <span className="title" style={titleStyle}>{title}</span>
              <div className="number">
                <span>{this.state.count}</span>
              </div>
            </div>
          </div>
        )
      }
}


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
    state = {
        brightness: this.props.brightness,
        toggled: this.props.toggled,
    }

    handleBrightness = (e) => {
        this.setState({
            brightness: e.target.value
        })
    }

    toggle = () => {
        fetch(`http://localhost:3000/device/${localStorage.deviceid}/light/${this.props.id}/state/${this.state.toggled}`, {credentials: 'include', method: 'POST'})
        .then(res => {
            this.setState({
                toggled: !this.state.toggled,
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleColor = (color, e) => {
        this.setState({
            color: color.rgb
        })
    }

    render() {
        return (
            <div className="card card-light">
                <div className="card-header">
                    <h1>{this.props.id}:{this.props.title}</h1>

                    <label className="switch">
                        <input type="checkbox" className={this.props.title} defaultChecked={this.state.toggled} onClick={this.toggle}/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="card-content">
                    <div className="slider">
                        <HuePicker width="100%" onChangeComplete={this.handleColor}/>
                        <div className="brightness-container">
                            <input type="range" step="1" min="1" max="100" className="bightness-slider" onChange={this.handleBrightness}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

class RemoteCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentState: 0
        }
    }

    render() {

        return (
        <div className="card card-light">
            <div className="card-header">
                <h1>{this.props.id}:{this.props.title}</h1>

                <label className="switch">
                    <input type="checkbox" className={this.props.title} checked={this.props.state ? true : false} onClick={this.toggleLight} onChange={() => {!this.props.state}}/>
                    <span className="slider round"></span>
                </label>
            </div>
            <div className="card-content">
            </div>
        </div>
        )
    }

}

export {ChartCard, TextCard, MiscCard, StatsDoughnut, LightCard, DeviceCard, RegisterDeviceCard, RemoteCard, StatCard};