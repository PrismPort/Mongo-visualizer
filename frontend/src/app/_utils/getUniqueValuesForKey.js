export const getUniqueValuesForKey = async (
  database,
  collection,
  key,
  query = {}
) => {
  try {
    const queryString = new URLSearchParams({
      query: JSON.stringify(query),
    }).toString();
    const response = await fetch(
      `http://localhost:4000/uniquevalues/${database}/${collection}/${key}/?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error querying Unique Values for Key: ${key}  and query: ${query}from MongoDB`
      );
    }

    const uniquevalues = await response.json();
    return uniquevalues; // Returns the fetched data
  } catch (error) {
    console.error(error);
    return null; // Optionally return null or an error indicator
  }
};
