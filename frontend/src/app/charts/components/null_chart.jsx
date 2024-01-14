import React, { useContext } from 'react';
import Chart from 'chart.js/auto';  // TODO: implement treeshaking when done.
import { Subset } from './subset';
import { ChartHeading } from './util/chart_heading';
import { ChartPortraitDivRed } from './util/chart_divs';

class NullChart {
  constructor(subset) {
    this.subset = subset;
  }
  getComponent() {
    return (
      <ChartPortraitDivRed>
        <ChartHeading inner_text={'There is no Chart registered for this subset.'} />
        <code><pre>{Subset.toPrettyString(this.subset)}</pre></code>
      </ChartPortraitDivRed>
    );
  }
}

export { NullChart };
