import { Collection } from "mongodb";
import { parseSchema } from "mongodb-schema";

export const analyzeCollection = async (collection, returnValues) => {
  const parsedSchema = await parseSchema(collection, {
    storeValues: returnValues,
  });

  //console.log(parsedSchema);

  //console.dir(parsedSchema);

  // parsing the schema could be a service and reused both in queryDatabase and analyzeDatabase
  let schema = parsedSchema.fields.map((item) => {
    return {
      count: item.count,
      type: item.type,
      name: item.name,
      probability: item.probability,
      ...(returnValues && { types: types }),
    };
  });

  return schema;
};
