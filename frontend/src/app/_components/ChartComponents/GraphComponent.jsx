import React from "react";
import { useGraphContext } from "../../_context/GraphContext.js";
import MyBooleanChart from "./MyBooleanChart.jsx";
import StringList from "./StringList.jsx";

// const sampleData = [
//   { value: "Jason", occurance: 8 },
//   { value: "Cindy", occurance: 4 },
//   { value: "Richard", occurance: 6 },
//   { value: "Nicole", occurance: 4 },
//   { value: "Alexandra", occurance: 3 },
//   { value: "Michael", occurance: 7 },
//   { value: "David", occurance: 3 },
//   { value: "Russell", occurance: 3 },
//   { value: "Cindy", occurance: 8 },
//   { value: "John", occurance: 7 },
// ];

const GraphComponent = () => {
  const { selectedKeys, chartsData } = useGraphContext();

  if (selectedKeys.length === 0) {
    return <div>Select items to view their graphs</div>;
  }

  return (
    <div>
      {selectedKeys.map((item) => {
        const chartData = chartsData[item.name];

        // console.log("This is the chart data in the graph component", chartData);

        // console.log("chartData", chartData);

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
                <StringList
                  keyName={item.name}
                  labels={chartData.labels}
                  counts={chartData.counts}
                />
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
