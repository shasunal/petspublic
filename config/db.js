const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://pets:pets@cluster1.b1z5vym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

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


module.exports = { connectToDatabase, getDb };
