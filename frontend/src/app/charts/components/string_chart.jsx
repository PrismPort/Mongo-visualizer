import React, { useContext } from 'react';
import Chart from 'chart.js/auto';  // TODO: implement treeshaking when done.
import { Subset } from './subset';
import { AppContext } from '../adapter';
import { ChartHeading } from './util/chart_heading';
import { ChartPortraitDiv } from './util/chart_divs';

class StringChart {
  constructor(subset) {
    this.subset = subset;
  }
  getComponent() {
    // TODO: use better key
    return (
      <ChartPortraitDiv>
        <ChartHeading inner_text={this.subset.name} />
        <ul>
          {Subset.getValues(this.subset).map((value, index) => <li key={`string-chart-${index}`}>{value}</li>)}
        </ul>
      </ChartPortraitDiv >
    )
  }
}

function stringChallenge(subset) {
  return (Subset.typeIncludes(subset, 'String')
    || Subset.typeIs(subset, 'String'));
}

export { stringChallenge, StringChart };
