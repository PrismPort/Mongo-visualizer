// import { Collection } from "mongodb";
// import parseSchema from "mongodb-schema");

// export const analyzeCollection = async (collection, returnValues) => {
//   const parsedSchema = await parseSchema(collection, {
//     storeValues: returnValues,
//   });

//   //console.log(parsedSchema);

//   //console.dir(parsedSchema);

//   // parsing the schema could be a service and reused both in queryDatabase and analyzeDatabase
//   let schema = parsedSchema.fields.map((item) => {
//     let types = {};

//     if (returnValues) {
//       (item.types ?? []).forEach((type) => {
//         types[type.name] = type.values;
//       });
//     }

//     return {
//       count: item.count,
//       type: item.type,
//       name: item.name,
//       probability: item.probability,
//       ...(returnValues && { types: types }),
//     };
//   });

//   return schema;
// };

import { parseSchema } from "mongodb-schema";

export const analyzeCollection = async (collection, returnValues) => {
  const parsedSchema = await parseSchema(collection, {
    storeValues: returnValues, // store values in schema
    //sampleSize: 1000, // sample size of 1000 documents
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
