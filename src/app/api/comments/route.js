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

// GET /api/comments?postId=xxx  -> comments for one post (public)
// GET /api/comments?all=true    -> all comments (admin only)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const all = searchParams.get("all");

    const client = await clientPromise;
    const db = client.db("blog-data");
    const col = db.collection("comments");

    if (all === "true") {
      if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const comments = await col.find({}).sort({ date: -1 }).limit(500).toArray();
      return NextResponse.json({ comments });
    }

    if (!postId) {
      return NextResponse.json({ error: "postId is required" }, { status: 400 });
    }

    let comments = await col
      .find({ postId: String(postId) })
      .sort({ date: 1 })
      .limit(500)
      .toArray();

    // Fallback: support legacy / manually-added embedded `comments: []` on the blog doc
    if (comments.length === 0 && ObjectId.isValid(postId)) {
      const post = await db
        .collection("blogs")
        .findOne(
          { _id: new ObjectId(postId) },
          { projection: { title: 1, category: 1, comments: 1 } }
        );
      if (post?.comments?.length) {
        comments = post.comments.map((c) => ({
          _id: c._id ?? c.id,
          postId: String(postId),
          postTitle: post.title ?? "",
          postCategory: post.category ?? "",
          name: c.name ?? "Anonymous",
          message: c.message ?? c.text ?? "",
          date: c.date ?? c.createdAt ?? new Date(),
        }));
      }
    }

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("GET /api/comments failed:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// POST /api/comments  (open — anyone can comment)
export async function POST(req) {
  try {
    const body = await req.json();
    let { postId, postTitle, postCategory, name, message } = body;

    postId = String(postId || "").trim();
    postTitle = String(postTitle || "").trim();
    postCategory = String(postCategory || "").trim();
    name = String(name || "").trim().slice(0, 60);
    message = String(message || "").trim().slice(0, 2000);

    if (!postId || !name || !message) {
      return NextResponse.json(
        { error: "Name, comment and postId are required" },
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
    const db = client.db("blog-data");

    const doc = {
      postId,
      postTitle,
      postCategory,
      name,
      message,
      date: new Date(),
    };

    const result = await db.collection("comments").insertOne(doc);

    // Keep embedded `comments: []` field on the blog post in sync
    // (older posts were manually backfilled with `comments: []`)
    try {
      if (ObjectId.isValid(postId)) {
        await db.collection("blogs").updateOne(
          { _id: new ObjectId(postId) },
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
      console.error("Failed to sync embedded comment:", syncErr);
      // non-fatal — top-level comments collection is source of truth
    }

    return NextResponse.json(
      { message: "Comment added", commentId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/comments failed:", error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}

// DELETE /api/comments?id=xxx (admin only)
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
    const db = client.db("blog-data");
    const commentId = new ObjectId(id);
    await db.collection("comments").deleteOne({ _id: commentId });
    // Remove embedded copy from any blog post
    await db
      .collection("blogs")
      .updateMany({}, { $pull: { comments: { _id: commentId } } });

    return NextResponse.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("DELETE /api/comments failed:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
