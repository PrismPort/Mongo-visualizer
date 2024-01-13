import React, { useContext } from 'react';
import Chart from 'chart.js/auto';

import { AppContext } from '../adapter';

export class NullChart {
  constructor(data) {
    this.data = data;
  }
  getComponent() {
    return (
      <NullChart own_data={this.data} />
    );

    function NullChart({ own_data }) {
      const { data } = useContext(AppContext);
      return (
        <div className="rounded-lg border-black border-solid border-2 bg-red-500 p-4">
          <p>There is no chart defined for this:</p>
          <p>{JSON.stringify(own_data)}</p>
        </div>
      );
    }
  }
}
function NullChartComponent({ data }) {
  // const own_data = this.data.find((item) => item.name);
  console.log('hey!')
  return (
    <div className="rounded-lg border-black border-solid border-2 bg-red-500 p-4">
      <p>There is no chart defined for this:</p>
      <p>{data}</p>
      {/* <p>{`${own_data ? JSON.stringify(own_data.types, null, 2) : 'undefined'}`}</p> */}
    </div>
  );
}
