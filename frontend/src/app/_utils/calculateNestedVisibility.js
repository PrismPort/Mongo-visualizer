export const calculateNestedVisibility = (
  fieldKey,
  keyVisibilities,
  database,
  collection,
  keyPath = []
) => {
  let currentVisibility = keyVisibilities[database]?.[collection];
  let path = [...keyPath, fieldKey];

  for (const key of path) {
    if (currentVisibility === false) {
      return false;
    } else if (currentVisibility === true) {
      return true;
    } else if (typeof currentVisibility === "object") {
      currentVisibility = currentVisibility[key];
      if (currentVisibility === undefined) {
        return false; // Return true if the path does not explicitly exist
      }
    }
  }

  // Return the final visibility value
  return currentVisibility !== false;
};
