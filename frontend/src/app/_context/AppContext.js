"use client";

import React, { createContext, useState, useEffect } from "react";

// EXPERIMENTAL: importing utility functions into global state

import { useSession } from "next-auth/react";

import { handleLoadCollections } from "../_utils/handleLoadCollections";
import { handleShowDatabases } from "../_utils/handleShowDatabases";
import { handleAnalyzeCollection } from "../_utils/handleAnalyzeCollection";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [database, setDatabase] = useState("all");
  const [databases, setDatabases] = useState([]);
  const [collection, setCollection] = useState("all");
  const [collections, setCollections] = useState({});
  const [data, setData] = useState();
  const [collectionDbMap, setCollectionDbMap] = useState({});
  const [keysAndDocsInfo, setKeysAndDocsInfo] = useState({});

  const [loadingDatabases, setLoadingDatabases] = useState(false);
  const [loading, setLoading] = useState(false);

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
        for (const db of databases) {
          fetchCollectionsForDatabase(db);
        }
      }
    }
  }, [isLoggedIn, loadingDatabases]); // Empty dependency array means this runs once on component mount

  useEffect(() => {
    if (Object.keys(collections).length > 0) {
      enrichCollectionsWithKeysAndDocs(collections);
    }
  }, [collections]); // Depend on collections state

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
  // Function to enrich collections with keys and documents info
  const enrichCollectionsWithKeysAndDocs = async (collections) => {
    const enrichedCollections = {};
    for (const dbName in collections) {
      const dbCollections = collections[dbName];
      enrichedCollections[dbName] = {};

      for (const collection of dbCollections) {
        // Assuming handleAnalyzeCollection returns an object with keys and document counts
        const analysis = await handleAnalyzeCollection(dbName, collection);
        if (analysis) {
          enrichedCollections[dbName][collection] = {
            keys: Object.keys(analysis),
            documentCounts: Object.values(analysis).map((item) => item.count),
          };
        }
      }
    }
    setKeysAndDocsInfo(enrichedCollections);
  };

  const updateDatabase = (newDatabase) => {
    setDatabase(newDatabase);
    console.log(`database updated to: ${newDatabase}`);
  };

  const updateCollection = (newCollection) => {
    setCollection(newCollection);
    console.log(`collection updated to: ${newCollection}`);
  };

  const analyzeCollections = async (database, collection) => {
    setLoading(true);
    const data = await handleAnalyzeCollection(database, collection);
    setData(data);
    setLoading(false);
  };

  // Pass the fetchDataAndUpdateContext function to the children
  const contextValue = {
    session,
    loadSession,
    data,
    database,
    databases,
    updateDatabase,
    updateCollection,
    collection,
    collections,
    fetchCollectionsForDatabase,
    analyzeCollections,
    collectionDbMap,
    isLoggedIn,
    loadingDatabases,
    keysAndDocsInfo,
  };

  console.log(contextValue);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
