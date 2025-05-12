
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://pets:pets@cluster1.b1z5vym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
    try {
      await client.connect();
      console.log("Connected to MongoDB!");
      return client.db("petsData"); 
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  }
  
  module.exports = connectToDatabase;
