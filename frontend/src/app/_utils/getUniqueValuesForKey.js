export const getUniqueValuesForKey = async (database, collection, key) => {
  try {
    const response = await fetch(
      `http://localhost:4000/uniquevalues/${database}/${collection}/${key}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error querying Unique Values for Key: ${key} from MongoDB`
      );
    }

    const uniquevalues = await response.json();
    return uniquevalues; // Returns the fetched data
  } catch (error) {
    console.error(error);
    return null; // Optionally return null or an error indicator
  }
};
