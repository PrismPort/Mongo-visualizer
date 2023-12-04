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
    database: string;
    collection: string;
    handleAnalyzeCollections: (mongoURL: string, database: string, collection: string) => Promise<void>;
    updateStats: (newStats: Stat[]) => void; // Add a new function to update the stats

}

export const StatsContext = createContext<StatsContextType | undefined>(undefined);


const LoadingOverlay = () => {
    return (
        <div className='fixed flex items-center justify-center w-full h-full'>
            <div className='w-32 h-32 slow-spin bg-opacity-0'>LADEANIMATION!!</div>
        </div>
    );
}


const StatsFetcher = ({ children }) => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [database, setDatabase] = useState('');
    const [collection, setCollection] = useState('');


    const handleAnalyzeCollections = async (mongoURL: string, database: string, collection: string) => {

        updateDatabase(database);
        updateCollection(collection);
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }

    const updateStats = (newStats: typeof stats) => {
        setStats(newStats);
    }

    const updateDatabase = (newDatabase: string) => {
        setDatabase(newDatabase);
    }

    const updateCollection = (newCollection: string) => {
        setCollection(newCollection);
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
        <StatsContext.Provider value={contextValue}>
            {loading ? <LoadingOverlay/> : children}
        </StatsContext.Provider>
    );
};

export default StatsFetcher;