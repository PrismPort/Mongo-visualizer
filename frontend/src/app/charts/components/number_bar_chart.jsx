import Chart from 'chart.js/auto'; // TODO: implement treeshaking when done.
import { Bar } from 'react-chartjs-2';

import { ChartHeading } from './util/chart_heading';
import { ChartLandscapeDiv } from './util/chart_divs';

function subsetValues(subset) {
  return subset.types[0].values;
}

function subsetName(subset) {
  return subset.name;
}

class NumberBarChart {
  constructor(subset) {
    this.subset = subset;
  }
  getComponent() {
    const values = subsetValues(this.subset);
    const name = subsetName(this.subset);
    const lab = values.map(v => `i=${v}`)
    const options = {
      responsive: true,
    };
    const data = {
      labels: lab,
      datasets: [{
        label: '',
        maxBarThickness: 8,
        backgroundColor: '#2A5639',
        data: values,
      }]
    };
    return (
      <ChartLandscapeDiv>
        <ChartHeading inner_text={name} />
        <Bar
          data={data}
          options={options}
        />
      </ChartLandscapeDiv>
    )
  }
}

function numberChallenge(subset) {
  return (isTypeNumber(subset) || isTypeNumberAndUndefined(subset));
}

function isTypeNumber(subset) {
  return (isOfTypeNumberString(subset) || isOfTypeNumberArray(subset))
}

function isOfTypeNumberString(subset) {
  return subset.type === 'Number';
}

function isOfTypeNumberArray(subset) {
  return (subset.type instanceof Array
    && subset.type.includes('Number')
    && subset.type.length === 1);
}

function isTypeNumberAndUndefined(subset) {
  return (subset.type instanceof Array
    && subset.type.includes('Number')
    && subset.type.includes('Undefined')
    && subset.type.length === 2);
}

export { numberChallenge, NumberBarChart }
