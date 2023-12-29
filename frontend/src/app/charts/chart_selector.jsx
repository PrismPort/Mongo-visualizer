import { NumberBarChart } from './components/number_bar_chart';
import { StringListChart } from './components/string_list_chart';
import { DateBarChart } from './components/date_bar_chart';
import { BooleanDoughnutChart } from './components/boolean_doughnut_chart';
import { ArrayListChart } from './components/array_list_chart';
import { ObjectListChart } from './components/object_list_chart';
import { NullChart} from './components/null_chart';


class ChartSelector {
    constructor() {
        this.charts = new Array();
    }
    register(condition, chart) {
        this.charts.push([condition, chart]);
    }
    getChartFor(data) {
        for (const chart of this.charts) {
            if (chart[0](data)) {
                return chart[1];
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


function createSelector() {
    const selector = new ChartSelector();
    // selector.register((data) => (data.type === "String"), StringListChart);
    selector.register((data) => (data === "somethsing"), NumberBarChart);
    // selector.register((data) => (data.type === "Date"), DateBarChart);
    // selector.register((data) => (data.type === "Boolean"), BooleanDoughnutChart);
    // selector.register((data) => (data.type === "Array"), ArrayListChart);
    // selector.register((data) => (data.type === "Object"), ObjectListChart);
    return selector
};

const SELECTOR = createSelector();
export default SELECTOR