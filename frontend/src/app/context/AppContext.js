'use client'
import React, { createContext, useState } from 'react';

// EXPERIMENTAL: importing utility functions into global state

import { handleLoadCollections } from '../utils/handleLoadCollections';
import { handleShowDatabases } from '../utils/handleShowDatabases';


export const AppContext = createContext();


const AppProvider = ({ children }) => {
    const [stats, setStats] = useState([]);
    const [database, setDatabase] = useState('');
    const [collection, setCollection] = useState('');

    const updateStats = (newStats) => {
        setStats(newStats);
    }

    const updateDatabase = (newDatabase) => {
        setDatabase(newDatabase);
    }

    const updateCollection = (newCollection) => {
        setCollection(newCollection);
    }


    const handleAnalyzeCollections = async (mongoURL, database, collection) => {

        updateDatabase(database);
        updateCollection(collection);
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4000/analyze/${database}/${collection}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'mongoURL': mongoURL,
                },
            });
            const data = await response.json();
            console.log(data);
            setStats(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }



    // Pass the fetchDataAndUpdateContext function to the children
    const contextValue = {
        stats,
        database,
        collection,
        handleAnalyzeCollections,
        updateStats
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;