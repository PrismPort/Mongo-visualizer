require('dotenv').config();
import { count } from 'console';
import app from './app.js';
import { Request, Response, NextFunction } from 'express';
import { Db } from 'mongodb';
import { it } from 'node:test';
import { any } from 'webidl-conversions';
const { MongoClient } = require("mongodb");
const { parseSchema } = require('mongodb-schema');

const PORT = process.env.EXPRESS_PORT;
const DOCKER = process.env.DOCKER;

const os = require('os');
const networkInterfaces = os.networkInterfaces();
const localhostIP = networkInterfaces.lo ? networkInterfaces.lo[0].address : '127.0.0.1';



// starting express

if (!PORT) {
  console.error('Express port is not defined');
  process.exit(1);
}

app.listen(parseInt(PORT), '0.0.0.0', () => {
  console.log(`Server is running at ${PORT}`);
});

// cors settings only for development
app.use((req: Request, res: Response, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// extract the mongo URL through middleware
const mongoURL = async (req: Request, res: Response, next: NextFunction) => {
  const mongoURL = req.header('mongoURL');
  if (!mongoURL) {
    return res.status(400).json({ error: 'MongoDB URL is required in the request header' });
  }
  try {
    const client = new MongoClient(mongoURL, { useUnifiedTopology: true });
    await client.connect();

    // Add the client object to the req object
    req.client = client;
    next();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Failed to connect to MongoDB' });
  }
}




// mongodb connection string for static tests
/* const mongo_url = process.env.MONGO_URL;
const mongo_port = process.env.MONGO_PORT;
const database = process.env.MONGO_DB;
const uri = `mongodb://${mongo_url}:${mongo_port}`; */

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the backend!");
});

app.get('/query-databases', async (req: Request, res: Response) => {
  // const { mongoURL } = req.body; // Access the MongoDB URL from the request body
  const mongoURL = req.header('mongoURL');

  if (!mongoURL) {
    return res.status(400).json({ error: 'MongoDB URL is required in the request header' });
  }

  try {
    // Establish the MongoDB connection using the provided URL
    const client = new MongoClient(mongoURL, { useUnifiedTopology: true });
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
});

app.get('/query/:database', async (req: Request, res: Response) => {
  const mongoURL = req.header('mongoURL');
  const { database } = req.params;
  const { collection } = req.params;

  if (!mongoURL) {
    return res.status(400).json({ error: 'MongoDB URL is required in the request header' });
  }

  try {
    // Establish the MongoDB connection using the provided URL
    const client = new MongoClient(mongoURL, { useUnifiedTopology: true });
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

});

app.get('/query/:database/:collection/:limit', mongoURL, async (req: Request, res: Response) => {
  const { database } = req.params;
  const { collection } = req.params;

  try {
    const client: typeof MongoClient = req.client;

    // Access the specified collection and query data with limit
    const db: Db = client.db(database);
    const collections = await db.collection(collection).find().limit(10).toArray();

    // Close the MongoDB connection
    await client.close();

    res.json(collections);

  } catch (error) {
    console.error('Error querying data from MongoDB:', error);
    res.status(500).json({ error: 'Failed to query data from MongoDB' });
  }
});

app.get('/analyze/:database/:collection', mongoURL, async (req: Request, res: Response) => {
  const { database } = req.params;
  const { collection } = req.params;
  const client: typeof MongoClient = req.client;

  try {

    // Access the specified collection and query data with limit
    const db: Db = client.db(database);
    const collections = await db.collection(collection).find();

    const parsedSchema = await parseSchema(collections, {storeValues : false});

    interface Item { // TODO: make a model out of this
      count: number;
      type: string;
      name: string;
      probability: number;
    }

    let schema = parsedSchema.fields.map((item: Item) => ({ // TODO: this should go into controllers
      count: item.count,
      type: item.type,
      name: item.name,
      probability: item.probability
    }))

    console.log(schema);
    

    res.json(schema);

  } catch (error) {
    console.error('Error querying data from MongoDB:', error);
    res.status(500).json({ error: 'Failed to query data from MongoDB' });
  } finally {
    await client.close();
  }
})


app.post('/connect-to-mongodb', async (req: Request, res: Response) => {
  let mongoURL = null;

  // construct mongo url
  const user = req.body.name;
  const password = req.body.password;
  const port = req.body.port;
  let adress = req.body.adress;

  // Docker config for mongoDB on localhost
  if (DOCKER === "true" && (adress == "localhost" || adress == "127.0.0.1")) {
    adress = "host.docker.internal";
  }

  if (user == null || password == null) {
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
});