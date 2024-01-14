import React from "react";
import { useGraphContext } from "../../_context/GraphContext.js";
import MyBooleanChart from "./MyBooleanChart.jsx";
import StringList from "./StringList.jsx";
import RangeBarChart from "./RangeBarChart.jsx";

const GraphComponent = () => {
  const { selectedKeys, toggleStates } = useGraphContext();

  if (selectedKeys.length === 0) {
    return <div>Select items to view their graphs</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4  overflow-y-auto">
      {selectedKeys.map((item) => {
        const chartData = toggleStates[item.name];

        if (chartData) {
          let chartComponent = null;

          if (chartData.length <= 6 && chartData[0].type !== "Number") {
            chartComponent = (
              <MyBooleanChart
                title={item.name}
                dataValues={chartData.map((item) => item.occurance)}
                labels={chartData.map((item) => item.value)}
              />
            );
          } else if (chartData[0].type === "Number") {
            chartComponent = (
              <RangeBarChart
                keyName={item.name}
                labels={chartData.map((item) => item.value)}
                dataValues={chartData.map((item) => item.occurance)}
              />
            );
          } else if (chartData.length > 6) {
            chartComponent = (
              <StringList
                keyName={item.name}
                labels={chartData.map((item) => item.value)}
                counts={chartData.map((item) => item.occurance)}
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
