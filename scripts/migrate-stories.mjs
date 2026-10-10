// Temp migration: reset `story-data.stories` and push the markdown story.
// Run: node scripts/migrate-stories.mjs
// Re-runnable (deletes all docs, inserts from public/*.md).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MongoClient } from "mongodb";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// Load MONGODB_URI from .env.local (plain node has no Next env loader)
const envFile = fs.readFileSync(path.join(root, ".env.local"), "utf8");
const match = envFile.match(/^MONGODB_URI=(.*)$/m);
if (!match) throw new Error("MONGODB_URI not found in .env.local");
let uri = match[1].trim().replace(/^["']|["']$/g, "");
uri = uri.split(/\s+#/)[0].trim();

const stories = [
  {
    slug: "nightshroud-echoes",
    title: "Echoes of the Nightshroud",
    description:
      "Post apocalyptic fiction story. Updated weekly, monthly, or whenever I feel like it.",
    author: "Rivridis",
    date: new Date("2025-02-20"),
    mdFile: "nightshroud-echoes.md",
  },
];

const client = new MongoClient(uri);
try {
  // Fail fast BEFORE touching the DB — source .md files must exist locally.
  for (const s of stories) {
    if (!fs.existsSync(path.join(root, "public", s.mdFile))) {
      throw new Error(
        `Missing source file public/${s.mdFile}. Aborting — DB untouched.`
      );
    }
  }

  await client.connect();
  const col = client.db("story-data").collection("stories");

  const before = await col.countDocuments();
  await col.deleteMany({});
  console.log(`deleted ${before} old document(s)`);

  for (const s of stories) {
    const content = fs.readFileSync(path.join(root, "public", s.mdFile), "utf8");
    const res = await col.insertOne({
      slug: s.slug,
      title: s.title,
      description: s.description,
      author: s.author,
      content,
      date: s.date,
      updatedAt: new Date(),
      comments: [],
    });
    console.log(`${s.slug}: inserted ${res.insertedId} chars=${content.length}`);
  }

  console.log(`story-data.stories total: ${await col.countDocuments()}`);
} finally {
  await client.close();
}
