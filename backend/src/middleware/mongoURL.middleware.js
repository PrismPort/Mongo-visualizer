import { MongoClient } from "mongodb";
// extracts the mongoURL and credentials from a client request and provides it to further routes
export const mongoURL = async (req, res, next) => {
  const mongoURL = req.header("mongoURL");
  if (!mongoURL) {
    return res
      .status(400)
      .json({ error: "MongoDB URL is required in the request header" });
  }
  try {
    const client = new MongoClient(mongoURL, { useUnifiedTopology: true });
    await client.connect();

    // Add the client object to the req object
    req.client = client;
    next();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ error: "Failed to connect to MongoDB" });
  }
};
