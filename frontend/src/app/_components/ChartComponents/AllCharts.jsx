import { useContext } from 'react';

import { AppContext } from '../../_context/AppContext';
import SELECTOR from '../../charts/chart_selector';

export function AllCharts() {
  const { data } = useContext(AppContext);
  const components = [];
  data?.forEach((document, index) => {
    const chart = SELECTOR.getChartFor(document);
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