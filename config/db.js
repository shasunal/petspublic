const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // load .env variables
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("petsData");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
  }
}

function getDb() {
  return db;
}

module.exports = {
  connectToDatabase,
  getDb
};