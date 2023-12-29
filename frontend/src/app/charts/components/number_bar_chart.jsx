import React from 'react';
import Chart from 'chart.js/auto';
// TODO: implement treeshaking when done.
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
// );
import { Bar } from 'react-chartjs-2';

/*
date datatype: https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/#mongodb-bsontype-Date
*/
export function isDate(scheme_description) {
  return scheme_description.type.includes("Date")
}

const NumberGenerator = {
  getAThousandExtremeNumbers() {
    const numbers = [];
    for (let i = 0; i < 1000; i++) {
      numbers.push(Math.pow(10, Math.round(Math.random() * 10)))
    }
    return numbers;
  }
}
// export function DateBarChart(data, options, ...props) {
export function NumberBarChart(label, value) {
  const val = NumberGenerator.getAThousandExtremeNumbers();
  const lab = val.map(v => `i=${v}`)
  const schema_description = {
    count: 10,
    type: ['Number', 'Undefined'],
    name: 'number',
    probability: 0.5,
    types: { 'Number': [12, 3, 4, 3, 23], Undefined: undefined }
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Custom Chart Title'
      },
      datalabels: {
        anchor: 'end', // Position of the label
        align: 'end',
        color: 'black', // Label color
        font: {
          weight: 'bold'
        },
        formatter: function (value, context) {
          return value; // Display the value of the bar as the label
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  const data = {
    labels: lab,
    datasets: [{
      // barPercentage: 0.5,
      // barThickness: 6,
      // maxBarThickness: 8,
      // minBarLength: 2,
      data: val,
    }]
  };
  return (
    <Bar
      data={data}
      options={options}
    />
  )
}