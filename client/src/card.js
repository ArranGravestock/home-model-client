import './card.css';
import {Component} from 'react';
import {HuePicker, AlphaPicker} from 'react-color';

const React = require('react')
const FontAwesome = require('react-fontawesome')

const ChartCard = ({chart, title, style}) => (
    <div className="card card-chart">
        <div className="card-header">
            <h1>{title}</h1>
        </div>
        <div className="card-content" style={style}>
            {chart}
        </div>
    </div>
)

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

const MiscCard = ({obj, title, desc, style}) => (
    <div className="card card-misc">
        <div className="card-header">
            <h1>{title}</h1>
        </div>
        <div className="card-content" style={style}>
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


class LightCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            brightness: 20,
        }
    }

    handleOnChange = (value) => {
        this.setState({
            brightness: value
        })
    }

    render() {
        const {brightness} = this.state;
        return (
        <div className="card card-light">
            <div className="card-header">
                <h1>{this.props.title}</h1>

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

export {ChartCard, TextCard, MiscCard, StatsCard, LightCard};