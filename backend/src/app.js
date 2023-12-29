import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

// Setup CORS options
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN, // Your frontend's origin
  credentials: true, // Allow cookies to be sent
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));

export default app;
