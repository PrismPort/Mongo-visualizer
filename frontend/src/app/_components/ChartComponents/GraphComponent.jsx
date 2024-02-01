import React from "react";
import { useGraphContext } from "../../_context/GraphContext.js";
import MyBooleanChart from "./MyBooleanChart.jsx";
import StringList from "./StringList.jsx";
import RangeBarChart from "./RangeBarChart.jsx";

const GraphComponent = () => {
  const { selectedKeys, chartsData } = useGraphContext();

  if (selectedKeys.length === 0) {
    return <div>Select items to view their graphs</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 h-full overflow-y-scroll">
      {selectedKeys.map((item) => {
        const chartData = chartsData[item.name];

        if (chartData) {
          let chartComponent = null;

          if (chartData.counts.length <= 6 && chartData.type !== "Number") {
            chartComponent = (
              <MyBooleanChart
                title={item.name}
                dataValues={chartData.counts}
                labels={chartData.labels}
              />
            );
          } else if (chartData.type === "Number") {
            chartComponent = (
              <RangeBarChart
                title={item.name}
                labels={chartData.labels}
                dataValues={chartData.counts}
              />
            );
          } else if (chartData.counts.length > 6) {
            chartComponent = (
              <StringList
                keyName={item.name}
                labels={chartData.labels}
                counts={chartData.counts}
              />
            );
          }

          if (chartComponent) {
            return (
              <div key={item.name} className="p-4">
                {chartComponent}
              </div>
            );
          }
        }
        return null; // If no chartData is found for the item
      })}
    </div>
  );
};

export default GraphComponent;
