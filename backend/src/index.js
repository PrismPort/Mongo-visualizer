import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

// controller
import {
  analyzeDatabase,
  queryDatabase,
  getCollections,
  getDatabases,
  connectMongoDB,
  getDocumentsFromCollection,
  logout,
} from "./controllers/database.controller.js";

import {
  listDockerContainers,
  getContainerNetworkSettings,
} from "./controllers/docker.controller.js";

import os from "os";

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
app.get("/query-databases", getDatabases);

app.get("/query/:database", getCollections);

app.get("/query/:database/:collection/:limit", getDocumentsFromCollection);

app.get("/analyze/:database/:collection", analyzeDatabase);

app.post("/query/:database/:collection", queryDatabase);

app.post("/connect-to-mongodb", (req, res) => connectMongoDB(req, res, DOCKER));

app.get("/disconnect-mongodb", logout);

// experiments with docker api
// TODO: routes should be deactivated if 'DOCKER = false' in .env
app.get("/docker/list-containers", (res) => listDockerContainers(res));

// path execution
// get docker container network settings
app.post("/docker/run-command", (req, res) =>
  getContainerNetworkSettings(req, res)
);
