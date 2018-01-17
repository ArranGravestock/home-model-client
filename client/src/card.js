import './card.css';

const React = require('react')
const FontAwesome = require('react-fontawesome')

const ChartCard = ({chart, title}) => (
    <div className="card card-chart">
        <h1>{title}</h1>
        {chart}
    </div>
)

const TextCard = ({title, desc, state}) => (
    <div className="card card-text">
        <h1>{title}</h1>
        <p className={(state==="locked") ? "state-locked" : "state-unlocked"}>{desc}</p>
    </div>
)

const MiscCard = ({obj, title, desc}) => (
    <div className="card card-misc">
        <h1>{title}</h1>
        {obj}
        <p>{desc}</p>
    </div>
)

const StatsCard = ({title, stats, type}) => (
    <div className="card card-stats">
        <h2>{title}</h2>
        <h1>{stats}</h1>
        <FontAwesome className={type} name={(type==="stats-up") ? "long-arrow-up" : "long-arrow-down"}/>
        <span className={type}>12.3%</span>
        <span>this month</span>
    </div>
)

export {ChartCard, TextCard, MiscCard, StatsCard};