import { Request, Response } from 'express';
import { Db } from 'mongodb';
const { MongoClient } = require("mongodb");
const { parseSchema } = require('mongodb-schema');

// services
import { analyzeCollection } from '../services/analyzeSchema.service.js';


export const connectMongoDB = async (req: Request, res: Response, DOCKER: string | undefined) => {
  let mongoURL = null;

  // construct mongo url
  const user = req.body.username;
  const password = req.body.password;
  const port = req.body.port;
  let adress = req.body.adress;

  // Docker config for mongoDB on localhost
  if (DOCKER === "true" && (adress == "localhost" || adress == "127.0.0.1")) {
    adress = "host.docker.internal";
  }

  if (user == null || user == "" || password == null || password == "") {
    mongoURL = `mongodb://${adress}:${port}`;
  } else {
    mongoURL = `mongodb://${user}:${password}@${adress}:${port}`;
  }

  console.log(mongoURL);


  if (!mongoURL === null) {
    return res.status(400).json({ error: 'MongoDB URL is required' });
  }

  try {
    const client = new MongoClient(mongoURL, { useUnifiedTopology: true });
    await client.connect();
    // Close the MongoDB connection
    await client.close();

    // respond with the provided URL as json and a success message
    res.json({ mongoURL, message: 'Successfully connected to MongoDB' });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Failed to connect to MongoDB' });
  }
}


export const getDatabases = async (req: Request, res: Response) => {

  try {
    const client: typeof MongoClient = req.client;
    await client.connect();

    // Access the specified collection and query data
    const adminDb: Db = client.db('admin'); // Access the 'admin' database
    const databases = await adminDb.admin().listDatabases();

    // Close the MongoDB connection
    await client.close();

    const databaseNames = databases.databases.map(db => db.name);
    res.json(databaseNames);
  } catch (error) {
    console.error('Error querying data from MongoDB:', error);
    res.status(500).json({ error: 'Failed to query data from MongoDB' });
  }
};

export const getCollections = async (req: Request, res: Response) => {
  const { database } = req.params;

  try {
    const client: typeof MongoClient = req.client;
    await client.connect();

    // Access the specified database and query data
    const db: Db = client.db(database);
    const collections = await db.listCollections().toArray();


    // Close the MongoDB connection
    await client.close();

    const collectionNames = collections.map(collection => collection.name);
    res.json(collectionNames);

  } catch (error) {
    console.error('Error querying data from MongoDB:', error);
    res.status(500).json({ error: 'Failed to query data from MongoDB' });
  }

}

export const getDocumentsFromCollection = async (req: Request, res: Response) => {
  const { database, collection, limit } = req.params;

  try {
    const client: typeof MongoClient = req.client;

    // Access the specified collection and query data with limit
    const db: Db = client.db(database);
    const collections = await db.collection(collection).find().limit(parseInt(limit)).toArray();

    // Close the MongoDB connection
    await client.close();

    res.json(collections);

  } catch (error) {
    console.error('Error querying data from MongoDB:', error);
    res.status(500).json({ error: 'Failed to query data from MongoDB' });
  }
};

export const analyzeDatabase = async (req: Request, res: Response) => {
  const { database, collection } = req.params;
  const client: typeof MongoClient = req.client;

  console.log("analyze schema");
  console.log("database: " + database + " " + "collection: " + collection);

  try {
    const db: Db = client.db(database);
    const collections = await db.collection(collection).find().toArray();

    let schema = await analyzeCollection(collections, false)

    console.dir(schema);

    res.json(schema);

  } catch (error) {
    console.error('Error querying data from MongoDB:', error);
    res.status(500).json({ error: 'Failed to query data from MongoDB' });
  } finally {
    await client.close();
  }
}

export const queryDatabase = async (req: Request, res: Response) => {
  const { database, collection } = req.params;
  const query = req.body;
  const client: typeof MongoClient = req.client;

  console.log("analyze schema");
  console.log("database: " + database + " " + "collection: " + collection);

  try {

    const db: Db = client.db(database);
    const collections = await db.collection(collection).find(query).toArray();

    let schema = await analyzeCollection(collections, true)

    //console.dir(schema);

    const response: QueryResponse = {
      schema,
    }
    // Close the MongoDB connection
    await client.close();

    //console.log(response);
    res.json(response);



  } catch (error) {
    console.error('Error querying data from MongoDB:', error);
    res.status(500).json({ error: 'Failed to query data from MongoDB' });
  }
}