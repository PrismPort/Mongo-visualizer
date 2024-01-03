// GraphContext.js
import React, { createContext, useContext, useState } from "react";

const GraphContext = createContext();

export const useGraphContext = () => useContext(GraphContext);

export const GraphProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [chartsData, setChartsData] = useState({});

  const handleSelectItem = async (databaseName, collectionName, item) => {
    const updatedSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((selected) => selected !== item)
      : [...selectedItems, item];
    console.log(item.name);

    setSelectedItems(updatedSelectedItems);

    if (!selectedItems.includes(item)) {
      // Fetch data for the new item
      try {
        const response = await fetch(
          `http://localhost:4000/uniquevalues/${databaseName}/${collectionName}/${item.name}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setChartsData({
          ...chartsData,
          [item.name]: {
            labels: data.map((d) => d._id),
            counts: data.map((d) => d.count),
          },
        });
      } catch (error) {
        console.error("Failed to fetch unique values:", error);
      }
    } else {
      // Remove the chart data for the unselected item
      const updatedChartsData = { ...chartsData };
      delete updatedChartsData[item.name];
      setChartsData(updatedChartsData);
    }
  };

  const GraphContextValue = {
    selectedItems,
    chartsData,
    handleSelectItem,
  };

  console.log("GraphContextValue", GraphContextValue);

  return (
    <GraphContext.Provider value={GraphContextValue}>
      {children}
    </GraphContext.Provider>
  );
};
