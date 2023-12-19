"use client";

import React, { createContext, useState, useEffect } from "react";

// EXPERIMENTAL: importing utility functions into global state

import { handleLoadCollections } from "../_utils/handleLoadCollections";
import { handleShowDatabases } from "../_utils/handleShowDatabases";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [stats, setStats] = useState([]);
  const [database, setDatabase] = useState("all");
  const [databases, setDatabases] = useState([]);
  const [collection, setCollection] = useState("all");
  const [collections, setCollections] = useState({});
  const [mongoURL, setMongoURL] = useState("");

  useEffect(() => {
    const mongo = localStorage.getItem("mongoURL");
    setMongoURL(mongo);
    const fetchDatabases = async () => {
      const dbList = await handleShowDatabases(mongo);
      if (dbList) {
        setDatabases(dbList);
      }
    };

    fetchDatabases();
  }, []); // Empty dependency array means this runs once on component mount

  const fetchCollectionsForDatabase = async (database) => {
    if (!collections[database]) {
      try {
        if (database === "all") {
          let allCollections = []; // Initialize as an empty array
          for (const db of databases) {
            const collectionsData = await handleLoadCollections(db, mongoURL);
            if (collectionsData) {
              allCollections = [...allCollections, ...collectionsData];
            }
          }
          setCollections((prevState) => ({
            ...prevState,
            [database]: allCollections,
          }));
        } else {
          const collectionsData = await handleLoadCollections(
            database,
            mongoURL
          );
          if (collectionsData) {
            setCollections((prevState) => ({
              ...prevState,
              [database]: collectionsData,
            }));
          }
        }
      } catch (error) {
        console.error("Failed to load collections:", error);
        // Handle the error appropriately
      }
    }
  };

  const updateStats = (newStats) => {
    setStats(newStats);
  };

  const updateDatabase = (newDatabase) => {
    setDatabase(newDatabase);
  };

  const updateCollection = (newCollection) => {
    setCollection(newCollection);
  };

  const handleAnalyzeCollections = async (mongoURL, database, collection) => {
    updateDatabase(database);
    updateCollection(collection);
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/analyze/${database}/${collection}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            mongoURL: mongoURL,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Pass the fetchDataAndUpdateContext function to the children
  const contextValue = {
    mongoURL,
    stats,
    database,
    databases,
    updateDatabase,
    updateCollection,
    collection,
    collections,
    fetchCollectionsForDatabase,
    handleAnalyzeCollections,
    updateStats,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
