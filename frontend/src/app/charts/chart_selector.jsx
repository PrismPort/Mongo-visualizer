import { NumberBarChart } from './components/number_bar_chart';
import { StringListChart } from './components/string_list_chart';
import { DateBarChart } from './components/date_bar_chart';
import { BooleanDoughnutChart } from './components/boolean_doughnut_chart';
import { ArrayListChart } from './components/array_list_chart';
import { ObjectListChart } from './components/object_list_chart';
import { NullChart } from './components/null_chart';
import { AppContext } from './adapter';
import React, { useContext } from 'react';


function Button({ label, onClick }) {
    return (
        <li>
            <button onClick={onClick}>{label}</button>
        </li>
    );
};

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

class Connector {
    #context
    constructor() {
        this.#context = AppContext;
    }

}

class ToggleSwitchManager {
    constructor() {
        this.context = AppContext;
        this.switches = [];
    }
    register(toggle_switch) {
        toggle_switch.
            this.switches.push(toggle_switch);
    }
    getConnectedToggleSwitch(something) {
        // TODO use the existing toggle and listen to its state (?)

    }
}

function makeQuery(key, value) {
    return { [key]: { $ne: value } };
}

function StringChart({ name }) {
    const { data, sendQuery, updateData, updateStats } = useContext(AppContext);
    const own_data = data.find((item) => (item.name === name));
    const values = own_data.types[0].values;
    return (
        <div className="rounded-lg border-black border-solid border-2 bg-green-500 p-4">
            <p>A string chart:</p>
            <p>{`${JSON.stringify(own_data)}`}</p>
            {/* {values.map(
                (value, index) => (<p key={`string-chart-${name}-value${index}`}>{value}</p>)
            )} */}
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
                                    console.log(result)
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

function numberChallenge(data) {
    if (data.type instanceof Array
        && data.type.includes('Number')) {
        return true;
    } else if (data.type === 'Number') {
        return true;
    } else {
        return false;
    }
}

function booleanChallenge(data) {
    if (data.type instanceof Array
        && data.type.includes('Boolean')) {
        return true;
    } else if (data.type === 'Boolean') {
        return true;
    } else {
        return false;
    }
}

const SELECTOR = new ChartSelector();
// selector.register((data) => (data.type === "String"), StringListChart);
SELECTOR.register(numberChallenge, NumberBarChart);
// selector.register((data) => (data.type === "Date"), DateBarChart);
SELECTOR.register(booleanChallenge, BooleanDoughnutChart);
SELECTOR.register(stringChallenge, StringChart);
// selector.register((data) => (data.type === "Array"), ArrayListChart);
// selector.register((data) => (data.type === "Object"), ObjectListChart);
export default SELECTOR;