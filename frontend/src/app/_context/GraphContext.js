import React, { createContext, useContext, useState, useEffect } from "react";
import { buildQuery } from "../_utils/queryBuilder";
import { sendQuery } from "../_utils/sendQuery";
import { AppContext } from "./AppContext";

import { getDocumentsFromCollection } from "../_utils/getDocumentsFromCollection";
import { getUniqueValuesForKey } from "../_utils/getUniqueValuesForKey";

import { getDocumentCountForKey } from "../_utils/getDocumentCountForKey";
import { calculateInitialToggleStates } from "../_utils/calculateInitialToggleStates";

const GraphContext = createContext();

export const useGraphContext = () => useContext(GraphContext);

export const GraphProvider = ({ children }) => {
  const { data: initialData, database, collection } = useContext(AppContext);

  const [initialFetchState, setInitialFetchState] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [sidebarItemsVisibility, setSidebarItemsVisibility] = useState({});

  const [chartsData, setChartsData] = useState({});
  const [query, setQuery] = useState({});
  const [toggleStates, setToggleStates] = useState({});
  const [shouldFetch, setShouldFetch] = useState(false);
  const [toggleDependencies, setToggleDependencies] = useState({});

  useEffect(() => {
    console.log("collection or DB changed", collection, database);

    setSelectedKeys([]), setSidebarItemsVisibility({});
    setChartsData({}),
      setQuery({}),
      setToggleStates({}),
      setShouldFetch(false),
      setToggleDependencies({});
  }, [collection, database]);

  useEffect(() => {
    if (initialData) {
      setToggleStates(calculateInitialToggleStates(initialData));

      console.log("initialData in GraphContext", initialData);

      getDocumentsFromCollection(database, collection, 1000).then((data) => {
        if (data) {
          console.log(
            "data arriving in GraphContext from getDocumentsFromCollection",
            data
          );
          setToggleDependencies(data);
        }
      });
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
          console.log(
            `documents count`,
            getDocumentCountForKey(database, collection, key.name)
          );

          console.log(
            `unique values`,
            getUniqueValuesForKey(database, collection, key.name)
          );

          if (key.type.includes("Array")) {
            console.log(
              "Here i am",
              data.schema.find((item) => item.name === key.name)
            );
            const schemaItem = data.schema.find(
              (item) => item.name === key.name
            ).types[0].types[0];

            console.log("schemaItem nested", schemaItem);
          }

          const schemaItem = data.schema.find((item) => item.name === key.name);
          const valuesArray = schemaItem?.types?.[0]?.values || [];

          const type = schemaItem?.types?.[0]?.bsonType || "string";
          // Initialize countsMap with all possible values for the key, with counts set to 0
          let countsMap = {};
          toggleStates[key.name]
            ? toggleStates[key.name].forEach((toggle) => {
                countsMap[toggle.value] = 0;
              })
            : null;

          // Update countsMap with actual counts
          valuesArray.forEach((value) => {
            countsMap[value] = (countsMap[value] || 0) + 1;
          });

          // Update toggle states for missing values
          if (!isFirstFetch && updatedToggleStates[key.name]) {
            updatedToggleStates[key.name] = updatedToggleStates[key.name].map(
              (toggle) => {
                return {
                  ...toggle,
                  type: type,
                  occurance: countsMap[toggle.value] || 0,
                  checked: !!countsMap[toggle.value],
                };
              }
            );
          }

          setChartsData((prevData) => ({
            ...prevData,
            [key.name]: {
              labels: Object.keys(countsMap),
              counts: Object.values(countsMap),
              type: type,
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

      // Find toggles that were turned on
      const togglesTurnedOn = toggles.filter((toggle) => toggle.checked);

      if (togglesTurnedOn.length > 0) {
        // Iterate over the toggles that were turned on
        togglesTurnedOn.forEach((toggle) => {
          // Find all dependencies that match the toggled value
          const matchingDependencies = toggleDependencies.filter(
            (dependency) => dependency[key] === toggle.value
          );

          // Update all fields in matching dependencies
          matchingDependencies.forEach((dependency) => {
            Object.keys(dependency).forEach((depKey) => {
              // If the dependency key is a selected key and different from the toggled key, update its state
              if (
                depKey !== key &&
                selectedKeys.find((selected) => selected.name === depKey)
              ) {
                newStates[depKey] = newStates[depKey].map((stateToggle) => ({
                  ...stateToggle,
                  // Set checked to true if the value matches
                  checked:
                    stateToggle.value === dependency[depKey] ||
                    stateToggle.checked,
                }));
              }
            });
          });
        });
      }

      const newQuery = buildQuery(selectedKeys, newStates);
      setQuery(newQuery);
      return newStates;
    });

    setShouldFetch(true);
  };

  const GraphContextValue = {
    initialFetchState,
    selectedKeys,
    chartsData,
    handleSelectkey,
    query,
    toggleStates,
    updateToggleState,
    toggleDependencies,
    sidebarItemsVisibility,
    setSidebarItemsVisibility,
  };

  //console.log("GraphContextValue", GraphContextValue);

  return (
    <GraphContext.Provider value={GraphContextValue}>
      {children}
    </GraphContext.Provider>
  );
};

export default GraphProvider;
