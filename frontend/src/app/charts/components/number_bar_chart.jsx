import Chart from 'chart.js/auto'; // TODO: implement treeshaking when done.
import { Bar } from 'react-chartjs-2';

import { ChartHeading } from './util/chart_heading';
import { ChartLandscapeDiv } from './util/chart_divs';

class NumberBarChart {
  constructor(data) {
    this.own_data = data;
    this.card = ChartLandscapeDiv;
  }
  getComponent() {
    const Card = this.card;
    const val = this.own_data.types[0].values;
    const lab = val.map(v => `i=${v}`)
    const options = {
      responsive: true,
      // maintainAspectRatio: true,
      //aspectRatio: 2.333333333333, // TODO: This gets overridden if height is set - dont use height and write a test? Or remove attribute?
    };
    const data = {
      labels: lab,
      datasets: [{
        label: '',
        // barPercentage: 0.5,
        // barThickness: 6,
        maxBarThickness: 8,
        // minBarLength: 2,
        backgroundColor: '#2A5639',
        data: val,
      }]
    };
    return (
      <Card>
        <ChartHeading inner_text={this.own_data.name} />
        <Bar
          data={data}
          options={options}
        />
      </Card>
    )
  }
}

function numberChallenge(data) {
  return (isTypeNumber(data) || isTypeNumberAndUndefined(data));
}

function isTypeNumber(data) {
  return (isOfTypeNumberString(data) || isOfTypeNumberArray(data))
}

function isOfTypeNumberString(data) {
  return data.type === 'Number';
}

function isOfTypeNumberArray(data) {
  return (data.type instanceof Array
    && data.type.includes('Number')
    && data.type.length === 1);
}

function isTypeNumberAndUndefined(data) {
  return (data.type instanceof Array
    && data.type.includes('Number')
    && data.type.includes('Undefined')
    && data.type.length === 2);
}

export { numberChallenge, NumberBarChart }
