import Chart from 'chart.js/auto';  // TODO: implement treeshaking when done.
import { Doughnut } from 'react-chartjs-2';

import { ChartHeading } from './util/chart_heading';
import { ChartPortraitDiv } from './util/chart_divs';


export class BooleanDoughnutChart {
  constructor(subset) {
    this.subset = subset;
  }
  getComponent() {
    const lab = ['true', 'false', 'undefined'];
    const values = [];
    for (const value of this.subset.types[0].values) {
      values.push(value);
    }
    for (let i = 0; i < this.subset.types[1].count; i++) {
      values.push('undefined');
    }
    const title = this.subset.name;

    const truthy = values.filter(value => value === true);
    const falsy = values.filter(value => value === false);
    const un_defined = values.filter(value => value === 'undefined');

    const options = {
      responsive: true,
    };
    const data = {
      labels: lab,
      datasets: [{
        backgroundColor: [
          '#B2DF8A',
          '#2A5639',
          '#AAAAAA',
        ],
        data: [truthy.length, falsy.length, un_defined.length],
      }],
    };
    return (
      <ChartPortraitDiv>
        <ChartHeading inner_text={title} />
        <Doughnut
          data={data}
          options={options}
        />
      </ChartPortraitDiv>
    )
  }
}
