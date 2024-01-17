export const buildQuery = (selectedKeys, toggleStates) => {
  let queryParts = [];

  console.log("selectedKeys in buildQuery", selectedKeys);
  console.log("toggleStates in buildQuery", toggleStates);

  // Handle toggle states
  selectedKeys.forEach((key) => {
    let toggles = toggleStates[key.name];
    console.log("toggles for", key, "in Query Builder: ", toggles);
    if (toggles && toggles.length > 0) {
      let selectedValues = toggles
        .filter((toggle) => toggle.checked)
        .map((toggle) => {
          if (toggle.type === "Number") {
            toggle.value = parseInt(toggle.value);
          } else if (toggle.type === "Date") {
            toggle.value = new Date(toggle.value);
          } else if (toggle.type === "Boolean") {
            toggle.value = toggle.value === "true";
          } else if (toggle.type === "String") {
            toggle.value = toggle.value.toString();
          }
          return toggle.value;
        });

      if (selectedValues.length > 0) {
        // If there are selected values, use $in to filter for these values
        queryParts.push({ [key.name]: { $in: selectedValues } });
      } else {
        // If no values are selected (all are deselected), use $nin to exclude all values
        let allValues = toggles.map((toggle) => toggle.value);
        queryParts.push({ [key.name]: { $nin: allValues } });
      }
    } else {
      // If the key has not been interacted with yet, we don't filter by this key
      // Alternatively, you can decide to include all values by default
      // queryParts.push({ [key.name]: { $exists: true } });
    }
  });

  console.log("query parts after constuction", queryParts);

  // Combine the parts with $and if there are multiple parts
  return queryParts.length > 1 ? { $and: queryParts } : queryParts[0];
};
