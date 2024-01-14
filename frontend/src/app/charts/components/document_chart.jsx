import { ChartHeading } from "./util/chart_heading";
import { Subset } from './subset'
import { ChartLandscapeDiv } from "./util/chart_divs";
import SELECTOR from "../chart_selector";

class DocumentChart {
  constructor(subset) {
    this.subset = subset;
  }
  getComponent() {
    const children = [];
    const fields = Subset.getFields(this.subset);
    fields.forEach((document, index) => {
      // chart.setComponentKey(`chart-${index}`)
      const Chart = SELECTOR.getChartFor(document).getComponent();
      children.push(Chart);
    });
    return (
      <ChartLandscapeDiv>
        <ChartHeading inner_text={Subset.getName(this.subset)} />
        {children}
      </ChartLandscapeDiv>
    )
  }
}

function documentChallenge(subset) {
  return (Subset.typeIncludes(subset, 'Document')
    || Subset.typeIs(subset, 'Document'))
}

export { documentChallenge, DocumentChart };
