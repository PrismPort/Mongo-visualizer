"use client"

import React, { useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AppContext, handleShowDatabases, handleLoadCollections } from '../adapter';
ChartJS.register(ArcElement, Tooltip, Legend);
let used = 0;
async function dbs(ctx) {
  const arr = [];
  used += 1;
  if (used > 20) {
    return "used"
  }
  let dbs = await handleShowDatabases();
  //console.log(dbs)
  dbs.forEach(async (db) => {
    let collections = await handleLoadCollections(db);
    collections?.forEach(async (collection) => {
      // console.log(`database: ${db} collection: ${collection}`);
      arr.push(await ctx.handleAnalyzeCollections(localStorage.getItem('mongoURL'), db, collection))
    });
  })
  return arr;
};
function BarChart() {

}
function AChartFor(data) {

}
function DoughnutChart(...numbers) {
  const data = {
    labels: [
      'true',
      'false'
    ],
    datasets: [{
      data: [numbers],
      backgroundColor: [
        '#B2DF8A',
        '#2A5639',
      ],
      hoverOffset: 4
    }]
  };
  return (<Doughnut data={data} />);
}

function AExampleDoughnut() {
  const ctx = useContext(AppContext);
  console.log(ctx)
  const boolean_stats = ctx.stats.filter(obj => obj.type === "Boolean");
  console.log("bool: ", boolean_stats);
  try {
    const values = boolean_stats[0].types["Boolean"];
    const truthy = values.filter(value => value === true);
    const falsy = values.filter(value => value === false);
    const data = {
      labels: [
        'true',
        'false'
      ],
      datasets: [{
        data: [truthy.length, falsy.length],
        backgroundColor: [
          '#B2DF8A',
          '#2A5639',
        ],
        hoverOffset: 4
      }]
    };
    return (<Doughnut data={data} />);
  }

  catch (error) {
    return (<>{error.toString()}</>);
  }
}

const myPromise = (ctx) => new Promise((resolve, reject) => {
  resolve(dbs(ctx))
});

function ExampleDoughnut() {
  const ctx = useContext(AppContext);
  console.log("doughnut:", ctx);
  myPromise(ctx).then((value) => (console.log(value)))
  // setTimeout(async function () {
  //   console.log("all",await dbs(ctx));
  // }, 0);

  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 1000],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  return (
    <>
      <Doughnut data={data} />
    </>
  );
};
const OtherExampleDoughnut = () => {
  const data = {
    datasets: [{
      data: [{ id: 'Sales', nested: { value: 1500 } }, { id: 'Purchases', nested: { value: 500 } }]
    }]
  };
  const options = {
    parsing: {
      key: 'nested.value'
    }
  };
  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};
function TheStatsDisplay() {
  const ctx = useContext(StatsContext);
  console.log(ctx)
  return (
    <>
      <textarea value={ctx?.collection}></textarea>
    </>
  )
}
const MongoDou = () => {
  return (
    <>
      <TheStatsDisplay />
    </>
  )
};


export default ExampleDoughnut;