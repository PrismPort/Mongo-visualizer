export const handleAnalyzeCollection = async (database, collection) => {
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
    const responseData = await response.json();
    console.log("response data in helper analyze collection:", responseData);
    return responseData;
  } catch (error) {
    console.error(error);
  }
};
