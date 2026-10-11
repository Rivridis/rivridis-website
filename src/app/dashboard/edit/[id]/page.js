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
    const type = formData.get("type");
    const title = formData.get("title");
    const category = formData.get("category");
    const description = formData.get("description");
    const content = formData.get("content");

    const client = await clientPromise;

    if (type === "story") {
      const db = client.db("story-data");
      await db.collection("stories").updateOne(
          { _id: new ObjectId(String(id)) },
          {
          $set: {
              title,
              description,
              content,
              updatedAt: new Date(),
          },
          }
      );
      revalidatePath("/dashboard/view");
      revalidatePath("/stories");
      redirect('/dashboard/view?type=stories', RedirectType.replace)
    }

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
    revalidatePath("/blog");
    redirect('/dashboard/view', RedirectType.replace)
  }

export default async function EditPostPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const isStory = sp?.type === "story";

  const client = await clientPromise;
  const post = isStory
    ? await client.db("story-data").collection("stories").findOne({ _id: new ObjectId(id) })
    : await client.db("blog-data").collection("blogs").findOne({ _id: new ObjectId(id) });

  if (!post) {
    return (
      <div className="min-h-screen bg-[#8a9bb2] text-white flex items-center justify-center">
        <p>{isStory ? "Story" : "Post"} not found.</p>
      </div>
    );
  }

  // Serialize only what the client form needs
  const serializedPost = {
    id: id,
    type: isStory ? "story" : "post",
    title: post.title || "",
    category: post.category || "",
    description: post.description || "",
    content: post.content || "",
  };

  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white pt-20 px-8 pb-8 md:px-30">
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar text="DASHBOARD" />
      </div>

      <div className="pt-8 max-w-4xl mx-auto bg-[#1a1c1e] p-6 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl tracking-wide font-semibold">Edit {isStory ? "Story" : "Post"}</h2>
          <Link href={isStory ? "/dashboard/view?type=stories" : "/dashboard/view"}>
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
