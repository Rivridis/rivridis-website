import clientPromise from "@/lib/mongo";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";

const ADMIN_EMAILS = ["rivridis@gmail.com"];

async function isAdmin() {
  const session = await auth();
  const email = session?.user?.email;
  return Boolean(email && ADMIN_EMAILS.includes(email));
}

// GET /api/story-comments?storyId=xxx  -> comments for one story (public)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const storyId = searchParams.get("storyId");

    if (!storyId) {
      return NextResponse.json({ error: "storyId is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("story-data");
    const col = db.collection("storyComments");

    let comments = await col
      .find({ storyId: String(storyId) })
      .sort({ date: 1 })
      .limit(500)
      .toArray();

    // Fallback: support embedded `comments: []` on the story doc
    if (comments.length === 0 && ObjectId.isValid(storyId)) {
      const story = await db
        .collection("stories")
        .findOne(
          { _id: new ObjectId(storyId) },
          { projection: { title: 1, slug: 1, comments: 1 } }
        );
      if (story?.comments?.length) {
        comments = story.comments.map((c) => ({
          _id: c._id ?? c.id,
          storyId: String(storyId),
          storySlug: story.slug ?? "",
          storyTitle: story.title ?? "",
          name: c.name ?? "Anonymous",
          message: c.message ?? c.text ?? "",
          date: c.date ?? c.createdAt ?? new Date(),
        }));
      }
    }

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("GET /api/story-comments failed:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// POST /api/story-comments  (open — anyone can comment)
export async function POST(req) {
  try {
    const body = await req.json();
    let { storyId, storySlug, storyTitle, name, message } = body;

    storyId = String(storyId || "").trim();
    storySlug = String(storySlug || "").trim();
    storyTitle = String(storyTitle || "").trim();
    name = String(name || "").trim().slice(0, 60);
    message = String(message || "").trim().slice(0, 2000);

    if (!storyId || !name || !message) {
      return NextResponse.json(
        { error: "Name, comment and storyId are required" },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json({ error: "Name is too short" }, { status: 400 });
    }

    if (message.length < 1) {
      return NextResponse.json({ error: "Comment is empty" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("story-data");

    const doc = {
      storyId,
      storySlug,
      storyTitle,
      name,
      message,
      date: new Date(),
    };

    const result = await db.collection("storyComments").insertOne(doc);

    // Keep embedded `comments: []` field on the story in sync
    try {
      if (ObjectId.isValid(storyId)) {
        await db.collection("stories").updateOne(
          { _id: new ObjectId(storyId) },
          {
            $push: {
              comments: {
                _id: result.insertedId,
                name,
                message,
                date: doc.date,
              },
            },
          }
        );
      }
    } catch (syncErr) {
      console.error("Failed to sync embedded story comment:", syncErr);
      // non-fatal — top-level storyComments collection is source of truth
    }

    return NextResponse.json(
      { message: "Comment added", commentId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/story-comments failed:", error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}

// DELETE /api/story-comments?id=xxx (admin only)
export async function DELETE(req) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Valid id is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("story-data");
    const commentId = new ObjectId(id);
    await db.collection("storyComments").deleteOne({ _id: commentId });
    // Remove embedded copy from any story
    await db
      .collection("stories")
      .updateMany({}, { $pull: { comments: { _id: commentId } } });

    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("DELETE /api/story-comments failed:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
