// queryBuilder.js

export const buildQuery = (selectedKeys, toggleStates) => {
  let queryParts = [];

  // Handle selected keys
  selectedKeys.forEach((key) => {
    queryParts.push({ [key.name]: { $exists: true } });
  });

  // Handle toggle states
  for (const key in toggleStates) {
    let toggles = toggleStates[key];
    let selectedValues = toggles
      .filter((toggle) => toggle.checked)
      .map((toggle) => toggle.value);

    if (selectedValues.length > 0) {
      queryParts.push({ [key]: { $in: selectedValues } });
    }
  }

  return queryParts.length > 1 ? { $and: queryParts } : queryParts[0];
};
