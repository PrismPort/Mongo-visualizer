import { MongoClient } from "mongodb";

// services
import { analyzeCollection } from "../services/analyzeSchema.service.js";

let clientInstance = null; // mongo client instance, which will be reused throughout a session

export const connectMongoDB = async (req, res) => {
  let mongoURL = null;
  const user = req.body.username;
  const password = req.body.password;
  const port = req.body.port;
  let address = req.body.address;
  const DOCKER = "true";

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
    if (!clientInstance) {
      clientInstance = new MongoClient(mongoURL, { useUnifiedTopology: true });
      await clientInstance.connect();
    }
    console.log("Successfully connected to MongoDB");
    res.json({ mongoURL, message: "Successfully connected to MongoDB" });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ error: "Failed to connect to MongoDB" });
  }
};

export const logout = async (req, res) => {
  if (clientInstance) {
    await clientInstance.close();
    clientInstance = null;
  }
  res.json({ message: "Successfully disconnected from mongoDB" });
};

export const getClientInstance = () => {
  return clientInstance;
};

export const getDatabases = async (req, res) => {
  try {
    const client = getClientInstance();

    //console.log("getDatabases: " + client);

    // Access the specified collection and query data
    const adminDb = client.db("admin"); // Access the 'admin' database
    console.log("getDatabases: " + adminDb);


    const databases = await adminDb.admin().listDatabases();

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
    const client = getClientInstance();

    // Access the specified database and query data
    const db = client.db(database);
    const collections = await db.listCollections().toArray();

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
    const client = getClientInstance();

    // Access the specified collection and query data with limit
    const db = client.db(database);
    const collections = await db
      .collection(collection)
      .find()
      .limit(parseInt(limit))
      .toArray();

    res.json(collections);
  } catch (error) {
    console.error("Error querying data from MongoDB:", error);
    res.status(500).json({ error: "Failed to query data from MongoDB" });
  }
};

export const analyzeDatabase = async (req, res) => {
  const { database, collection } = req.params;
  const client = getClientInstance();

  console.log("Analyze schema");
  console.log("Database: " + database + ", Collection: " + collection);

  try {
    const db = client.db(database);
    const collections = await db.collection(collection).find().toArray();

    const schema = await analyzeCollection(collections, false);

    //console.dir(schema);

    res.json(schema);
  } catch (error) {
    console.error("Error querying data from MongoDB:", error);
    res.status(500).json({ error: "Failed to query data from MongoDB" });
  }
};

export const queryDatabase = async (req, res) => {
  const { database, collection } = req.params;
  const query = req.body;
  const client = getClientInstance();

  console.log("Analyze schema");
  console.log("Database: " + database + ", Collection: " + collection);

  try {
    const db = client.db(database);
    const collections = await db.collection(collection).find(query).toArray();

    const schema = await analyzeCollection(collections, true);

    const response = {
      schema,
    };
    res.json(response);
  } catch (error) {
    console.error("Error querying data from MongoDB:", error);
    res.status(500).json({ error: "Failed to query data from MongoDB" });
  }
};
