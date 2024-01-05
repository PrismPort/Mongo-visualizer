// GraphContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { buildQuery } from "../_utils/queryBuilder";
import { sendQuery } from "../_utils/sendQuery";
import { AppContext } from "./AppContext";

const GraphContext = createContext();

export const useGraphContext = () => useContext(GraphContext);

export const GraphProvider = ({ children }) => {
  const { database, collection } = useContext(AppContext);

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [chartsData, setChartsData] = useState({});
  const [selectedItemsQuery, setSelectedItemsQuery] = useState([]);
  const [query, setQuery] = useState({});
  const [toggleStates, setToggleStates] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await sendQuery(query, database, collection);
      if (data) {
        selectedKeys.forEach((key) => {
          const valuesArray = data.schema.find(
            (schemaItem) => schemaItem.name === key.name
          )?.types[0]?.values;
          if (valuesArray) {
            const countsMap = valuesArray.reduce((acc, value) => {
              acc[value] = (acc[value] || 0) + 1;
              return acc;
            }, {});
            setChartsData((prevData) => ({
              ...prevData,
              [key.name]: {
                labels: Object.keys(countsMap),
                counts: Object.values(countsMap),
              },
            }));
          }
        });
      }
    };

    if (selectedKeys.length > 0 || Object.keys(toggleStates).length > 0) {
      fetchData();
    }
  }, [selectedKeys, toggleStates]);

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
  };

  const updateToggleState = (key, toggles) => {
    setToggleStates((prevStates) => ({ ...prevStates, [key]: toggles }));

    // Use the new toggles directly to build the query
    const newQuery = buildQuery(selectedKeys, {
      ...toggleStates,
      [key]: toggles,
    });
    setQuery(newQuery);
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
