import './card.css';

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

export {ChartCard, TextCard, MiscCard, StatsCard};