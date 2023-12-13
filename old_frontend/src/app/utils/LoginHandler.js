export const handleLogin = async (loginData) => {
  // No need for event.preventDefault() as we're not dealing with an event here
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
      console.log("Login successful");
      // consume response body as json
      const body = await response.json();
      console.log(body);

      // save token to local storage
      localStorage.setItem("mongoURL", body.mongoURL);

      // redirect to home page
      window.location.href = "/mongoVisualizer";
    } else {
      console.error("Login failed");
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
