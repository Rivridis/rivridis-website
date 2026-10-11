import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "untitled";
}

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("story-data");
    const storiesCollection = db.collection("stories");

    const body = await req.json();
    const { title, description, author, content, slug } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Unique slug from title (or explicit slug)
    let base = slugify(slug || title);
    let candidate = base;
    let n = 2;
    while (await storiesCollection.findOne({ slug: candidate })) {
      candidate = `${base}-${n++}`;
    }

    const story = {
      slug: candidate,
      title,
      description: description || "",
      author: author || "Rivridis",
      content,
      comments: [],
      date: new Date(),
      updatedAt: new Date(),
    };

    const result = await storiesCollection.insertOne(story);

    revalidatePath("/stories");

    return NextResponse.json(
      { message: "Story created successfully", storyId: result.insertedId, slug: candidate }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 });
  }
}
