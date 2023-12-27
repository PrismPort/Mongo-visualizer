export const handleLogin = async (loginData) => {
  console.log(loginData);
  try {
    const response = await fetch("http://localhost:4000/connect-to-mongodb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    if (response.ok) {
      // consume response body as json
      const body = await response.json();

      return true;
    } else {
      console.error("Login failed");
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const findMongoContainerNetwork = async () => {
  try {
    const response = await fetch("http://localhost:3000/run-command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ containerName: `mongoContainerName` }),
    });
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
