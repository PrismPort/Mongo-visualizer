const sendQuery = async (query, database, collection) => {
    // console.log(query);
    console.log(database, collection);
    const url = `http://localhost:4000/query/${database}/${collection}`;
    try {
        // setLoading(true); // used for loading screens
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mongoURL': localStorage.getItem('mongoURL'),
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
        // setLoading(false);  // used for loading screens
    }

};