import { parseSchema } from "mongodb-schema";

export const analyzeCollection = async (collection, returnValues) => {
  const parsedSchema = await parseSchema(collection, {
    storeValues: true, // store values in schema
    sampleSize: 1000, // sample size of 1000 documents
  });

  const processField = (item) => {
    // Base field structure with visibility
    let field = {
      count: item.count,
      type: item.type,
      name: item.name,
      probability: item.probability,
      visibility: false, // Set visibility false for all fields
      ...(returnValues && item.types && { types: item.types }),
    };

    // Check if the field is an object with sub-fields
    if (item.type === "object" && item.fields) {
      field.fields = item.fields.map(processField); // Recursively process fields
    }

    // Check if the field is an array with types, one of which may be a Document
    if (item.type === "Array" && item.types) {
      field.types = item.types.map((type) => {
        // If the type is a Document, process its fields recursively
        if (type.bsonType === "Array" && type.types) {
          return {
            ...type,
            types: type.types.map(
              (subType) =>
                subType.bsonType === "Document" && {
                  ...subType,
                  fields: subType.fields.map(processField), // Process the Document fields
                }
            ), // Process the Document fields
          };
        }
        // Otherwise, return the type as is
        else {
          return {
            ...type,
          };
        }
      });
    }

    return field;
  };

  let schema = parsedSchema.fields.map(processField);

  return schema;
};
