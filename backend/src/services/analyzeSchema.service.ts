import { Collection } from "mongodb";
const { parseSchema } = require('mongodb-schema');

export const analyzeCollection = async (collection: any[], returnValues: boolean) => {

    const parsedSchema = await parseSchema(collection, { storeValues: returnValues });

    //console.log(parsedSchema);

    //console.dir(parsedSchema);

    // parsing the schema could be a service and reused both in queryDatabase and analyzeDatabase
    let schema = parsedSchema.fields.map((item: Item) => {
        let types: { [key: string]: any[] } = {};

        if (returnValues) {
            (item.types ?? []).forEach((type: any) => {
                types[type.name] = type.values;
            });
        }

        return {
            count: item.count,
            type: item.type,
            name: item.name,
            probability: item.probability,
            ...(returnValues && { types: types })
        };
    });

    return schema;

}