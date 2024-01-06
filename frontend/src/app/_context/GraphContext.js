import React, { createContext, useContext, useState, useEffect } from "react";
import { buildQuery } from "../_utils/queryBuilder";
import { sendQuery } from "../_utils/sendQuery";
import { AppContext } from "./AppContext";

const GraphContext = createContext();

export const useGraphContext = () => useContext(GraphContext);

export const GraphProvider = ({ children }) => {
  const { data: initialData, database, collection } = useContext(AppContext);

  const [initialFetchState, setInitialFetchState] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [chartsData, setChartsData] = useState({});
  const [query, setQuery] = useState({});
  const [toggleStates, setToggleStates] = useState({});
  const [shouldFetch, setShouldFetch] = useState(false);
  const [toggleUpdateFromContext, setToggleUpdateFromContext] = useState(false);

  useEffect(() => {
    if (initialData) {
      const newToggleStates = {};

      initialData.forEach((field) => {
        const fieldName = field.name;
        const fieldValues = field.types[0]?.values || [];

        const occurrences = fieldValues.reduce((acc, value) => {
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        }, {});

        newToggleStates[fieldName] = Object.keys(occurrences).map((value) => ({
          value: value,
          occurance: occurrences[value],
          checked: true,
        }));
      });

      setToggleStates(newToggleStates);
    }
  }, [initialData]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await sendQuery(query, database, collection);
      if (data) {
        let updatedToggleStates = { ...toggleStates };
        const isFirstFetch = !initialFetchState;

        if (isFirstFetch) {
          setInitialFetchState(data);
        }

        selectedKeys.forEach((key) => {
          const schemaItem = data.schema.find((item) => item.name === key.name);
          const valuesArray = schemaItem?.types?.[0]?.values || [];

          let initialCountsMap = {};

          if (!isFirstFetch) {
            // Initialize initialCountsMap with all counts set to 0
            const initialSchemaItem = initialFetchState.schema.find(
              (item) => item.name === key.name
            );
            const initialValues = initialSchemaItem?.types?.[0]?.values || [];

            initialValues.forEach((value) => {
              initialCountsMap[value] = 0;
            });

            const missingValues = initialValues.filter(
              (initialValue) => !valuesArray.includes(initialValue)
            );

            // Update toggle states for missing values
            if (updatedToggleStates[key.name]) {
              updatedToggleStates[key.name] = updatedToggleStates[key.name].map(
                (toggle) => {
                  return {
                    ...toggle,
                    occurance: valuesArray.includes(toggle.value)
                      ? (initialCountsMap[toggle.value] || 0) + 1
                      : 0,
                    checked: valuesArray.includes(toggle.value)
                      ? toggle.checked
                      : false,
                  };
                }
              );
            }
          }

          const countsMap = valuesArray.reduce((acc, value) => {
            acc[value] = (acc[value] || 0) + 1;
            return acc;
          }, initialCountsMap);

          setChartsData((prevData) => ({
            ...prevData,
            [key.name]: {
              labels: Object.keys(countsMap),
              counts: Object.values(countsMap),
            },
          }));
        });

        setToggleStates(updatedToggleStates);
      }
    };

    if (shouldFetch) {
      fetchData().catch(console.error);
      setShouldFetch(false);
    }
  }, [selectedKeys, toggleStates, database, collection]);

  const handleSelectkey = (key) => {
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
    setShouldFetch(true);
  };

  const updateToggleState = (key, toggles) => {
    setToggleStates((prevStates) => {
      const newStates = { ...prevStates, [key]: toggles };

      // Check if any value is reselected or deselected
      const isChanged = toggles.some(
        (toggle) =>
          prevStates[key] &&
          prevStates[key].find(
            (prevToggle) =>
              prevToggle.value === toggle.value &&
              prevToggle.checked !== toggle.checked
          )
      );

      if (isChanged) {
        const newQuery = buildQuery(selectedKeys, newStates);
        setQuery(newQuery);
        setShouldFetch(true);
      }

      return newStates;
    });
  };

  const GraphContextValue = {
    initialFetchState,
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

export default GraphProvider;
