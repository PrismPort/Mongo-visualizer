import { useContext } from 'react';
import SELECTOR from './../../charts/chart_selector';
function NoData() {
  return (<>No data</>);
}

import { AppContext } from "../../_context/AppContext";

export default function Charts() {
  const { data } = useContext(AppContext);
  if (data === undefined) {
    return <NoData />
  }
  try {
    return (
      <>
        {() => (data || [])().map(
          (line, index) => (
            <ElectedChart key={`selected-chart-${index}`} line={line} />
          )
        )}
      </>
    )
  } catch (error) {
    console.error(error)
  }
}
function ElectedChart(line) {
  const cha = SELECTOR.getChartFor(line);
  const Chart = cha.getComponent();
  console.log("KJDSKFDHS")
  return Chart;

}