// GraphContext.js
import React, { createContext, useContext, useState } from "react";

const GraphContext = createContext();

export const useGraphContext = () => useContext(GraphContext);

export const GraphProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [chartsData, setChartsData] = useState({});
  const [query, setQuery] = useState([]);

  const queryBuilder = (selectedItems) => {
    selectedItems.forEach((item) => {
      console.log(item.name);
    });
  };

  const handleSelectItem = async (databaseName, collectionName, item) => {
    const updatedSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((selected) => selected !== item)
      : [...selectedItems, item];

    setSelectedItems(updatedSelectedItems);

    // Fetch data for the new item
    try {
      const response = await fetch(
        `http://localhost:4000/query/${databaseName}/${collectionName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: null,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("response data", data);

      // console.log(
      //   data.schema.filter((i) => item.name === i.name)[0].types[0].values
      // );

      // setChartsData({
      //   ...chartsData,
      //   [item.name]: {
      //     labels: data.map((d) => d._id),
      //     counts: data.map((d) => d.count),
      //   },
      // });
    } catch (error) {
      console.error("Failed to fetch unique values:", error);
    }
  };

  console.dir(selectedItems);

  queryBuilder(selectedItems);

  console.log("query", query);

  // https://github.com/PrismPort/Visual-MongoInterface/blob/mongodb-schema-experiments/frontend/src/components/MongoREST.tsx
  // ab line 242

  /*
  const addToQuery = (key) => {


        const newQuery = { [key]: { $exists: true } };
        
        setQueries((prevQueries) => {
            let updatedQueries;
            const existingQueryIndex = prevQueries.findIndex(query => JSON.stringify(query) === JSON.stringify(newQuery));

            if (existingQueryIndex !== -1) {
                // Query exists, remove it
                updatedQueries = [...prevQueries];
                updatedQueries.splice(existingQueryIndex, 1);
            } else {
                // Query doesn't exist, add it
                updatedQueries = [...prevQueries, newQuery];
            }

            // Send the updated query
            if (updatedQueries.length > 1) {
                sendQuery({ $and: updatedQueries }, database, collection);
                setQueriesCopy({ $and: updatedQueries }); // deep copy for printing
            } else if (updatedQueries.length === 1) { // only one query, no need for an $and
                sendQuery(updatedQueries[0], database, collection);
                setQueriesCopy(updatedQueries[0]); // deep copy for printing
            } else {
                // Handle case when there are no queries
                sendQuery({}, database, collection);
            }

            return updatedQueries;
        });
    };

  */

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
