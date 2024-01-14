import { ChartHeading } from "./util/chart_heading";
import { ChartLandscapeDiv, ChartPortraitDiv } from "./util/chart_divs";
import SELECTOR from "../chart_selector";


function subsetFields(subset) {
  return subset.types[0].fields;
}
function subsetName(subset) {
  return subset.name;
}

function subsetIsArray(subset) {
  return subset.type instanceof Array;
}
function subsetArrayIncludesType(subset, type_) {
  return subset.type.includes(type_);
}

function subsetIsType(subset, type_) {
  return subset.type === type_;
}
class DocumentChart {
  constructor(subset) {
    this.subset = subset;
  }
  getComponent() {
    const children = [];
    const name = subsetName(this.subset);
    subsetFields(this.subset).forEach((document, index) => {
      // chart.setComponentKey(`chart-${index}`)
      const Chart = SELECTOR.getChartFor(document).getComponent();
      children.push(Chart);
    });
    return (
      <ChartLandscapeDiv>
        <ChartHeading inner_text={name} />
        {children}
      </ChartLandscapeDiv>
    )
  }
}

function documentChallenge(subset) {
  if (subsetIsArray(subset)
    && subsetArrayIncludesType(subset, 'Document')) {
    return true;
  } else if (subsetIsType(subset, 'Document')) {
    return true;
  } else {
    return false;
  }
}

export { documentChallenge, DocumentChart };
