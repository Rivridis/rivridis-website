// lib/mongodbClientPromise.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("Please add MONGODB_URI to .env.local");

const options = {
  maxPoolSize: 10,
  minPoolSize: 1,
  serverSelectionTimeoutMS: 5000,
};

// Cache the client across HMR reloads (dev) and reuse the pool on
// serverless lambdas (prod). Without this every cold start opens a fresh
// pool, exhausts Atlas connections, and adds ~1s+ to each dashboard hit.
let clientPromise;
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
