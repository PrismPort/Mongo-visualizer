import React from "react";
import { useGraphContext } from "../../_context/GraphContext.js";
import MyBooleanChart from "./MyBooleanChart.jsx";

const GraphComponent = () => {
  const { selectedItems, chartsData } = useGraphContext();

  if (selectedItems.length === 0) {
    return <div>Select items to view their graphs</div>;
  }

  return (
    <div>
      {selectedItems.map((item) => {
        const chartData = chartsData[item.name];
        if (chartData) {
          // Ensure the data format is suitable for MyBooleanChart
          return (
            <div key={item.name}>
              <MyBooleanChart
                title={item.name}
                dataValues={chartData.counts}
                labels={chartData.labels}
              />
            </div>
          );
        }
        return null; // If no chartData is found for the item
      })}
    </div>
  );
};

export default GraphComponent;
