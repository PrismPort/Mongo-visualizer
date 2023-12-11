import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

// middleware
import { mongoURL } from "./middleware/mongoURL.middleware.js";

// controller
import {
  analyzeDatabase,
  queryDatabase,
  getCollections,
  getDatabases,
  connectMongoDB,
  getDocumentsFromCollection,
} from "./controllers/database.controller.js";
import os from "os";

import listContainers from "./middleware/dockerAPI.middleware.js";

const PORT = process.env.EXPRESS_PORT;
const DOCKER = process.env.DOCKER;

// experiments with mongodb local service autodetect

const networkInterfaces = os.networkInterfaces();
const localhostIP = networkInterfaces.lo
  ? networkInterfaces.lo[0].address
  : "127.0.0.1";

// starting express

if (!PORT) {
  console.error("Express port is not defined");
  process.exit(1);
}

app.listen(parseInt(PORT), "0.0.0.0", () => {
  console.log(`Server is running at ${PORT}`);
});

// cors settings only for development
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to the Visual MongoDB Backend!");
});

// TODO: rename to just "/query"
app.get("/query-databases", mongoURL, getDatabases);

app.get("/query/:database", mongoURL, getCollections);

app.get(
  "/query/:database/:collection/:limit",
  mongoURL,
  getDocumentsFromCollection
);

app.get("/analyze/:database/:collection", mongoURL, analyzeDatabase);

app.post("/query/:database/:collection", mongoURL, queryDatabase);

app.post("/connect-to-mongodb", (req, res) => connectMongoDB(req, res, DOCKER));

// experiments with docker api

app.get("/api/containers", async (req, res) => {
  try {
    const containers = await listContainers();
    res.json(containers); // Send the containers as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// path execution
app.post("/run-command", (req, res) => {
  const containerName = req.body.containerName; // Get container name from request body

  exec(
    `docker inspect ${containerName} -f '{{json .NetworkSettings.Networks}}'`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res
          .status(500)
          .send(`Error executing command: ${error.message}`);
      }
      res.send(`Command output: ${stdout}`);
    }
  );
});
