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
  function GetSingleChart({ key, values }) {
    const Chart = SELECTOR.getChartFor(values);
    return <Chart data={values} />

  }
  function SelectedCharts({ line }) {
    const properties = Array.from(Object.entries(line));
    const Chart = SELECTOR.getChartFor(line);
    return <Chart specific_data={line} path={line['name']}/>
  }
  return (
    <>
      <p>`charts ${data.length}`</p>
      <div>
        {data ? (data.map((line, index) =>
          <SelectedCharts key={index} line={line} />
        )) : <NoData />}
      </div>
    </>
  )
}