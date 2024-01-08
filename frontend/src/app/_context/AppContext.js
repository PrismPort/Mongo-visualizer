"use client";

import React, { createContext, useState, useEffect } from "react";

// EXPERIMENTAL: importing utility functions into global state

import { useSession } from "next-auth/react";

import { handleLoadCollections } from "../_utils/handleLoadCollections";
import { handleShowDatabases } from "../_utils/handleShowDatabases";
import { sendQuery } from "../_utils/sendQuery";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [stats, setStats] = useState([]);
  const [database, setDatabase] = useState("all");
  const [databases, setDatabases] = useState([]);
  const [collection, setCollection] = useState("all");
  const [collections, setCollections] = useState({});
  const [data, setData] = useState();
  const [collectionDbMap, setCollectionDbMap] = useState({});
  const [loadingDatabases, setLoadingDatabases] = useState(false);

  const { data: session, status } = useSession();
  const loadSession = status === "loading";
  const isLoggedIn = status === "authenticated";

  useEffect(() => {
    const fetchDatabases = async () => {
      const dbList = await handleShowDatabases();
      if (dbList) {
        setDatabases(dbList);
        setLoadingDatabases(true);
      }
    };
    if (isLoggedIn) {
      fetchDatabases();
      console.log("Fetching databases...");
      console.log("database", database);
      if (loadingDatabases) {
        fetchCollectionsForDatabase(database);
      }
    }
  }, [isLoggedIn, loadingDatabases]); // Empty dependency array means this runs once on component mount

  const fetchCollectionsForDatabase = async (database) => {
    try {
      let newCollectionDbMap = { ...collectionDbMap }; // Copy current collectionDbMap
      if (database === "all") {
        let allCollectionsList = []; // Initialize as an array for all collections
        for (const db of databases) {
          const collectionsData = await handleLoadCollections(db);
          if (collectionsData) {
            allCollectionsList = [...allCollectionsList, ...collectionsData]; // Concatenate all collections
            collectionsData.forEach((coll) => {
              newCollectionDbMap[coll] = db; // Update collectionDbMap
            });
          }
        }
        setCollections((prevState) => ({
          ...prevState,
          all: allCollectionsList, // Set 'all' to the list of all collections
        }));
      } else {
        if (!collections[database]) {
          const collectionsData = await handleLoadCollections(database);
          if (collectionsData) {
            setCollections((prevState) => ({
              ...prevState,
              [database]: collectionsData,
            }));
            collectionsData.forEach((coll) => {
              newCollectionDbMap[coll] = database; // Update collectionDbMap
            });
          }
        }
      }
      setCollectionDbMap(newCollectionDbMap); // Update the collectionDbMap state
    } catch (error) {
      console.error("Failed to load collections:", error);
    }
  };

  const updateStats = (newStats) => {
    setStats(newStats);
  };
  const updateData = (newData) => {
    setData(newData);
  }

  const updateDatabase = (newDatabase) => {
    setDatabase(newDatabase);
    console.log(`database updated to: ${newDatabase}`);
  };

  const updateCollection = (newCollection) => {
    setCollection(newCollection);
    console.log(`collection updated to: ${newCollection}`);
  };

  const [loading, setLoading] = useState(false);

  const handleAnalyzeCollections = async (database, collection) => {
    setLoading(true);
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
      // const datalocal = await response.json();
      const responseData = await response.json();
      console.log("Parsed response data:", responseData);
      setData(responseData);
      setStats(responseData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Pass the fetchDataAndUpdateContext function to the children
  const contextValue = {
    session,
    loadSession,
    data,
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
    updateData,
    collectionDbMap,
    isLoggedIn,
    sendQuery,
  };

  //console.log(contextValue);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
