import { NumberBarChart } from './components/number_bar_chart';
import { StringListChart } from './components/string_list_chart';
import { DateBarChart } from './components/date_bar_chart';
import { BooleanDoughnutChart } from './components/boolean_doughnut_chart';
import { ArrayListChart } from './components/array_list_chart';
import { ObjectListChart } from './components/object_list_chart';
import { NullChart } from './components/null_chart';
import { AppContext } from './adapter';
import React, { useContext } from 'react'


class ChartSelector {
    constructor() {
        this.charts = new Array();
    }
    register(challenge, chart) {
        this.charts.push([challenge, chart]);
    }
    getChartFor(data) {
        for (const [challenge, chart] of this.charts) {
            if (challenge(data)) {
                return chart;
            }
        }
        return NullChart;
    }
}

// Generelle Tasks um an ein Minimalprodukt ran zu kommen im nächsten Schritt: 
// Wir brauchen erstmal 4 verschiedene Components für die Datentyp Views in unserem Main Chart Window. 
// Strings (als Liste)
// Number, Dates (als Chart zwischen min. & max.)
// Bool (als Chart) 
// Array, Objects (als Listen)

function StringChart({ specific_data, path }) {
    const { data } = useContext(AppContext);
    console.log('path', path);
    console.log(specific_data);
    const string_data_from_context = data.find((item) => item.name ==  path);
    console.log(string_data_from_context)
    console.log(string_data_from_context == specific_data)
    return (
        <div className="rounded-lg border-black border-solid border-2 bg-green-500 p-4">
            <p>A string chart:</p>
            <p>{`${JSON.stringify(string_data_from_context)}`}</p>
            <h1>specific data</h1>
            <p>{`${JSON.stringify(specific_data)}`}</p>
            <h1>data</h1>
            <p>{`${JSON.stringify(data, null, 2)}`}</p>
        </div>
    );
}

function getStringData(data) {
    return data;
}

function stringChallenge(data) {
    if (data.type instanceof Array
        && data.type.includes('String')) {
        return true;
    } else if (data.type === 'String') {
        return true;
    } else {
        return false;
    }
}

class Filter {
    constructor(path) {
        this.path = path;
    }
    filter(data) {
        return data.path
    }
}

function createSelector() {
    const selector = new ChartSelector();
    // selector.register((data) => (data.type === "String"), StringListChart);
    selector.register((data) => (data === "something"), NumberBarChart);
    // selector.register((data) => (data.type === "Date"), DateBarChart);
    selector.register((data) => (data === "somethings-different"), BooleanDoughnutChart);
    selector.register(stringChallenge, StringChart)
    // selector.register((data) => (data.type === "Array"), ArrayListChart);
    // selector.register((data) => (data.type === "Object"), ObjectListChart);
    return selector
};

const SELECTOR = createSelector();
export default SELECTOR