import React from 'react';
import Chart from 'chart.js/auto';
// TODO: implement treeshaking when done.
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
// );
import { Bar } from 'react-chartjs-2';

/*
date datatype: https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/#mongodb-bsontype-Date
*/
export function isDate(scheme_description) {
  return scheme_description.type.includes("Date")
}
// export function DateBarChart(data, options, ...props) {
export function NumberBarChart() {
  const schema_description = {
    count: 10,
    type: ['Number', 'Undefined'],
    name: 'number',
    probability: 0.5,
    types: { 'Number': [12, 3, 4, 3, 23], Undefined: undefined }
  };
  const data = {
    datasets: [{
      barPercentage: 0.5,
      barThickness: 6,
      maxBarThickness: 8,
      minBarLength: 2,
      data: [10, 20, 30, 40, 50, 60, 70]
    }]
  };
  return (
    <Bar
      data={data}
    />
  )
}