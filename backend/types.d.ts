import { MongoClient } from 'mongodb';

declare global {
    namespace Express {
        // augmenting the Request object of Express by adding two additional properties
        export interface Request {
            mongoURL?: string;
            client: MongoClient;
        }
    }

    interface Type {
        name: string;
        values: any[];
    }

    // used for infered schema statistics: every Item is associated with a distinct key
    export interface Item {
        count: number;
        type: string[];
        name: string;
        probability: number;
        types?: Type[];
    }
    export interface QueryResponse {
        schema: Item[];
        collection?: any[];
    }
}
