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
        {data ? () => (data || [])().map((line, index) => (
          <SelectedChart key={`selected-chart-${index}`} line={line} />
        )) : <NoData />}
      </>
    )
  } catch (error) {
    console.error(error)
  }
}
function SelectedChart({ line }) {
  const properties = Array.from(Object.entries(line));
  const Chart = SELECTOR.getChartFor(line);
  return <>
    {Chart.getComponent()}
  </>
}