import React, { useState, useEffect } from "react";

const ContainerSelector = () => {
  const [containers, setContainers] = useState([]);
  const [selectedContainer, setSelectedContainer] = useState("");

  useEffect(() => {
    // Replace 'localhost' with your backend's host if different
    fetch("http://localhost:4000/api/containers")
      .then((response) => response.json())
      .then((data) => setContainers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSelectionChange = (event) => {
    setSelectedContainer(event.target.value);
    // Additional logic for handling the selected container
  };

  return (
    <div>
      <label htmlFor="container-select">Choose a MongoDB Container:</label>
      <select
        id="container-select"
        onChange={handleSelectionChange}
        value={selectedContainer}
      >
        <option value="">--Please choose an option--</option>
        {containers.map((container, index) => (
          <option key={index} value={container.Id}>
            {container.Names[0]} (Image: {container.Image})
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContainerSelector;
