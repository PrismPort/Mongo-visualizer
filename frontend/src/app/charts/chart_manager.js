class Updater {
  constructor() {
    this.chart_mangager = new ChartManager();
    this.mongo_query = new MongoQuery();
    this.data_fetcher = new DataFetcher();
  }
  update() {

  }
}

class DataFetcher {
  constructor() {

  }
  fetch() {

  }
}
class ChartManager {
  constuctor() {
    this.charts = new Array();
  }
  registerChart(chart) {

  }
  requireUpdate() {
  }
}
class MongoQuery {
  constructor() {
    this.mongo_query = {};
  }
  remove(query) {

  }
  add(query) {

  }
}
class Chart {
  constuctor(chartjs_chart) {
    this.visual_representation = chartjs_chart;
  }
  render() {
    console.log(this.visual_representation);
  }
}

function getListOfCharts(data) {
  for (const thing of data) {
    console.log('name:', thing.name);
    console.log('type:', thing.type);

    if (thing.type === 'Document') {
      for (const field of thing['types'][0]['fields']) {
        getListOfCharts([field]);
      }
    } else {
      display(thing);
    }
    console.log();
  }
}

function display(something) {
  console.log(
    something['types'][0]['values']
    || something['types'][0]['types'][0]['values']
  );
}