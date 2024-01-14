import React, { useContext } from 'react';
import Chart from 'chart.js/auto';

import { AppContext } from '../adapter';
import { ChartHeading } from './util/chart_heading';
import { ChartPortraitDiv } from './util/chart_divs';

export class StringChart {
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
export function stringChallenge(data) {
  if (data.type instanceof Array
    && data.type.includes('String')) {
    return true;
  } else if (data.type === 'String') {
    return true;
  } else {
    return false;
  }
}
