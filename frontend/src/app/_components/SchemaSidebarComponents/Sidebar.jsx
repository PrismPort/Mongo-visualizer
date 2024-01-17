"use client";

import React, { useState, useContext, useEffect } from "react";
import SidebarItem from "./SidebarItem.jsx";
//import items from "../../_dummyData/sidebar.json"
import { AppContext } from "../../_context/AppContext.js";

import { useGraphContext } from "../../_context/GraphContext.js";

export default function Sidebar() {
  const {
    database,
    collection,
    collections,
    data,
    handleAnalyzeCollections,
    collectionDbMap,
  } = useContext(AppContext);

  const { sidebarItemsVisibility } = useGraphContext();

  const [items, setItems] = useState([]);

  const findDatabaseForCollection = (collectionName) => {
    return collectionDbMap[collectionName] || null; // Use the mapping to find the database
  };

  useEffect(() => {
    if (collection !== "all") {
      const selectedDatabase =
        database !== "all" ? database : findDatabaseForCollection(collection);
      if (selectedDatabase) {
        handleAnalyzeCollections(selectedDatabase, collection);
      }
    }
  }, [collection, database, collections, collectionDbMap]); // Include collectionDbMap in dependencies

  useEffect(() => {
    setItems(data || []);
  }, [data, collection]);

  if (collection === "all") {
    return null;
  }
  return (
    <>

      <div className="w-full flex-shrink-1 bg-white-400 h-full overflow-auto text-sm rounded-l-3xl border-2 border-black p-4">
        <div className="p-2">
          <u><b>SCHEMA</b></u>
        </div>
        <table className='w-full text-left table-auto min-w-max'>
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              visibility={sidebarItemsVisibility[item.name] || false}
            />
          ))}
        </table>
      </div>
    </>
  );
}
