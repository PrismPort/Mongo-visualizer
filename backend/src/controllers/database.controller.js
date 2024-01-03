import { MongoClient } from "mongodb";

// services
import { analyzeCollection } from "../services/analyzeSchema.service.js";

import { v4 as uuidv4 } from "uuid"; // For ES modules

let clientInstance = null; // mongo client instance, which will be reused throughout a session

export const connectMongoDB = async (req, res) => {
  console.log("data arriving in the backend", req.body);

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

  /*
//  the code below is not needed because mongo URL is nevver false.
  if (!mongoURL) {
    return res.status(400).json({ error: "MongoDB URL is required" });
  }
  */

  const uuid = uuidv4();
  try {
    if (!clientInstance) {
      clientInstance = new MongoClient(mongoURL, { useUnifiedTopology: true });
      await clientInstance.connect();
      console.log("clientInstance is connected");
    }
    /*
    This would be the place to set a cookie for the session token, 
    though it is not needed for the current implementation. because were using JWT on the clientside.
    To keep session tokens on the server generally consumes more resources than using JWTs and makes an application harder to scale.


    // Once connected, you can set your cookie and send a response
    res.cookie("sessionToken", uuid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // should be true in production if using HTTPS
      maxAge: 3600000, // Cookie expiry time in milliseconds
    });

    console.log("Cookie is set");

    */
    res.json({ message: "Successfully connected to MongoDB" });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res
      .status(500)
      .json({ error: "Failed to connect to MongoDB", details: error.message });
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

    console.log("collections in backend analyzeDatabase", collections);

    const schema = await analyzeCollection(collections, true);

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

export const getDocumentCountForKey = async (req, res) => {
  const { database, collection, key } = req.params;
  const client = getClientInstance();

  try {
    const db = client.db(database);
    const count = await db
      .collection(collection)
      .countDocuments({ [key]: { $exists: true } });
    res.json({ key, count });
  } catch (error) {
    console.error("Error counting documents for key:", error);
    res.status(500).json({ error: "Failed to count documents for key" });
  }
};

export const getUniqueValuesForKey = async (req, res) => {
  const { database, collection, key } = req.params;
  const client = getClientInstance();

  try {
    const db = client.db(database);
    const aggregation = await db
      .collection(collection)
      .aggregate([
        { $match: { [key]: { $exists: true } } },
        { $group: { _id: `$${key}`, count: { $sum: 1 } } },
        { $sort: { count: -1 } }, // Optional: sort by count
      ])
      .toArray();

    res.json(aggregation);
  } catch (error) {
    console.error("Error getting unique values for key:", error);
    res.status(500).json({ error: "Failed to get unique values for key" });
  }
};

export const getValueDistributionForKey = async (req, res) => {
  const { database, collection, key } = req.params;
  const client = getClientInstance();

  try {
    const db = client.db(database);
    const totalDocuments = await db.collection(collection).countDocuments();

    const aggregation = await db
      .collection(collection)
      .aggregate([
        { $match: { [key]: { $exists: true } } },
        { $group: { _id: `$${key}`, count: { $sum: 1 } } },
        {
          $project: {
            _id: 0,
            value: "$_id",
            percentage: {
              $multiply: [{ $divide: ["$count", totalDocuments] }, 100],
            },
          },
        },
      ])
      .toArray();

    res.json(aggregation);
  } catch (error) {
    console.error("Error getting value distribution for key:", error);
    res.status(500).json({ error: "Failed to get value distribution for key" });
  }
};
