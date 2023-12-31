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
import ChartHeading from './chart_heading';

/*
date datatype: https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/#mongodb-bsontype-Date
*/
function isDate(scheme_description) {
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
function NumberBarChart() {
  const val = [0, 0, 0, 12, 14, 54, 65, 59, 39, 23, 2, 0]//NumberGenerator.getAThousandExtremeNumbers();
  const lab = [1, 2, 3, 4, 5, 6, 7, 8, 9.10, 11, 12, 13, 14, 15]//val.map(v => `i=${v}`)
  const schema_description = {
    count: 10,
    type: ['Number', 'Undefined'],
    name: 'number',
    probability: 0.5,
    types: { 'Number': [12, 3, 4, 3, 23], Undefined: undefined }
  };
  const options = {
    plugins: {
      datalabels: {
        anchor: 'end', // Position of the label
        align: 'end',
        color: 'black', // Label color
        font: {
          weight: 'bold',
        },
        formatter: function (value, context) {
          return value; // Display the value of the bar as the label
        }
      }
    },
    responsive: true,
    // maintainAspectRatio: true,
    //aspectRatio: 2.333333333333, // TODO: This gets overridden if height is set - dont use height and write a test? Or remove attribute?
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
      label: '',
      // barPercentage: 0.5,
      // barThickness: 6,
      // maxBarThickness: 8,
      // minBarLength: 2,
      backgroundColor: '#2A5639',
      data: val,
    }]
  };
  return (
    <Landscape>
      <ChartHeading inner_text={'score'} />
      <Bar
        data={data}
        options={options}
      />
    </Landscape>
  )
}
function Landscape({ children }) {
  return (
    <div className='aspect-[7/4] rounded-lg border-2 border-black p-12'>
      {children}
    </div>
  )
}
export {isDate, NumberBarChart}
