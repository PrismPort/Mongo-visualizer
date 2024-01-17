import Chart from 'chart.js/auto';  // TODO: implement treeshaking when done.
import { Doughnut } from 'react-chartjs-2';

import { ChartHeading } from './util/chart_heading';
import { ChartPortraitDiv } from './util/chart_divs';
import { Subset } from './subset';

class BooleanDoughnutChart {
  constructor(subset) {
    this.subset = subset;
  }
  getComponent() {
    const lab = ['true', 'false', 'undefined'];
    const values = [];
    for (const value of Subset.getValues(this.subset)) {
      values.push(value);
    }
    const undefined_values = Subset.getUndefinedValues(this.subset);
    for (let i = 0; i < undefined_values.length; i++) {
      values.push('undefined');
    }
    const title = Subset.getName(this.subset);

    const true_count = values.filter(value => value === true);
    const false_count = values.filter(value => value === false);
    const undefined_count = values.filter(value => value === 'undefined');

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
        data: [true_count.length, false_count.length, undefined_count.length],
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
    );
  }
}


function booleanChallenge(subset) {
  return (Subset.typeIncludes(subset, 'Boolean')
    || Subset.typeIs(subset, 'Boolean'));
}

export { booleanChallenge, BooleanDoughnutChart };
