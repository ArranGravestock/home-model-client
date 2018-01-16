import React from 'react';
import {ChartCard, TextCard} from './card';

//Chart.defaults.global.responsive = true;

const LineChart = require("react-chartjs").Line;
const PieChart = require("react-chartjs").Doughnut;

const PieChartData = [
{
  value: 300,
  color:"#F7464A",
  highlight: "#FF5A5E",
  label: "Red"
},
{
  value: 50,
  color: "#46BFBD",
  highlight: "#5AD3D1",
  label: "Green"
},
{
  value: 100,
  color: "#FDB45C",
  highlight: "#FFC870",
  label: "Yellow"
}
]

const PieChartOptions = {
  segmentShowTroke: true,
  maintainAspectRatio: true,
  responsive: true,
}
      

const LineChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: "My Second dataset",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90]
    }
  ]
};

const LineChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
}

const Water = () => (
  <div className="wrapper">
    <ChartCard title="water" chart={<LineChart data={LineChartData} options={LineChartOptions} />}/>
    <ChartCard title="water" chart={<PieChart data={PieChartData} options={PieChartOptions} width="250" height="250"/>}/>
    <TextCard title="some title" desc="some description"/>
    <TextCard title="some title" desc="some description"/>
    <TextCard title="some title" desc="some description"/>
  </div>
)

export default Water;