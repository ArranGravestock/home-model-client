import '../css/card.css';
import  React, {Component} from 'react';
import {Line, Pie, Bar} from 'react-chartjs';

import '../../css/button.css'

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
        fetch(`http://localhost:3000/device/${this.props.deviceid}/type/sensor/${this.props.sensorid}`, 
        {
            method: 'GET', 
            credentials: 'include',
            headers: {
                'content-type':'application/json',
                'Access-Control-Allow-Origin':'localhost:3001',
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
                fillColor: "rgba(54,65,81,0.2)",
                strokeColor: "rgba(48,59,77,1)",
                pointColor: "rgba(48,59,77,1)",
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

class ErrorCard extends Component {
    render() {
        return (
            <div className={`card-error ${this.props.type}`}>
                <div className={`card-icon card-${this.props.type}-icon`} >
                
                </div>
                <div className="card-error-text">
                    <div className="content">
                        <p>{this.props.error}</p>
                    </div>
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

class LineChartCard extends Component {
    state = {
        labels: [],
        data: [],
        renderChart: '',
        value: '1'
    }     

    ChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
    }

    fetchData(fetchurl, type) {
        fetch(fetchurl, 
        {
            method: 'GET', 
            credentials: 'include',
            headers: {
                'content-type':'application/json',
                'Access-Control-Allow-Origin':'localhost:3001',
            }
        })
        .then(res => res.json())
        .then(json => {
            this.setState({
                labels: [],
                data: []
            })
            json.forEach(json => {
                if (type === "averagedays") {
                    this.setState(prevState => ({
                        labels: [...prevState.labels, json.dates.slice(0,10)],
                        data: [...prevState.data, json.average]
                    }))
                } else if (type === "averagehours") {
                    this.setState(prevState => ({
                        labels: [...prevState.labels, json.hours],
                        data: [...prevState.data, json.average]
                    }))
                } else {
                    //something's not right
                }
            })
        })
        .then ( () => {
            var data = {
                labels: this.state.labels,
                datasets: [
                    {
                        label: "Times Activated",
                        fillColor: "rgba(54,65,81,0.5)",
                        strokeColor: "rgba(54,65,81,0.8)",
                        highlightFill: "rgba(54,65,81,0.75)",
                        highlightStroke: "rgba(54,65,81,1)",
                        data: this.state.data
                    }
                ]
            }
            this.setState({renderChart: <Line data={data} options={this.ChartOptions}/> })
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentWillMount () {
        this.fetchData(`http://localhost:3000/averageforlasthours/device/${localStorage.deviceid}/thing/${this.props.thingid}/hours/24`, this.props.type);
    }

    handleChange(event) {
        this.setState({value: event.target.value}, () => {
            if (this.state.value === "1") {
                this.fetchData(`http://localhost:3000/averageforlasthours/device/${localStorage.deviceid}/thing/${this.props.thingid}/hours/24`, this.props.type);
            } else if (this.state.value === "7") {
                this.fetchData(`http://localhost:3000/averageforlastdays/device/${localStorage.deviceid}/thing/${this.props.thingid}/days/7`, this.props.type);
            }
        });
    }

    render() {

        return (
            <div className="card card-stats-line">
                <div className="card-header">
                    <h1>{this.props.title}</h1>
                    <select value={this.state.value} onChange={this.handleChange.bind(this)}>
                        <option value="1">Last 24 hours</option>
                        <option value="7">Last 7 days</option>
                    </select>
                </div>
                <div className="card-content">
                    {this.state.renderChart}
                </div>
            </div>
        )
    }
}
class ChartBarCard extends Component {
    state = {
        labels: [],
        data: [],
        renderChart: ''
    }     

    ChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
    }

    componentWillMount () {
        fetch(this.props.fetchurl, 
        {
            method: 'GET', 
            credentials: 'include',
            headers: {
                'content-type':'application/json',
                'Access-Control-Allow-Origin':'localhost:3001',
            }
        })
        .then(res => res.json())
        .then(json => {
            json.forEach(json => {
                if (this.props.type === "count") {
                    this.setState(prevState => ({
                        labels: [...prevState.labels, json.ThingName],
                        data: [...prevState.data, json.TotalCount]
                    }))
                } else if (this.props.type === "averagedays") {
                    this.setState(prevState => ({
                        labels: [...prevState.labels, json.dates.slice(0,10)],
                        data: [...prevState.data, json.average]
                    }))
                } else if (this.props.type === "averagehours") {
                    this.setState(prevState => ({
                        labels: [...prevState.labels, json.hours],
                        data: [...prevState.data, json.average]
                    }))
                } else {
                    //something's not right
                }
            })
        })
        .then ( () => {
            var data = {
                labels: this.state.labels,
                datasets: [
                    {
                        label: "Times Activated",
                        fillColor: "rgba(54,65,81,0.5)",
                        strokeColor: "rgba(54,65,81,0.8)",
                        highlightFill: "rgba(54,65,81,0.75)",
                        highlightStroke: "rgba(54,65,81,1)",
                        data: this.state.data
                    }
                ]
            }
            if (this.props.type === "averagehours") {
                this.setState({renderChart: <Line data={data} options={this.ChartOptions}/> })
            } else {
                this.setState({renderChart: <Bar data={data} options={this.ChartOptions}/> })
            }
        }

        )
        .catch(err => {
            console.log(err)
        })
    }

    render() {

        return (
            <div className="card card-stats-doughnut">
                <div className="card-content">
                    {this.state.renderChart}
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
                'Access-Control-Allow-Origin':'localhost:3001',
            }
        })
        .then(res => res.json())
        .then(json => {
            json.forEach(data => {
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
                'Access-Control-Allow-Origin':'localhost:3001',
            }
        })
        .then(res => res.json())
        .then(json => {
            json.forEach(data => {
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
       if (this.props.type === "category") {
            this.fetchCountByCategory()
       } else if (this.props.type === "message") { 
            this.fetchAPICount()
       }
    }

    render() {
    
        var {icon, title} = this.props;
        
        var iconStyle = {
          color: '#fff',
          background: this.props.color,
        };

        var titleStyle = {
            color: this.props.color,
        }
        
        return (
          
          <div className="basic-card-container">
            <div className="icon" style={iconStyle}>
              <i className={icon}/>
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

class DeviceCard extends Component {

    state = {
        id: this.props.id
    }

    updateDevice = (name, id) => {
        localStorage.deviceid = id;
        localStorage.device = name;
    }


    render() {
        return (
            <div className="card card-device">
            <div className="card-header" style={{display: 'flex', flexWrap: 'column', justifyContent: 'space-between'}}>
                <h1>{this.props.title}</h1>
                <div onClick={this.props.click}>
                    <i className="fas fa-times" style={{cursor: 'pointer'}}/>
                </div>
            </div>
            <div className="card-content">
                <button className="button-blue" onClick={() => this.updateDevice(this.props.title, this.props.id)}>Select</button>
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
        this.setState({
            toggled: !this.state.toggled,
        }, () => {
            fetch(`http://localhost:3000/device/${localStorage.deviceid}/thing/${this.props.id}/state/${this.state.toggled}`, {credentials: 'include', headers: {
                'Access-Control-Allow-Origin':'localhost:3001',
            }, method: 'POST'})
            .then(res => {
                //everything went well...
            })
            .catch(err => {
                console.log(err);
            })
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
                    <h1>{this.props.title}</h1>

                    <label className="switch">
                        <input type="checkbox" className={this.props.title} defaultChecked={this.state.toggled} onClick={this.toggle}/>
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        )
    }

}

class RemoteCard extends Component {

    state = {
        toggled: this.props.toggled,
    }

    toggle = () => {
        this.setState({
            toggled: !this.state.toggled,
        }, () => {
            fetch(`http://localhost:3000/device/${localStorage.deviceid}/thing/${this.props.id}/state/${this.state.toggled}`, {credentials: 'include', headers: {
                'Access-Control-Allow-Origin':'localhost:3001',
            }, method: 'POST'})
            .then(res => {
                //everything went well...
            })
            .catch(err => {
                console.log(err);
            })
        })
    }

    render() {

        return (
        <div className="card card-light">
            <div className="card-header">
                <h1>{this.props.title}</h1>

                <label className="switch">
                <input type="checkbox" className={this.props.title} defaultChecked={this.state.toggled} onClick={this.toggle}/>
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
        )
    }

}

export {ChartCard, TextCard, MiscCard, ChartBarCard, LightCard, DeviceCard, RemoteCard, StatCard, ErrorCard, LineChartCard};