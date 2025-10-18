import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("blog-data"); // Replace with your DB name
    const postsCollection = db.collection("blogs");

    const body = await req.json();
    const { title, category, content } = body;

    if (!title || !category || !content) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const post = {
      title,
      category,
      content,
      date: new Date(),
    };

    const result = await postsCollection.insertOne(post);

    return NextResponse.json({ message: "Post created successfully", postId: result.insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
