const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://brady:hDdEUYPRbTVjqAfp@kwik-leads.uppmu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function initializeDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db("kwik-leads");
    const collection = db.collection("leads");

    // Insert a sample document to ensure the collection is created
    const result = await collection.insertOne({ test: "Sample document" });
    console.log(`Inserted document with _id: ${result.insertedId}`);

    console.log("Database and collection initialized successfully");
  } catch (e) {
    console.error("Error initializing database:", e);
  } finally {
    await client.close();
  }
}

initializeDatabase();