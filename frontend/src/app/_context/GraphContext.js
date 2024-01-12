import React, { createContext, useContext, useState, useEffect } from "react";
import { buildQuery } from "../_utils/queryBuilder";
import { AppContext } from "./AppContext";
import { getDocumentsFromCollection } from "../_utils/getDocumentsFromCollection";
import { getUniqueValuesForKey } from "../_utils/getUniqueValuesForKey";
import { calculateInitialToggleStates } from "../_utils/calculateInitialToggleStates";

const GraphContext = createContext();

export const useGraphContext = () => useContext(GraphContext);

export const GraphProvider = ({ children }) => {
  const {
    data: initialKeysData,
    database,
    collection,
  } = useContext(AppContext);

  const [initialFetchState, setInitialFetchState] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [sidebarItemsVisibility, setSidebarItemsVisibility] = useState({});

  // const [chartsData, setChartsData] = useState({});
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
    if (initialKeysData) {
      //setToggleStates(calculateInitialToggleStates(initialData));

      console.log("initialData in GraphContext", initialKeysData);

      getDocumentsFromCollection(database, collection).then((documentsData) => {
        if (documentsData) {
          console.log(
            "data arriving in GraphContext from getDocumentsFromCollection",
            documentsData
          );
          setToggleStates(
            calculateInitialToggleStates(initialKeysData, database, collection)
          );
          setToggleDependencies(documentsData);
        }
      });
    }
  }, [initialKeysData]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocumentsFromCollection(
        database,
        collection,
        query
      );

      console.log("data in FETCH GraphContext", data);

      if (data) {
        let updatedToggleStates = { ...toggleStates };
        let updatedChartsData = { ...chartsData };
        const isFirstFetch = !initialFetchState;

        if (isFirstFetch) {
          setInitialFetchState(data);
        }

        for (const key of selectedKeys) {
          const uniqueValues = await getUniqueValuesForKey(
            database,
            collection,
            key.name,
            query
          );

          // Initialize countsMap
          let countsMap = uniqueValues.reduce((map, value) => {
            map[value.value] = 0;
            return map;
          }, {});

          console.log("countsMap", countsMap);

          // Update countsMap with actual counts
          data.forEach((doc) => {
            const value = doc[key.name];
            if (value !== undefined && countsMap.hasOwnProperty(value)) {
              countsMap[value]++;
            }
          });

          console.log("unique values in fetch after update", uniqueValues);

          // Update toggle states
          updatedToggleStates = updatedToggleStates[key.name].map((toggle) => {
            if (toggle.value in countsMap) {
              toggle.occurance = countsMap[toggle.value];
              toggle.checked = true;
            } else {
              toggle.occurance = 0;
              toggle.checked = false;
            }
          });

          // // Update charts data
          // updatedChartsData[key.name] = {
          //   labels: Object.keys(countsMap),
          //   counts: Object.values(countsMap),
          //   type: uniqueValues[0]?.type || "string", // Default type if not available
          // }
        }

        // Set the updated states
        setToggleStates(updatedToggleStates);
        // setChartsData(updatedChartsData);
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

      console.log("toggles in update toggle state", toggles);

      console.log("newStates", newStates);

      // Find toggles that were turned on
      const togglesTurnedOn = toggles.filter((toggle) => toggle.checked);

      console.log("togglesTurnedOn", togglesTurnedOn);

      if (togglesTurnedOn.length > 0) {
        // Iterate over the toggles that were turned on
        togglesTurnedOn.forEach((toggle) => {
          // Find all dependencies that match the toggled value
          const matchingDependencies = toggleDependencies.filter(
            (dependency) => dependency[key] === toggle.value
          );

          console.log("matchingDependencies", matchingDependencies);

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
    // chartsData,
    handleSelectkey,
    query,
    toggleStates,
    updateToggleState,
    toggleDependencies,
    sidebarItemsVisibility,
    setSidebarItemsVisibility,
  };

  console.log("GraphContextValue", GraphContextValue);

  return (
    <GraphContext.Provider value={GraphContextValue}>
      {children}
    </GraphContext.Provider>
  );
};

export default GraphProvider;
