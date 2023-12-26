import { Collection } from "mongodb";
import { parseSchema } from "mongodb-schema";

export const analyzeCollection = async (collection, returnValues) => {
  const parsedSchema = await parseSchema(collection, {
    storeValues: returnValues,
  });

  const processField = (item) => {
    const field = {
      count: item.count,
      type: item.type,
      name: item.name,
      probability: item.probability,
      ...(returnValues && item.types && { types: item.types }),
    };

    if (item.type === "object" && item.fields) {
      field.fields = item.fields.map(processField);
    }

    return field;
  };

  let schema = parsedSchema.fields.map(processField);

  return schema;
};
