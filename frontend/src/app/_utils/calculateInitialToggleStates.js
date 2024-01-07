// Define a function to calculate the initial toggle states
export function calculateInitialToggleStates(initialData) {
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

  return newToggleStates;
}
