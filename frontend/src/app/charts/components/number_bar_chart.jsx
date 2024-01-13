import Chart from 'chart.js/auto'; // TODO: implement treeshaking when done.
import { Bar } from 'react-chartjs-2';

import { ChartHeading } from './util/chart_heading';
import { ChartLandscapeDiv } from './util/chart_divs';

class NumberBarChart {
  constructor(data) {
    this.own_data = data;
  }
  getComponent() {
    const val = this.own_data.types[0].values;
    const lab = val.map(v => `i=${v}`)
    const options = {
      responsive: true,
    };
    const data = {
      labels: lab,
      datasets: [{
        label: '',
        maxBarThickness: 8,
        backgroundColor: '#2A5639',
        data: val,
      }]
    };
    return (
      <ChartLandscapeDiv>
        <ChartHeading inner_text={this.own_data.name} />
        <Bar
          data={data}
          options={options}
        />
      </ChartLandscapeDiv>
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
