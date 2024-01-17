export const getDocumentCountForKey = async (database, collection, key) => {
  try {
    const response = await fetch(
      `http://localhost:4000/documentcount/${database}/${collection}/${key}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error querying documentCount from MongoDB");
    }

    const documentcount = await response.json();
    return documentcount; // Returns the fetched data
  } catch (error) {
    console.error(error);
    return null; // Optionally return null or an error indicator
  }
};
