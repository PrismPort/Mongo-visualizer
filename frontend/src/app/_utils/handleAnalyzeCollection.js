// TODO: should be refactored for global context
export const handleAnalyze = async (database, collection) => {
    try {
        await handleAnalyzeCollections(mongoURL, database, collection);
        // console.log(stats);
    } catch (error) {
        console.error(error);
        // handle error
    }
};