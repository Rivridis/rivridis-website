import clientPromise from "@/lib/mongo.js";
import Link from "next/link";
import Navbar from "src/app/components/navbar.js"
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";


export async function deletePost(formData) {
  "use server";

  const id = formData.get("id");
  if (!id) return;

  const client = await clientPromise;
  const db = client.db("blog-data");

  await db.collection("blogs").deleteOne({ _id: new ObjectId(String(id)) });

  // Refresh this page after delete
  revalidatePath("/dashboard/posts");
}



// Server Component (runs on the server)
export default async function PostsPage() {

  // Connect to MongoDB
  const client = await clientPromise;
  const db = client.db("blog-data");

  // Fetch all posts, newest first
  const posts = await db
    .collection("blogs")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white py-8 px-8 md:px-30">
      {/* Navbar */}
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar text="DASHBOARD" />
      </div>

      <div className="pt-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <h2 className="text-2xl tracking-wide font-semibold">
            All Posts ({posts.length})
          </h2>
          <div className="mt-4 sm:mt-0 flex items-center gap-2">
            <Link href="/dashboard/create">
              <button className="bg-[#1a1c1e] text-sm px-4 py-2 rounded-md hover:bg-[#2c2e30] transition">
                CREATE POST
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition">
                BACK
              </button>
            </Link>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-[#1a1c1e] rounded-md p-6">
          {posts.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              No posts available.
            </div>
          ) : (
            <ul className="space-y-4">
              {posts.map((post, idx) => {
                const id = post._id?.toString() || idx;
                const title = post.title || "Untitled";
                const excerpt =
                  post.excerpt ||
                  (post.content
                    ? `${String(post.content).slice(0, 160)}${
                        String(post.content).length > 160 ? "..." : ""
                      }`
                    : "No excerpt");

                const categorySegment = encodeURIComponent(
                  String(post.category || "uncategorized")
                );
                const titleSegment = encodeURIComponent(
                  String(post.title || post.slug || id)
                );

                const date = post.date
                  ? new Date(post.date).toLocaleDateString()
                  : "Unknown date";

                return (
                  <li
                    key={id}
                    className="bg-[#2b2d2f] p-5 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <Link
                        href={`/blog/${categorySegment}/${titleSegment}`}
                        className="text-white text-md font-semibold hover:underline"
                      >
                        {title}
                      </Link>
                      <p className="text-gray-300 text-sm mt-1">{excerpt}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Category: {post.category || "Uncategorized"} • {date}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/edit/${id}`}>
                        <button className="bg-[#7b735c] text-xs px-3 py-2 rounded-md hover:bg-[#6d6553] transition">
                          EDIT
                        </button>
                      </Link>
                      {/* Example placeholder delete action */}
                       <form action={deletePost}>
                        <input type="hidden" name="id" value={id} />
                        <button
                          type="submit"
                          className="bg-[#1a1c1e] border border-[#7b735c] text-xs px-3 py-2 rounded-md hover:bg-[#2c2e30] transition"
                        >
                          DELETE
                        </button>
                      </form>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
