export const sendQuery = async (query, database, collection) => {
  const url = `http://localhost:4000/query/${database}/${collection}`;
  try {
    console.log("query to send to backend", query);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const data = await response.json();
    console.log("data response in send query", data);
    return data; // Return the fetched data
  } catch (error) {
    console.error(error);
    return null; // Handle error appropriately
  }
};
