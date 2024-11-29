const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/db-mongose";

const client = new MongoClient(uri);

async function connect() {
  try {
    if (!client.isConnected) await client.connect();
    // console.log("Connected to MongoDB");
    return client.db("minarta-arsip");
  } catch (error) {
    // console.error("Database connection failed:", error);
    throw error;
  }
}

module.exports = connect;
