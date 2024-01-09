"use client";

import React from "react";
import Sidebar from "./Sidebar.jsx";

const CollectionDashboard = () => {
  return (
    <>
      <div className="flex h-screen justify-end">
        <div className="w-full">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default CollectionDashboard;
