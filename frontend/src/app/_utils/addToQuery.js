// query building should be handled on global state
export const addToQuery = (key) => {
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

        // TODO: this should be outside of this function!
        // Send the updated query for "hot reloading" of collection stats
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