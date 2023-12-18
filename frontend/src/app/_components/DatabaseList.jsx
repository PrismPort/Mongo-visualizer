"use client";

import React, { useContext } from "react";
import { AppContext } from "../_context/AppContext";

const DatabaseList = () => {
  const { databases } = useContext(AppContext);

  if (!databases || databases.length === 0) {
    return <div>No databases found.</div>;
  }

  return (
    <div>
      <h2>All Databases</h2>
      <ul>
        {databases.map((database, index) => (
          <li key={index}>{database}</li> // Assuming 'database' is a string
        ))}
      </ul>
    </div>
  );
};

export default DatabaseList;
