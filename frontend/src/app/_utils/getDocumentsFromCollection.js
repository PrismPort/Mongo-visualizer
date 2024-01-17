export const getDocumentsFromCollection = async (
  database,
  collection,
  limit
) => {
  try {
    const response = await fetch(
      `http://localhost:4000/query/${database}/${collection}/${limit}`,
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
