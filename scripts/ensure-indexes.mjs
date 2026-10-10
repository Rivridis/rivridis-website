// One-time index setup for the dashboard queries.
// Run with:  node scripts/ensure-indexes.mjs
// Requires MONGODB_URI in .env.local (same as the app).
// Safe to re-run: createIndex is idempotent.
import { MongoClient } from "mongodb";
import fs from "node:fs";

function loadEnv() {
  try {
    const text = fs.readFileSync(".env.local", "utf8");
    for (const line of text.split("\n")) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {}
}

loadEnv();

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI missing (.env.local)");

const client = new MongoClient(uri);
await client.connect();

const plan = [
  ["blog-data", "blogs", { createdAt: -1 }],
  ["story-data", "stories", { date: -1 }],
  ["blog-data", "comments", { date: -1 }],
  ["blog-data", "comments", { postId: 1 }],
  ["story-data", "storyComments", { date: -1 }],
  ["story-data", "storyComments", { storyId: 1 }],
];

for (const [db, coll, keys] of plan) {
  const name = await client.db(db).collection(coll).createIndex(keys);
  console.log(`OK ${db}.${coll} ${JSON.stringify(keys)} -> ${name}`);
}

await client.close();
console.log("done");
