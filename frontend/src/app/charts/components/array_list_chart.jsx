import React, { useContext } from 'react';
import Chart from 'chart.js/auto';  // TODO: implement treeshaking when done.
import { Subset } from './subset';
import { AppContext } from '../adapter';
import { ChartHeading } from './util/chart_heading';
import { ChartPortraitDiv, ChartLandscapeDiv } from './util/chart_divs';
import SELECTOR from '../chart_selector';

class ArrayChart {
  constructor(subset) {
    this.subset = subset;
  }
  getComponent() {
    // TODO: use better key
    return (
      <ChartPortraitDiv>
        <ChartHeading inner_text={this.subset.name} />
        <ul>
          {Subset.getArraySubsets(this.subset)
            .map((value, index) =>
              <li key={`array-chart-${Subset.getName(this.subset)}-${index}`}>
                <ChartLandscapeDiv>
                  <h2><b>{index}</b></h2>
                  <ul>
                    {value.map((v, i) =>
                      <li key={`array-chart-${Subset.getName(this.subset)}-${index}-${i}`}>
                        {v}
                      </li>)}
                  </ul>
                </ChartLandscapeDiv>
              </li>
            )}
        </ul >
      </ChartPortraitDiv >
    );
  }
  getComponentO() {
    // TODO: use better key
    return (
      <ChartPortraitDiv>
        <ChartHeading inner_text={this.subset.name} />
        <ul>
          {Subset.getArraySubsets(this.subset)
            .map((value, index) =>
              <li key={`array-chart-${Subset.getName(this.subset)}-${index}`}>
                <ChartLandscapeDiv key={`array-chart-${Subset.getName(this.subset)}-${index}`}>
                  <h2><b>{index}</b></h2>
                  <ul>
                    {value.map((v, i) =>
                      <li key={`array-chart-${Subset.getName(this.subset)}-${index}-${i}`}>
                        {v}
                      </li>)}
                  </ul>
                </ChartLandscapeDiv>
              </li>
            )}
        </ul >
      </ChartPortraitDiv >
    );
  }
}

function arrayChallenge(subset) {
  return (Subset.typeIncludes(subset, 'Array')
    || Subset.typeIs(subset, 'Array'));
}

export { arrayChallenge, ArrayChart };
