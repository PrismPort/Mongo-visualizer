import Chart from 'chart.js/auto';  // TODO: implement treeshaking when done.

import { Doughnut } from 'react-chartjs-2';
import { ChartHeading } from './util/chart_heading';

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

const FAKE_DATA = {
  labels: ['true', 'false'],
  get values() {
    const values = [];
    let i = 0;
    while (i < 100) {
      values.push(i < 58 ? true : false);
      i++;
    }
    return values;
  },
  name: 'popular'
}
// export function DateBarChart(data, options, ...props) {
export class BooleanDoughnutChart {
  constructor(data) {
    this.own_data = data;
  }
  getComponent() {

    const lab = FAKE_DATA.labels;
    const values = FAKE_DATA.values;
    const title = FAKE_DATA.name;

    const truthy = values.filter(value => value === true);
    const falsy = values.filter(value => value === false);
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
      //aspectRatio: 0.666666666, // TODO: This gets overridden if height is set - dont use height and write a test? Or remove attribute?
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
        backgroundColor: [
          '#B2DF8A',
          '#2A5639',
        ],
        data: [truthy.length, falsy.length],
      }],
    };
    return (
      <Portrait>
        <ChartHeading inner_text={title} />
        <Doughnut
          data={data}
          options={options}
        />
      </Portrait >
    )
  }
}
function Portrait({ children }) {
  return (
    <div className='aspect-[3/4] rounded-lg border-2 border-black p-12'>
      {children}
    </div>
  )
}
