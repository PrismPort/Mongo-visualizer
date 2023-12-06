import React, { useContext } from 'react';
import './MongoREST.css';
import { useState } from 'react';
import StatsFetcher from './fetchStats.tsx';
import { StatsContext } from './fetchStats.tsx';


interface MongoLoginProps {
    username: string;
    password: string;
    adress: string;
    port: string;
}

interface MongoLoginState {
    username: string;
    password: string;
    adress: string;
    port: string;
}

const MongoLogin = () => {

    const mongoURL = localStorage.getItem('mongoURL');


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [adress, setAdress] = useState('');
    const [port, setPort] = useState('');

    // send as body to backend when submit
    const loginData: MongoLoginProps = {
        username: username,
        password: password,
        adress: adress,
        port: port,
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginData: MongoLoginProps = {
            username: data.get('username') as string,
            password: data.get('password') as string,
            adress: data.get('adress') as string,
            port: data.get('port') as string,
        };
        console.log(loginData);
        try {
            const response = await fetch('http://localhost:4000/connect-to-mongodb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            if (response.ok) {
                console.log('Login successful');
                // consume response body as json
                const body = await response.json();
                console.log(body);

                // save token to local storage
                localStorage.setItem('mongoURL', body.mongoURL);

                // reload page
                window.location.reload();

            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    if (mongoURL) {
        return null;
    } else {
        return (
            <>
                <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Connect to MongoDB</h2>

                    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                        <form className='space-y-4' onSubmit={handleSubmit}>
                            <label className='block text-sm font-medium leading-6 text-gray-900'>
                                Username:
                                <input type="text" name="username" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                            </label>
                            <label className='block text-sm font-medium leading-6 text-gray-900'>
                                Password:
                                <input type="password" name="password" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                            </label>
                            <label className='block text-sm font-medium leading-6 text-gray-900'>
                                Address:
                                <input type="text" name="adress" defaultValue={"127.0.0.1"} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                            </label>
                            <label className='block text-sm font-medium leading-6 text-gray-900'>
                                Port:
                                <input type="text" name="port" defaultValue={"27017"} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                            </label>

                            <button type="submit" className='flex w-full justify-center rounded-md  bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Submit</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}



const MongoOptions = () => {
    const [databases, setDatabases] = useState<string[]>([]); // should be a global context
    const [collections, setCollections] = useState<Record<string, string[]>>({});

    const context = useContext(StatsContext);

    if (!context) {
        // handle the case where context is undefined
        return null;
    }
    const { stats, handleAnalyzeCollections } = context;

    const mongoURL = localStorage.getItem('mongoURL');

    const handleShowDatabases = async () => {
        try {
            const response = await fetch('http://localhost:4000/query-databases', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'mongoURL': mongoURL as string,
                },
            });
            const data = await response.json();
            setDatabases(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoadCollections = async (database: string) => {
        try {
            const response = await fetch(`http://localhost:4000/query/${database}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'mongoURL': mongoURL as string,
                },
            });
            const data = await response.json();
            setCollections(prevState => ({ ...prevState, [database]: data }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAnalyze = async (database: string, collection: string) => {
        try {
            await handleAnalyzeCollections(mongoURL as string, database, collection);
            // handle success

            console.log(stats);
        } catch (error) {
            console.error(error);
            // handle error
        }
    };

    if (!mongoURL) {
        return null;
    }
    else {
        return (
            <>
                <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
                    <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Connected to MongoDB</h1>

                    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                        <p className='text-center text-gray-900'>URL: {mongoURL}</p>
                        {databases.length > 0 && (
                            <ul className='mt-4'>
                                {databases.map((database) => (
                                    <li key={database} className='mb-2'>
                                        <a
                                            href={`#${database}`}
                                            className='hover:underline text-blue-500 hover:text-blue-700'
                                            onClick={() => handleLoadCollections(database)}
                                        >
                                            ├─ {database}
                                        </a>
                                        <ul className='ml-4'>
                                            {collections[database]?.map((collection, index, arr) => (
                                                <li key={collection} className='mb-2'>
                                                    <a
                                                        href={`#${collection}`}
                                                        className='hover:underline text-blue-500 hover:text-blue-700'
                                                        onClick={() => handleAnalyze(database, collection)}
                                                    >
                                                        {index === arr.length - 1 ? '└─ ' : '│─ '}{collection}
                                                    </a>


                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button
                            onClick={handleShowDatabases}
                            className='flex w-full justify-center rounded-md bg-blue-500 text-white py-2 px-4 mt-4 hover:bg-blue-700'
                        >
                            Show all databases
                        </button>
                        <button
                            onClick={deleteMongoURL}
                            className='flex w-full justify-center rounded-md bg-red-500 text-white py-2 px-4 mt-4 hover:bg-red-700'
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </>
        );
    }
};

const LoadingOverlay = () => {
    return (
        <div className='fixed flex items-center justify-center w-full h-full'>
            <div className='w-32 h-32 slow-spin bg-opacity-0'>LADEANIMATION!!</div>
        </div>
    );
}


const SchemaStats = () => {
    const context = useContext(StatsContext);
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [queriesCopy, setQueriesCopy] = useState({});

    if (!context) {
        // handle the case where context is undefined
        return null;
    }
    const { stats, database, collection, handleAnalyzeCollections, updateStats } = context;

    const handleRowClick = (name) => {
        if (selectedRows.includes(name)) {
            setSelectedRows(selectedRows.filter(row => row !== name));
        } else {
            setSelectedRows([...selectedRows, name]);
        }
    };

    const getColorBasedOnProbability = (probability: Number) => {
        // change hsl based on probability
        const hue = probability * 120;
        const saturation = 100;
        const lightness = 50;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    const getWidthBasedOnProbability = (probability: Number) => {
        return `${probability * 100}%`;
    }

    /* const queryToJSON = () => {
        const query = { $and: queries };
        return query;
    } */

    const addToQuery = (key) => {
        handleRowClick(key);

        const newQuery = { [key]: { $exists: true } };
        setQueries((prevQueries) => {
            let updatedQueries;
            const existingQueryIndex = prevQueries.findIndex(query => JSON.stringify(query) === JSON.stringify(newQuery));

            if (existingQueryIndex !== -1) {
                // Query exists, remove it
                updatedQueries = [...prevQueries];
                updatedQueries.splice(existingQueryIndex, 1);
            } else {
                // Query doesn't exist, add it
                updatedQueries = [...prevQueries, newQuery];
            }

            // Send the updated query
            if (updatedQueries.length > 1) {
                sendQuery({ $and: updatedQueries }, database, collection);
                setQueriesCopy({ $and: updatedQueries }); // deep copy for printing
            } else if (updatedQueries.length === 1) { // only one query, no need for an $and
                sendQuery(updatedQueries[0], database, collection);
                setQueriesCopy(updatedQueries[0]); // deep copy for printing
            } else {
                // Handle case when there are no queries
                sendQuery({}, database, collection);
            }

            return updatedQueries;
        });
    };

    const sendQuery = async (query, database, collection) => {
        // console.log(query);
        console.log(database, collection);
        const url = `http://localhost:4000/query/${database}/${collection}`;
        try {
            setLoading(true);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'mongoURL': localStorage.getItem('mongoURL') as string,
                },
                body: JSON.stringify(query),
            });
            const data = await response.json();

            // show loading overlay
            // setLoading(true);
            // hide loading overlay when data is received
            // setLoading(false);
            //console.log(data.schema);
            //console.log(data.collections);
            updateStats(data.schema);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    };

    if (loading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <table className="m-5">
                <thead>
                    <tr>
                        <th className="text-left">key</th>
                        <th className="text-left">type</th>
                        <th className="text-right">count</th>
                        <th className="text-right">probability</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((item, index) => (
                        <tr
                            key={item.name}
                            className={`${index % 2 === 0 ? 'even-row' : 'odd-row'} ${selectedRows.includes(item.name) ? 'selected-row' : ''}`}
                            onClick={() => addToQuery(item.name)}
                        >
                            <td className="text-left monospace p-2">{item.name}</td>
                            <td className="text-left monospace p-2">{item.type.toString()}</td>
                            <td className="text-right monospace p-2">{item.count.toString()}</td>
                            <td
                                className="text-right monospace p-2"
                            >
                                <div style={{
                                    width: getWidthBasedOnProbability(item.probability),
                                    backgroundColor: getColorBasedOnProbability(item.probability),
                                    height: '100%'
                                }}>{item.probability.toFixed(2).toString()}</div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="m-5">
                <b>Query:</b>
                <p style={{ fontSize: 'small' }} className='monospace'>
                    {JSON.stringify(queriesCopy, null, 2)}
                </p>
            </div>
        </>
    )
}

const DataDetails = () => {
    const context = useContext(StatsContext);
    if (!context) {
        // handle the case where context is undefined
        return null;
    }
    const { stats, handleAnalyzeCollections, updateStats } = context;
    console.log(stats)

    return (
        <>
            <div className='flex min-h-full flex-col justify-start px-6 py-12 lg:px-8'>
                <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Data Details</h1>
                {stats.map((item, index) => (
                    <div key={item.name} className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                        <p className='text-center text-gray-900'>key: {item.name}</p>
                        
                    </div>
                ))}
            </div>
        </>
    );
}


const deleteMongoURL = () => {
    localStorage.removeItem('mongoURL');
    window.location.reload();
};

const MongoREST = () => {
    return (
        <>
            <div className='flex'>
                <StatsFetcher>
                    <div className='w-1/4'>
                        <MongoLogin />
                        <MongoOptions />
                    </div>
                    <div className='w-1/3'>
                        <SchemaStats />
                    </div>
                    <div className='w-1/3'>
                        <DataDetails />
                    </div>
                </StatsFetcher>
            </div>
        </>
    );
}




export { MongoREST };