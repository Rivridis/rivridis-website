import clientPromise from "@/lib/mongo.js";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from 'next/navigation'
import Navbar from "src/app/components/navbar.js"


export async function updatePost(formData) {
    "use server";

    const id = formData.get("id");
    const title = formData.get("title");
    const category = formData.get("category");
    const content = formData.get("content");

    const client = await clientPromise;
    const db = client.db("blog-data");


    await db.collection("blogs").updateOne(
        { _id: new ObjectId(String(id)) },
        {
        $set: {
            title,
            category,
            content,
            updatedAt: new Date(),
        },
        }
    );
    revalidatePath("/dashboard/view");
    redirect('/dashboard/view', RedirectType.replace)
  }

export default async function EditPostPage({ params }) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db("blog-data");
  const post = await db.collection("blogs").findOne({ _id: new ObjectId(id) });

  if (!post) {
    return (
      <div className="min-h-screen bg-[#8a9bb2] text-white font-sans flex items-center justify-center">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white font-sans pt-20 px-8 pb-8 md:px-30">
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar text="DASHBOARD" />
      </div>

      <div className="pt-8 max-w-4xl mx-auto bg-[#1a1c1e] p-6 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl tracking-wide font-semibold">Edit Post</h2>
          <Link href="/dashboard/view">
            <button className="bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition">
              BACK
            </button>
          </Link>
        </div>

        {/* ✅ Form handled on server */}
        <form action={updatePost} className="flex flex-col gap-6">
          <input type="hidden" name="id" value={id} />

          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={post.title}
              required
              className="w-full px-3 py-2 rounded-md bg-[#2b2d2f] text-white border border-[#7b735c] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Category</label>
            <input
              type="text"
              name="category"
              defaultValue={post.category || ""}
              className="w-full px-3 py-2 rounded-md bg-[#2b2d2f] text-white border border-[#7b735c] focus:outline-none"
            />
          </div>

          {/* Post content div added below */}
          <div>
            <label className="block text-sm mb-1">Content</label>
            <textarea
              name="content"
              defaultValue={post.content || ""}
              rows={10}
              className="w-full px-3 py-2 rounded-md bg-[#2b2d2f] text-white border border-[#7b735c] focus:outline-none resize-vertical"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7b735c] text-white px-4 py-2 rounded-md hover:bg-[#6d6553] transition text-center"
          >
            UPDATE POST
          </button>
        </form>
      </div>
    </div>
  );
}
