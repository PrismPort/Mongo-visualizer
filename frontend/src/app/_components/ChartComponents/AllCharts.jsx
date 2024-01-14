import { useContext } from 'react';
import SELECTOR from '../../charts/chart_selector';
import { AppContext } from '../../_context/AppContext';
import { Subset } from './../../charts/components/subset'
export function AllCharts() {
  const { data } = useContext(AppContext);
  const components = [];
  data?.forEach((document, index) => {
    const subset = new Subset(document);
    const chart = SELECTOR.getChartFor(subset);
    const Component = chart.getComponent();
    components.push(Component);
  });
  // TODO: set keys of components
  return (
    <>
      {components}
    </>
  );
}