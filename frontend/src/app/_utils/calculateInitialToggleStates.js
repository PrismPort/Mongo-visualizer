import { getUniqueValuesForKey } from "./getUniqueValuesForKey";
import { getDocumentsFromCollection } from "./getDocumentsFromCollection";

export async function calculateInitialToggleStates(
  initialKeysData,
  database,
  collection
) {
  const newToggleStates = {};

  const documentsData = await getDocumentsFromCollection(database, collection);

  for (const key of initialKeysData) {
    newToggleStates[key.name] = [];
    const uniqueValues = await getUniqueValuesForKey(
      database,
      collection,
      key.name
    );
    for (const value of uniqueValues) {
      const dependents = documentsData
        .filter((document) => document[key.name] === value.value)
        .map((document) => document._id);
      newToggleStates[key.name].push({
        value: value.value,
        type: key.type,
        occurance: value.count,
        checked: true,
        dependents: dependents,
      });
    }
  }

  console.log("new toggle states", newToggleStates);

  return newToggleStates;
}
