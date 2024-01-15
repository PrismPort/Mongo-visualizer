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

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [sidebarItemsVisibility, setSidebarItemsVisibility] = useState({});
  const [query, setQuery] = useState({});
  const [toggleStates, setToggleStates] = useState({});
  const [toggleDependencies, setToggleDependencies] = useState({});

  useEffect(() => {
    console.log("collection or DB changed", collection, database);

    setSelectedKeys([]), setSidebarItemsVisibility({});

    setQuery({}), setToggleStates({}), setToggleDependencies({});
  }, [collection, database]);

  useEffect(() => {
    if (initialKeysData) {
      console.log("initialData in GraphContext", initialKeysData);

      getDocumentsFromCollection(database, collection).then(
        async (documentsData) => {
          if (documentsData) {
            // console.log(
            //   "data arriving in GraphContext from getDocumentsFromCollection",
            //   documentsData
            // );
            setToggleStates(
              await calculateInitialToggleStates(
                initialKeysData,
                database,
                collection
              )
            );
            setToggleDependencies(documentsData);
          }
        }
      );
    }
  }, [initialKeysData]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await getDocumentsFromCollection(
    //     database,
    //     collection,
    //     query
    //   );
    //   console.log("data in FETCH GraphContext", data);
    //   if (data) {
    //     let updatedToggleStates = { ...toggleStates };
    //     let updatedChartsData = { ...chartsData };
    //     const isFirstFetch = !initialFetchState;
    //     if (isFirstFetch) {
    //       setInitialFetchState(data);
    //     }
    //     for (const key of selectedKeys) {
    //       const uniqueValuesResult = await getUniqueValuesForKey(
    //         database,
    //         collection,
    //         key.name,
    //         query
    //       );
    //       // Create a map from unique values for easy lookup
    //       const uniqueValueMap = new Map(
    //         uniqueValuesResult.map((uv) => [uv.value, uv])
    //       );
    //       // Merge uniqueValues with existing toggleStates
    //       updatedToggleStates[key.name] = updatedToggleStates[key.name].map(
    //         (toggle) => {
    //           if (uniqueValueMap.has(toggle.value)) {
    //             // Update existing toggle with new count and maintain its checked status
    //             return {
    //               ...toggle,
    //               occurance: uniqueValueMap.get(toggle.value).count,
    //               checked: toggle.checked,
    //             };
    //           } else {
    //             // Keep toggle but set occurrence to 0 and checked to false
    //             return {
    //               ...toggle,
    //               occurance: 0,
    //               checked: false,
    //             };
    //           }
    //         }
    //       );
    //       // Ensure all unique values are represented in the toggle states
    //       uniqueValuesResult.forEach((uniqueValue) => {
    //         if (
    //           !updatedToggleStates[key.name].some(
    //             (toggle) => toggle.value === uniqueValue.value
    //           )
    //         ) {
    //           updatedToggleStates[key.name].push({
    //             value: uniqueValue.value,
    //             type: uniqueValue.type,
    //             occurance: uniqueValue.count,
    //             checked: false,
    //           });
    //         }
    //       });
    //       // Update charts data
    //       updatedChartsData[key.name] = {
    //         labels: updatedToggleStates[key.name].map((toggle) => toggle.value),
    //         counts: updatedToggleStates[key.name].map(
    //           (toggle) => toggle.occurance
    //         ),
    //         type: uniqueValuesResult[0]?.type || "string",
    //       };
    //     }
    //     // Set the updated states
    //     setToggleStates(updatedToggleStates);
    //     setChartsData(updatedChartsData);
    //   }
    // if (shouldFetch) {
    //   fetchData().catch(console.error);
    //   setShouldFetch(false);
    // }
  }, [toggleStates, selectedKeys, collection]);

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
    // const newQuery = buildQuery(updatedSelectedItems, toggleStates);
    // setQuery(newQuery);
    //setShouldFetch(true);
  };

  const updateToggleState = (key, toggles) => {
    setToggleStates((prevStates) => {
      const newStates = { ...prevStates, [key]: toggles };

      // Calculate the occurrences of each dependent key across all toggles
      const occurrences = {};
      for (const toggle of toggles) {
        if (toggle.checked) {
          toggle.dependents.forEach((dependent) => {
            Object.keys(dependent).forEach((dependentKey) => {
              if (!occurrences[dependentKey]) {
                occurrences[dependentKey] = {};
              }
              if (!occurrences[dependentKey][dependent[dependentKey]]) {
                occurrences[dependentKey][dependent[dependentKey]] = 0;
              }
              occurrences[dependentKey][dependent[dependentKey]]++;
            });
          });
        }
      }

      // Update the checked and occurance properties of each toggle
      for (const toggle of toggles) {
        toggle.dependents.forEach((dependent) => {
          Object.keys(dependent).forEach((dependentKey) => {
            if (newStates[dependentKey]) {
              newStates[dependentKey] = newStates[dependentKey].map(
                (stateToggle) => ({
                  ...stateToggle,
                  checked:
                    stateToggle.value === dependent[dependentKey]
                      ? toggle.checked ||
                        (occurrences[dependentKey]
                          ? occurrences[dependentKey][dependent[dependentKey]] >
                            0
                          : false)
                      : stateToggle.checked,
                  occurance:
                    stateToggle.value === dependent[dependentKey]
                      ? (occurrences[dependentKey]
                          ? occurrences[dependentKey][dependent[dependentKey]]
                          : 0) || 0
                      : stateToggle.occurance,
                })
              );
            }
          });
        });
      }

      return newStates;
    });
  };

  const GraphContextValue = {
    initialKeysData,
    selectedKeys,
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
