import React from 'react';
import './card.css';

const ChartCard = ({chart, title}) => (
    <div className="card card-chart">
        <h1>{title}</h1>
        {chart}
    </div>
)

const TextCard = ({title, desc}) => (
    <div className="card card-text">
        <h1>{title}</h1>
        <p>{desc}</p>
    </div>
)

const MiscCard = ({obj, title, desc}) => (
    <div className="card card-misc">
        <h1>{title}</h1>
        {obj}
        <p>{desc}</p>
    </div>
)

export {ChartCard, TextCard, MiscCard};