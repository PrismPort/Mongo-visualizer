"use client";

import React, { useState, useContext, useEffect } from "react";
import SidebarItem from "./SidebarItem.jsx";
//import items from "../../_dummyData/sidebar.json"
import { AppContext } from "../../_context/AppContext";

export default function Sidebar() {
  const { database, collection, data, handleAnalyzeCollections } =
    useContext(AppContext);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (collection !== "all" && database !== "all") {
      const fetchData = async () => {
        handleAnalyzeCollections(database, collection);
      };

      fetchData();
    }
  }, [collection, database]); // Add collection and database as dependencies

  useEffect(() => {
    console.log("data", data);
    setItems(data || []);
  }, [data]);

  return (
    <>
      <div className="w-64 flex-shrink-0 bg-white h-full overflow-auto text-sm rounded-lg border-2 border-black">
        <div className="p-2">
          <u>
            <b>SCHEMA</b>
          </u>
        </div>
        {items.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </>
  );
}
