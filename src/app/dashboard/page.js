import Navbar from "src/app/components/navbar.js"
import clientPromise from "@/lib/mongo.js";
import { auth } from "@/auth";
import { signOut } from "@/auth.ts"
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }


  const client = await clientPromise;
  const db = client.db("blog-data");

  const posts = await db
    .collection("blogs")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();


  if (session.user?.email !== "rivridis@gmail.com" && session.user?.email !== "keerthikapugal@gmail.com") {
    return (
      <div className="min-h-screen bg-[#889cb8] flex items-center justify-center p-5">
        <div className="flex flex-col items-center justify-center bg-white p-5 rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4">Access Denied</h2>
          <p className="mb-4">You do not have permission to access this page.</p>
          <form className="items-center justify-center" action={async () => {
          "use server"
          await signOut()
      }}
    >
        <button type="submit" className="hover:underline items-center justify-center">Sign Out</button>
        </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white font-sans py-8 px-8 md:px-30">
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12">
        {/* Top Row */}
        <div className="lg:col-span-2 bg-[#7b735c] rounded-md flex items-center px-8 py-10">
          <h2 className="text-xl tracking-wide">Hello, {session.user?.name}!</h2>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/dashboard/create">
              <button className="bg-[#1a1c1e] text-sm px-4 py-2 rounded-md hover:bg-[#2c2e30] transition">
                <span className="hidden sm:inline">CREATE POST</span>
                <span className="sm:hidden">POST</span>
              </button>
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="bg-[#1a1c1e] text-sm px-4 py-2 rounded-md hover:bg-[#2c2e30] transition"
              >
                <span className="hidden sm:inline">LOGOUT</span>
                <span className="sm:hidden">EXIT</span>
              </button>
            </form>
          </div>
        </div>

        <div className="bg-[#1a1c1e] rounded-md flex items-center justify-center px-6 py-6">
          <p className="text-lg tracking-wide">TOTAL POSTS: {posts.length}</p>
        </div>

        {/* Bottom Row */}
        <div className="bg-[#1a1c1e] rounded-md lg:col-span-2 flex flex-col relative p-6">
          <h3 className="text-lg mt-1 tracking-wide">RECENT POSTS</h3>
          <button className="absolute top-6 right-6 bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition">
            <span className="hidden sm:inline">EDIT POSTS</span>
            <span className="sm:hidden">VIEW</span>
          </button>

          <div className="flex-1 mt-2 text-gray-400 text-sm">
            {posts.length === 0 ? (
              <div className="flex items-center justify-center h-24">
                No recent posts to show.
              </div>
            ) : (
              <ul className="space-y-3 mt-4">
                {posts.slice(0, 4).map((post, idx) => {
                  const id = post._id ? post._id.toString() : idx;
                  const title = post.title || "Untitled";
                  const excerpt =
                    post.excerpt ||
                    (post.content
                      ? `${String(post.content).slice(0, 120)}${String(post.content).length > 120 ? "..." : ""}`
                      : "No excerpt");
                  return (
                    <li
                      key={id}
                      className="bg-[#2b2d2f] p-4 rounded-md flex flex-col sm:flex-row sm:items-center gap-2"
                    >
                      <div className="flex-1">
                        <a href={`/posts/${post.slug || id}`} className="text-white text-md font-semibold hover:underline">
                          {title}
                        </a>
                        <p className="text-gray-300 text-sm mt-1">{excerpt}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-[#1a1c1e] rounded-md flex flex-col p-6 relative">
          <h3 className="text-lg mt-1 tracking-wide">COMMENTS</h3>
          <button className="absolute top-6 right-6 bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition">
            <span className="hidden sm:inline">VIEW COMMENTS</span>
            <span className="sm:hidden">VIEW</span>
          </button>
          <div className="flex-1 mt-16 text-gray-400 text-sm flex items-center justify-center">
            No comments yet.
          </div>
        </div>
      </div>
    </div>
  );
}
