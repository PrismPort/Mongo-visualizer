// returns an object with key value pairs of database and an array of collections of it
export const handleLoadCollections = async (database) => {
    //const [collections, setCollections] = useState({});
    try {
        const response = await fetch(`http://localhost:4000/query/${database}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'mongoURL': mongoURL,
            },
        });
        const data = await response.json();
        setCollections(prevState => ({ ...prevState, [database]: data }));
        return collections;
    } catch (error) {
        console.error(error);
    }
};