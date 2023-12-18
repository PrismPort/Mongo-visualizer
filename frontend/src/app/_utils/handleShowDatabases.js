export const handleShowDatabases = async (mongoURL) => {
  try {
    const response = await fetch("http://localhost:4000/query-databases", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        mongoURL: mongoURL,
      },
    });
    const data = await response.json();
    // setDatabases(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
