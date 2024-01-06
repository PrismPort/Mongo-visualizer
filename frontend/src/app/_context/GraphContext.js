// GraphContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { buildQuery } from "../_utils/queryBuilder";
import { sendQuery } from "../_utils/sendQuery";
import { AppContext } from "./AppContext";

const GraphContext = createContext();

export const useGraphContext = () => useContext(GraphContext);

export const GraphProvider = ({ children }) => {
  const { database, collection } = useContext(AppContext);

  const [initialFetchState, setInitialFetchState] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [chartsData, setChartsData] = useState({});
  const [query, setQuery] = useState({});
  const [toggleStates, setToggleStates] = useState({});
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    // In GraphContext.js, within GraphProvider

    const fetchData = async () => {
      const data = await sendQuery(query, database, collection);
      if (data) {
        const isFirstFetch = !initialFetchState;
        if (isFirstFetch) {
          setInitialFetchState(data);
        }

        // Prepare to update toggle states for missing values
        let updatedToggleStates = { ...toggleStates };

        selectedKeys.forEach((key) => {
          const valuesArray = data.schema.find(
            (schemaItem) => schemaItem.name === key.name
          )?.types[0]?.values;

          let initialCountsMap = {};
          if (!isFirstFetch) {
            // Initialize initialCountsMap with all counts set to 0
            const initialValues =
              initialFetchState.schema.find(
                (schemaItem) => schemaItem.name === key.name
              )?.types[0]?.values || [];
            initialValues.forEach((value) => {
              initialCountsMap[value] = 0;
            });

            // Identify missing values
            const missingValues = initialValues.filter(
              (initialValue) => !valuesArray.includes(initialValue)
            );

            // Update toggle states for missing values
            if (missingValues.length > 0 && updatedToggleStates[key.name]) {
              updatedToggleStates[key.name] = updatedToggleStates[key.name].map(
                (toggle) => {
                  if (missingValues.includes(toggle.value)) {
                    return { ...toggle, occurance: 0, checked: false };
                  }
                  return toggle;
                }
              );
            }
          }

          // Prepare counts map
          const countsMap = valuesArray
            ? valuesArray.reduce((acc, value) => {
                acc[value] = (acc[value] || 0) + 1;
                return acc;
              }, initialCountsMap)
            : initialCountsMap;

          // Update chart data
          setChartsData((prevData) => ({
            ...prevData,
            [key.name]: {
              labels: Object.keys(countsMap),
              counts: Object.values(countsMap),
            },
          }));
        });

        // Apply updated toggle states
        setToggleStates(updatedToggleStates);
      }
    };

    if (shouldFetch) {
      fetchData();
      setShouldFetch(false); // Reset the flag after fetching
    }
  }, [selectedKeys, toggleStates, database, collection]);

  const handleSelectkey = async (key) => {
    const isKeySelected = selectedKeys.some(
      (selected) => selected.name === key.name
    );
    let updatedSelectedItems;

    if (isKeySelected) {
      updatedSelectedItems = selectedKeys.filter(
        (selected) => selected.name !== key.name
      );
    } else {
      updatedSelectedItems = [...selectedKeys, key];
    }

    setSelectedKeys(updatedSelectedItems);

    const newQuery = buildQuery(updatedSelectedItems, toggleStates);
    setQuery(newQuery);

    setShouldFetch(true); // Set the flag to fetch data
  };

  const updateToggleState = (key, toggles) => {
    setToggleStates((prevStates) => ({ ...prevStates, [key]: toggles }));

    // Use the new toggles directly to build the query
    const newQuery = buildQuery(selectedKeys, {
      ...toggleStates,
      [key]: toggles,
    });
    setQuery(newQuery);
    setShouldFetch(true); // Set the flag to fetch data
  };

  const GraphContextValue = {
    selectedKeys,
    chartsData,
    handleSelectkey,
    query,
    toggleStates,
    updateToggleState,
  };

  console.log("GraphContextValue", GraphContextValue);

  return (
    <GraphContext.Provider value={GraphContextValue}>
      {children}
    </GraphContext.Provider>
  );
};
