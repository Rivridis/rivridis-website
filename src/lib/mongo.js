// lib/mongodbClientPromise.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) throw new Error("Please add MONGODB_URI to .env.local");

let client = new MongoClient(uri, options);
let clientPromise = client.connect();

export default clientPromise;
