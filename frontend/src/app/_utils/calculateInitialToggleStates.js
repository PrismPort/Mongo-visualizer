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
      type: field.types[0]?.bsonType || "string",
      occurance: occurrences[value],
      checked: true,
    }));
  });

  console.log("returning initial newToggleStates", newToggleStates);

  return newToggleStates;
}
