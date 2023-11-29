import React, { createContext, useState } from 'react';

interface Stat {
    name: string;
    count: Number;
    type: Array<string>;
    values: Array<any>;
    probability: Number;
    // include other properties as needed
  }


interface StatsContextType {
    stats: Stat[]; // replace any with the actual type of stats
    handleAnalyzeCollections: (mongoURL: string, database: string, collection: string) => Promise<void>;
    updateStats: (newStats: Stat[]) => void; // Add a new function to update the stats

}

export const StatsContext = createContext<StatsContextType | undefined>(undefined);


const StatsFetcher = ({ children }) => {
    const [stats, setStats] = useState([]);

    const handleAnalyzeCollections = async (mongoURL: string, database: string, collection: string) => {
        try {
            const response = await fetch(`http://localhost:4000/analyze/${database}/${collection}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'mongoURL': mongoURL as string,
                },
            });
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error(error);
        }
    }

    const updateStats = (newStats: typeof stats) => {
        setStats(newStats); // Define the function to update the stats
    }

    // Pass the fetchDataAndUpdateContext function to the children
    const contextValue = {
        stats,
        handleAnalyzeCollections,
        updateStats
    };

    return (
        <StatsContext.Provider value={contextValue}>
            {children}
        </StatsContext.Provider>
    );
};

export default StatsFetcher;