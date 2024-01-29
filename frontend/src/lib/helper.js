// Helper functions
export function isAnyChildVisible(visibilityObject) {
  return Object.values(visibilityObject).some(
    (val) => val === true || (typeof val === "object" && isAnyChildVisible(val))
  );
}

export function setAllChildrenVisibility(visibilityObject, visibility) {
  Object.keys(visibilityObject).forEach((key) => {
    if (typeof visibilityObject[key] === "object") {
      setAllChildrenVisibility(visibilityObject[key], visibility);
    } else {
      visibilityObject[key] = visibility;
    }
  });
}

export function initializeKeyVisibilities(databaseMap) {
  const keyVisibilities = {};

  const setVisibilityForLeafNodes = (keys, visibilities) => {
    keys.forEach((key) => {
      // Check if the key has nested keys
      if (key.types && key.types.some((type) => type.bsonType === "Document")) {
        // Initialize a nested object for the parent key if it doesn't exist
        visibilities[key.name] = visibilities[key.name] || {};
        key.types.forEach((type) => {
          if (type.fields) {
            // Recursively set visibility for nested keys
            setVisibilityForLeafNodes(type.fields, visibilities[key.name]);
          }
        });
      } else if (
        key.types &&
        key.types.some(
          (type) =>
            type.bsonType === "Array" &&
            type.types.some((t) => t.bsonType === "Document")
        )
      ) {
        // Handle arrays containing documents
        visibilities[key.name] = visibilities[key.name] || {};
        key.types.forEach((type) => {
          if (type.types) {
            type.types.forEach((innerType) => {
              if (innerType.bsonType === "Document" && innerType.fields) {
                // Recursively set visibility for nested keys in array
                setVisibilityForLeafNodes(
                  innerType.fields,
                  visibilities[key.name]
                );
              }
            });
          }
        });
      } else {
        // It's a leaf node, set its visibility
        visibilities[key.name] = false;
      }
    });
  };

  Object.keys(databaseMap).forEach((dbName) => {
    keyVisibilities[dbName] = {};
    const collections = databaseMap[dbName];

    collections.forEach((collection) => {
      const collectionName = Object.keys(collection)[0];
      const keys = collection[collectionName];
      keyVisibilities[dbName][collectionName] = {};

      setVisibilityForLeafNodes(keys, keyVisibilities[dbName][collectionName]);
    });
  });

  return keyVisibilities;
}

export function buildQuery(keyVisibilities) {
  let query = {};

  const buildSubQuery = (subVisibilities) => {
    let subQuery = {};
    for (let key in subVisibilities) {
      if (subVisibilities[key] === true) {
        subQuery[key] = { $exists: true };
      } else if (typeof subVisibilities[key] === "object") {
        let nestedSubQuery = buildSubQuery(subVisibilities[key]);
        for (let subkey in nestedSubQuery) {
          subQuery[`${key}.${subkey}`] = nestedSubQuery[subkey];
        }
      }
    }
    return subQuery;
  };

  for (let dbName in keyVisibilities) {
    for (let collectionName in keyVisibilities[dbName]) {
      let subQuery = buildSubQuery(keyVisibilities[dbName][collectionName]);
      for (let subkey in subQuery) {
        query[`${subkey}`] = subQuery[subkey];
      }
    }
  }

  return query;
}
