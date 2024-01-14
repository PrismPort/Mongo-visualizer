import React, { useContext } from 'react';
import Chart from 'chart.js/auto';
import { Subset } from './subset';
import { AppContext } from '../adapter';
import { ChartHeading } from './util/chart_heading';
import { ChartPortraitDiv } from './util/chart_divs';

class StringChart {
  constructor(subset) {
    this.subset = subset;
  }
  getComponent() {
    const values = [];
    for (const value of this.subset.types[0].values) {
      values.push(<li>{value}</li>);
    }
    return (
      <ChartPortraitDiv>
        <ChartHeading inner_text={this.subset.name} />
        <ul>
          {values}
        </ul>
      </ChartPortraitDiv>
    )
  }
}

function stringChallenge(subset) {
  return (Subset.typeIncludes(subset, 'String')
    || Subset.typeIs(subset, 'String'));
}

export { stringChallenge, StringChart };
