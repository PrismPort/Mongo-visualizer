// GraphContext.js
import React, { createContext, use, useContext, useState } from "react";

const GraphContext = createContext();

export const useGraphContext = () => useContext(GraphContext);

export const GraphProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [chartsData, setChartsData] = useState({});
  const [query, setQuery] = useState([]);

  const handleSelectItem = async (databaseName, collectionName, item) => {
    // Determine if the item is currently selected
    const isItemSelected = selectedItems.some(
      (selected) => selected.name === item.name
    );

    let updatedSelectedItems, updatedQuery;

    if (isItemSelected) {
      // Deselect the item
      updatedSelectedItems = selectedItems.filter(
        (selected) => selected.name !== item.name
      );
      updatedQuery = query.filter((q) => !q.hasOwnProperty(item.name));
    } else {
      // Select the item
      updatedSelectedItems = [...selectedItems, item];
      updatedQuery = [...query, { [item.name]: { $exists: true } }];
    }

    setSelectedItems(updatedSelectedItems);
    setQuery(updatedQuery);

    // Fetch data for the new item
    try {
      const response = await fetch(
        `http://localhost:4000/query/${databaseName}/${collectionName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ $and: updatedQuery }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("response data", data);

      console.log(
        data.schema.filter((i) => item.name === i.name)[0].types[0].values
      );
      // Extract the values array for the specific item
      const valuesArray = data.schema.filter((i) => i.name === item.name)[0]
        .types[0].values;

      // Count occurrences of each value
      const countsMap = valuesArray.reduce((acc, value) => {
        acc[value] = acc[value] ? acc[value] + 1 : 1;
        return acc;
      }, {});

      // Convert countsMap to labels and counts arrays
      const labels = Object.keys(countsMap);
      const counts = Object.values(countsMap);

      setChartsData({
        ...chartsData,
        [item.name]: { labels, counts },
      });
    } catch (error) {
      console.error("Failed to fetch unique values:", error);
    }
  };

  console.dir(selectedItems);

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
    query,
  };

  console.log("GraphContextValue", GraphContextValue);

  return (
    <GraphContext.Provider value={GraphContextValue}>
      {children}
    </GraphContext.Provider>
  );
};
