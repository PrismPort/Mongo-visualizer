export const getDocumentsFromCollection = async (
  database,
  collection,
  query = {}, // query is a stringified JSON object
  limit = 1000
) => {
  try {
    const queryString = new URLSearchParams({
      query: JSON.stringify(query),
      limit: limit,
    }).toString();

    const response = await fetch(
      `http://localhost:4000/query-documents/${database}/${collection}/?${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Returns the fetched data
  } catch (error) {
    console.error(error);
    return null; // Optionally return null or an error indicator
  }
};
