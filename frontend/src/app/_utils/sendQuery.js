export const sendQuery = async (query, database, collection) => {
    const url = `http://localhost:4000/query/${database}/${collection}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};
