// Define a function to calculate the initial toggle states
import { getUniqueValuesForKey } from "./getUniqueValuesForKey";

export function calculateInitialToggleStates(
  initialKeysData,
  database,
  collection
) {
  const newToggleStates = {};

  initialKeysData.forEach((key) => {
    newToggleStates[key.name] = [];
    getUniqueValuesForKey(database, collection, key.name).then(
      (uniqueValues) => {
        uniqueValues.forEach((value) => {
          newToggleStates[key.name].push({
            value: value.value,
            type: key.type,
            occurance: value.count,
            checked: true,
          });
        });
      }
    );
  });

  console.log("new toggle states", newToggleStates);

  return newToggleStates;
}
