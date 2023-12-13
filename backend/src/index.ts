require('dotenv').config();
import { count } from 'console';
import app from './app.js';
import { Request, Response, NextFunction } from 'express';
import { Db } from 'mongodb';
import { it } from 'node:test';
import { any } from 'webidl-conversions';
import { type } from 'os';
const { MongoClient } = require("mongodb");
const { parseSchema } = require('mongodb-schema');

// middleware
import { mongoURL } from './middleware/mongoURL.middleware.js';


// controller
import {
  analyzeDatabase,
  queryDatabase,
  getCollections,
  getDatabases,
  connectMongoDB,
  getDocumentsFromCollection
}
  from './controllers/database.controller.js';




const PORT = process.env.EXPRESS_PORT;
const DOCKER = process.env.DOCKER;


// experiments with mongodb local service autodetect
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


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Visual MongoDB Backend!");
});


// TODO: rename to just "/query"
app.get('/query-databases', mongoURL, getDatabases);

app.get('/query/:database', mongoURL, getCollections);

app.get('/query/:database/:collection/:limit', mongoURL, getDocumentsFromCollection);

app.get('/analyze/:database/:collection', mongoURL, analyzeDatabase);

app.post('/query/:database/:collection', mongoURL, queryDatabase);

app.post('/connect-to-mongodb', (req: Request, res: Response) => connectMongoDB(req, res, DOCKER));