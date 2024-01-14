import Chart from 'chart.js/auto'; // TODO: implement treeshaking when done.
import { Bar } from 'react-chartjs-2';
import { Subset } from './subset';
import { ChartHeading } from './util/chart_heading';
import { ChartLandscapeDiv } from './util/chart_divs';

class NumberBarChart {
  constructor(subset) {
    this.subset = subset;
  }
  getComponent() {
    const values = Subset.getValues(this.subset);
    const name = Subset.getName(this.subset);
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
  return (Subset.typeIncludes(subset, 'Number')
    || Subset.typeIs(subset, 'Number'));
}

export { numberChallenge, NumberBarChart };
