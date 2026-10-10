import clientPromise from "@/lib/mongo.js";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from 'next/navigation'
import Navbar from "src/app/components/navbar.js"
import EditForm from "./edit-form";


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
      <div className="min-h-screen bg-[#8a9bb2] text-white flex items-center justify-center">
        <p>Post not found.</p>
      </div>
    );
  }

  // Serialize only what the client form needs
  const serializedPost = {
    id: id,
    title: post.title || "",
    category: post.category || "",
    content: post.content || "",
  };

  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white pt-20 px-8 pb-8 md:px-30">
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

        {/* ✅ Form handled on server, editor UI handled on client */}
        <EditForm post={serializedPost} updatePost={updatePost} />
      </div>
    </div>
  );
}
