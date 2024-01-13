import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
);
import { Bar } from 'react-chartjs-2';

/*
date datatype: https://www.mongodb.com/docs/manual/reference/mongodb-extended-json/#mongodb-bsontype-Date
*/
export function isDate(scheme_description) {
  return scheme_description.type.includes("Date")
}
// export function DateBarChart(data, options, ...props) {
export function DateBarChart() {

  const data = {
    labels: [
      'true',
      'false'
    ],
    datasets: [{
      data: [123,123],
    }]
  };
  return (
    <Bar
      data={data}
    />
  )
}