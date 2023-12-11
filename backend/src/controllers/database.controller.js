import { MongoClient } from "mongodb";

// services
import { analyzeCollection } from "../services/analyzeSchema.service.js";

// Removed all type annotations and TypeScript-specific code
export const connectMongoDB = async (req, res) => {
  let mongoURL = null;
  const user = req.body.username;
  const password = req.body.password;
  const port = req.body.port;
  let address = req.body.address;
  const DOCKER = process.env.DOCKER;

  // Docker config for MongoDB on localhost
  if (
    DOCKER === "true" &&
    (address === "localhost" || address === "127.0.0.1")
  ) {
    address = "host.docker.internal";
  }

  mongoURL =
    user && password
      ? `mongodb://${user}:${password}@${address}:${port}`
      : `mongodb://${address}:${port}`;

  console.log(mongoURL);

  if (!mongoURL) {
    return res.status(400).json({ error: "MongoDB URL is required" });
  }

  try {
    const client = new MongoClient(mongoURL, { useUnifiedTopology: true });
    await client.connect();
    await client.close();
    res.json({ mongoURL, message: "Successfully connected to MongoDB" });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ error: "Failed to connect to MongoDB" });
  }
};

export const getDatabases = async (req, res) => {
  try {
    const client = req.client;
    await client.connect();

    // Access the specified collection and query data
    const adminDb = client.db("admin"); // Access the 'admin' database
    const databases = await adminDb.admin().listDatabases();

    // Close the MongoDB connection
    await client.close();

    const databaseNames = databases.databases.map((db) => db.name);
    res.json(databaseNames);
  } catch (error) {
    console.error("Error querying data from MongoDB:", error);
    res.status(500).json({ error: "Failed to query data from MongoDB" });
  }
};

export const getCollections = async (req, res) => {
  const database = req.params.database;

  try {
    const client = req.client;
    await client.connect();

    // Access the specified database and query data
    const db = client.db(database);
    const collections = await db.listCollections().toArray();

    // Close the MongoDB connection
    await client.close();

    const collectionNames = collections.map((collection) => collection.name);
    res.json(collectionNames);
  } catch (error) {
    console.error("Error querying data from MongoDB:", error);
    res.status(500).json({ error: "Failed to query data from MongoDB" });
  }
};

export const getDocumentsFromCollection = async (req, res) => {
  const { database, collection, limit } = req.params;

  try {
    const client = req.client;

    // Access the specified collection and query data with limit
    const db = client.db(database);
    const collections = await db
      .collection(collection)
      .find()
      .limit(parseInt(limit))
      .toArray();

    // Close the MongoDB connection
    await client.close();

    res.json(collections);
  } catch (error) {
    console.error("Error querying data from MongoDB:", error);
    res.status(500).json({ error: "Failed to query data from MongoDB" });
  }
};

export const analyzeDatabase = async (req, res) => {
  const { database, collection } = req.params;
  const client = req.client;

  console.log("Analyze schema");
  console.log("Database: " + database + ", Collection: " + collection);

  try {
    const db = client.db(database);
    const collections = await db.collection(collection).find().toArray();

    const schema = await analyzeCollection(collections, false);

    console.dir(schema);

    res.json(schema);
  } catch (error) {
    console.error("Error querying data from MongoDB:", error);
    res.status(500).json({ error: "Failed to query data from MongoDB" });
  } finally {
    await client.close();
  }
};

export const queryDatabase = async (req, res) => {
  const { database, collection } = req.params;
  const query = req.body;
  const client = req.client;

  console.log("Analyze schema");
  console.log("Database: " + database + ", Collection: " + collection);

  try {
    const db = client.db(database);
    const collections = await db.collection(collection).find(query).toArray();

    const schema = await analyzeCollection(collections, true);

    const response = {
      schema,
    };

    // Close the MongoDB connection
    await client.close();

    res.json(response);
  } catch (error) {
    console.error("Error querying data from MongoDB:", error);
    res.status(500).json({ error: "Failed to query data from MongoDB" });
  }
};
