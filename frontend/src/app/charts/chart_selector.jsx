import { numberChallenge, NumberBarChart } from './components/number_bar_chart';
import { booleanChallenge, BooleanDoughnutChart } from './components/boolean_doughnut_chart';
import { stringChallenge, StringChart } from './components/string_chart';
import { documentChallenge, DocumentChart } from './components/document_chart';
import { arrayChallenge, ArrayChart } from './components/array_list_chart';
import { NullChart } from './components/null_chart';

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

const SELECTOR = new ChartSelector();

SELECTOR.register(numberChallenge, NumberBarChart);
SELECTOR.register(booleanChallenge, BooleanDoughnutChart);
SELECTOR.register(stringChallenge, StringChart);
SELECTOR.register(documentChallenge, DocumentChart);
SELECTOR.register(arrayChallenge, ArrayChart);

export default SELECTOR;
