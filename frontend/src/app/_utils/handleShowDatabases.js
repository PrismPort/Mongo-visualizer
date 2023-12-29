export const handleShowDatabases = async () => {
  try {
    const response = await fetch("http://localhost:4000/query-databases", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log("data from handleShowDatabases: ", data);

    return data;
  } catch (error) {
    console.error(error);
  }
};
