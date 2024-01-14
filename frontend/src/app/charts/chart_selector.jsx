import { numberChallenge, NumberBarChart } from './components/number_bar_chart';
import { StringListChart } from './components/string_list_chart';
import { DateBarChart } from './components/date_bar_chart';
import { BooleanDoughnutChart } from './components/boolean_doughnut_chart';
import { stringChallenge, StringChart } from './components/string_chart';
import { documentChallenge, DocumentChart } from './components/document_chart';
import { ArrayListChart } from './components/array_list_chart';
import { ObjectListChart } from './components/object_list_chart';
import { NullChart } from './components/null_chart';
import { AppContext } from './adapter';
import { Subset } from './components/subset';
import React, { useContext } from 'react';

class ChartSelector {
  constructor() {
    this.charts = new Array();
  }
  register(challenge, chart) {
    this.charts.push([challenge, chart]);
  }
  getChartFor(subset) {
    for (const [challenge, Chart] of this.charts) {
      if (challenge(subset)) {
        return new Chart(subset);
      }
    }
    return new NullChart(subset);
  }
}
// Generelle Tasks um an ein Minimalprodukt ran zu kommen im nächsten Schritt: 
// Wir brauchen erstmal 4 verschiedene Components für die Datentyp Views in unserem Main Chart Window. 
// Strings (als Liste)
// Number, Dates (als Chart zwischen min. & max.)
// Bool (als Chart) 
// Array, Objects (als Listen)

function OStringChart({ name, path }) {
  const { data, sendQuery, updateData, updateStats } = useContext(AppContext);
  const own_data = data.find((item) => {
    // console.log('str', item)
    for (let i = 0; i < item.types[0].path.length; i++) {
      if (i >= path.length - 1) {
        return false;
      }
      if (path[i] !== item.types[0].path[i]) {
        return false;
      }
    }
    return true;
  });
  // console.log('str2', own_data)
  // const values = own_data.types[0].values ? own_data.types[0].values : own_data.types[0].fields;
  // // console.log('str3', values)
  return (
    <div className="rounded-lg border-black border-solid border-2 bg-green-500 p-4">
      <p>A string chart:</p>
      {values.map(
        (value, index) => (<p key={`string-chart-${name}-value${index}`}>{value}</p>)
      )}
      <ul>
        {values.map(
          (value, index) => (
            <Button
              key={`string-chart-${name}-button-${index}`}
              label={value}
              onClick={
                async function get() {
                  let result;
                  result = await sendQuery(makeQuery(name, value), 'db', 'collection')
                  // console.log(result)
                  // updateData(result);  <-- This breaks everything
                  updateStats(result);
                }
              }
            />
          )
        )}
      </ul>
    </div>
  );
}

function booleanChallenge(data) {
  // console.log('data', data)
  if (data.type instanceof Array
    && data.type.includes('Boolean')) {
    return true;
  } else if (data.type === 'Boolean') {
    return true;
  } else {
    return false;
  }
}





function RegularChart({ line }) {
  const properties = Array.from(Object.entries(line));
  const cha = SELECTOR.getChartFor(line);
  const Cha = cha.getComponent();
  return <Cha />; //chart name={line['name']} path={line['types'][0]['path']} />
}
function DocumentInnerChart({ line }) {
  const properties = Array.from(Object.entries(line));
  const Chart = SELECTOR.getChartFor(line);
  return <Chart name={line['name']} path={['types'][0]['types'][0]['values']} />
}
const SELECTOR = new ChartSelector();
// selector.register((data) => (data.type === "String"), StringListChart);
// SELECTOR.register(numberChallenge, NumberBarChart);
// SELECTOR.register(booleanChallenge, BooleanDoughnutChart);
// SELECTOR.register(stringChallenge, StringChart);
SELECTOR.register(documentChallenge, DocumentChart);
// selector.register((data) => (data.type === "Date"), DateBarChart);
// selector.register((data) => (data.type === "Array"), ArrayListChart);
export default SELECTOR;
