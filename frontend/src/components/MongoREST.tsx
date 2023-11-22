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
                                <input type="text" name="password" className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
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
    const [databases, setDatabases] = useState<string[]>([]);
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


const SchemaStats = () => {
    const context = useContext(StatsContext);

    if (!context) {
        // handle the case where context is undefined
        return null;
    }
    const { stats, handleAnalyzeCollections } = context;
    return (
        <>
            {stats.map((item) => (
                <p key={item.name}><b>Key:</b> {item.name} |<b>Type:</b> {item.type} | <b>Count:</b> {item.count.toString()} | <b>Probability:</b> {item.probability.toString()}</p>
            ))}




        </>
    )
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
                    <div className='w-1/2'>
                        <SchemaStats />
                    </div>
                </StatsFetcher>
            </div>
        </>
    );
}




export { MongoREST };