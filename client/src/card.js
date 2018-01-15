import React from 'react';

const ChartCard = ({chart, title, description}) => (
    <div className="card card-chart">
        <h1>{title}</h1>
        {chart}
        <p>{description}</p>
    </div>
)

const TextCard = ({title, description}) => (
    <div className="card card-text">
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
)

const MiscCard = ({obj, title, description}) => (
    <div className="card card-misc">
        <h1>{title}</h1>
        {obj}
        <p>{description}</p>
    </div>
)

export {ChartCard, TextCard, MiscCard};