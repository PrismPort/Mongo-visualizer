import React from "react";
import { useGraphContext } from "../../_context/GraphContext.js";
import MyBooleanChart from "./MyBooleanChart.jsx";
import StringList from "./StringList.jsx";

const sampleData = [
  { value: "Jason", occurance: 8 },
  { value: "Cindy", occurance: 4 },
  { value: "Richard", occurance: 6 },
  { value: "Nicole", occurance: 4 },
  { value: "Alexandra", occurance: 3 },
  { value: "Michael", occurance: 7 },
  { value: "David", occurance: 3 },
  { value: "Russell", occurance: 3 },
  { value: "Cindy", occurance: 8 },
  { value: "John", occurance: 7 },
];

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
          if (chartData.counts.length <= 6) {
            return (
              <div key={item.name}>
                <MyBooleanChart
                  title={item.name}
                  dataValues={chartData.counts}
                  labels={chartData.labels}
                />
              </div>
            );
          } else if (chartData.counts.length > 6) {
            return (
              <div key={item.name}>
                <StringList keyName={item.name} data={sampleData} />
              </div>
            );
          } else {
            return null; // If no chartData is found for the item
          }
        }
      })}
    </div>
  );
};

export default GraphComponent;
