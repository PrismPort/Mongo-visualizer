// TODO: should be refactored for global context
export const handleAnalyze = async (database, collection) => {
  try {
    const response = await fetch(
      `http://localhost:4000/analyze/${database}/${collection}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
