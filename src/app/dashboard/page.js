import Navbar from "src/app/components/navbar.js"
import clientPromise from "@/lib/mongo.js";
import { auth } from "@/auth";
import { signOut } from "@/auth.ts"
import Link from "next/link";

export default async function Dashboard({ searchParams }) {
  const session = await auth();
  const sp = await searchParams;
  const tab = sp?.tab === "stories" ? "stories" : "posts";
  const showStories = tab === "stories";

  const client = await clientPromise;
  const blogDb = client.db("blog-data");
  const storyDb = client.db("story-data");

  const posts = await blogDb
    .collection("blogs")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const stories = await storyDb
    .collection("stories")
    .find({})
    .sort({ date: -1 })
    .toArray();

  const comments = await blogDb
    .collection("comments")
    .find({})
    .sort({ date: -1 })
    .limit(5)
    .toArray();

  const totalComments = await blogDb.collection("comments").countDocuments();

  const recent = (showStories ? stories : posts).slice(0, 4);
  
  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white py-8 px-8 md:px-30">
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar text="DASHBOARD" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-12">
        {/* Top Row */}
        <div className="lg:col-span-2 bg-[#7b735c] rounded-md flex items-center px-8 py-10">
          <h2 className="text-xl tracking-wide">Hello, {session.user?.name}!</h2>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/dashboard/create">
              <button className="bg-[#1a1c1e] text-sm px-4 py-2 rounded-md hover:bg-[#2c2e30] transition">
                <span className="hidden sm:inline">CREATE</span>
                <span className="sm:hidden">+</span>
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

        <div className="bg-[#1a1c1e] rounded-md flex flex-col items-center justify-center px-6 py-6 gap-1">
          <p className="text-lg tracking-wide">TOTAL POSTS: {posts.length}</p>
          <p className="text-lg tracking-wide">TOTAL STORIES: {stories.length}</p>
        </div>

        {/* Bottom Row */}
        <div className="bg-[#1a1c1e] rounded-md lg:col-span-2 flex flex-col relative p-6">
          <div className="flex items-center gap-2 mt-1">
            <h3 className="text-lg tracking-wide">RECENT</h3>
            <div className="flex gap-2 ml-2">
              <Link href="/dashboard">
                <button className={`text-sm px-4 py-2 rounded-md transition ${!showStories ? "bg-[#7b735c] text-white" : "bg-[#2b2d2f] text-gray-400 hover:text-white"}`}>
                  POSTS
                </button>
              </Link>
              <Link href="/dashboard?tab=stories">
                <button className={`text-sm px-4 py-2 rounded-md transition ${showStories ? "bg-[#7b735c] text-white" : "bg-[#2b2d2f] text-gray-400 hover:text-white"}`}>
                  STORIES
                </button>
              </Link>
            </div>
          </div>
          <Link href={showStories ? "/dashboard/view?type=stories" : "/dashboard/view"}>
            <button className="absolute top-6 right-6 bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition">
              <span className="hidden sm:inline">EDIT {showStories ? "STORIES" : "POSTS"}</span>
              <span className="sm:hidden">VIEW</span>
            </button>
          </Link>

          <div className="flex-1 mt-2 text-gray-400 text-sm">
            {recent.length === 0 ? (
              <div className="flex items-center justify-center h-24">
                No recent {showStories ? "stories" : "posts"} to show.
              </div>
            ) : (
              <ul className="space-y-3 mt-4">
                {recent.map((item, idx) => {
                  const id = item._id ? item._id.toString() : idx;
                  const title = item.title || "Untitled";
                  const excerpt =
                    item.excerpt ||
                    item.description ||
                    (item.content
                      ? `${String(item.content).slice(0, 120)}${String(item.content).length > 120 ? "..." : ""}`
                      : "No excerpt");
                    if (showStories) {
                      return (
                      <li
                        key={id}
                        className="bg-[#2b2d2f] p-4 rounded-md flex flex-col sm:flex-row sm:items-center gap-2"
                      >
                        <div className="flex-1">
                        <Link
                          href={`/stories/${encodeURIComponent(String(item.slug || id))}`}
                          className="text-white text-md font-semibold hover:underline"
                        >
                          {title}
                        </Link>
                        <p className="text-gray-300 text-sm mt-1">{excerpt}</p>
                        </div>
                        <Link href={`/dashboard/edit/${id}?type=story`}>
                          <button className="bg-[#7b735c] text-white text-xs px-3 py-2 rounded-md hover:bg-[#6d6553] transition shrink-0">
                            EDIT
                          </button>
                        </Link>
                      </li>
                      );
                    }
                    const categorySegment = encodeURIComponent(String(item.category || "uncategorized"));
                    const titleSegment = encodeURIComponent(String(item.title || item.slug || id));
                    return (
                    <li
                      key={id}
                      className="bg-[#2b2d2f] p-4 rounded-md flex flex-col sm:flex-row sm:items-center gap-2"
                    >
                      <div className="flex-1">
                      <Link
                        href={`/blog/${categorySegment}/${titleSegment}`}
                        className="text-white text-md font-semibold hover:underline"
                      >
                        {title}
                      </Link>
                      <p className="text-gray-300 text-sm mt-1">{excerpt}</p>
                      </div>
                      <Link href={`/dashboard/edit/${id}?type=post`}>
                        <button className="bg-[#7b735c] text-white text-xs px-3 py-2 rounded-md hover:bg-[#6d6553] transition shrink-0">
                          EDIT
                        </button>
                      </Link>
                    </li>
                    );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-[#1a1c1e] rounded-md flex flex-col p-6 relative">
          <h3 className="text-lg mt-1 tracking-wide">COMMENTS ({totalComments})</h3>
          <Link href="/dashboard/comments">
            <button className="absolute top-6 right-6 bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition">
              <span className="hidden sm:inline">VIEW COMMENTS</span>
              <span className="sm:hidden">VIEW</span>
            </button>
          </Link>
          <div className="flex-1 mt-4 text-gray-400 text-sm">
            {comments.length === 0 ? (
              <div className="flex items-center justify-center h-24">
                No comments yet.
              </div>
            ) : (
              <ul className="space-y-3 mt-2">
                {comments.map((c, idx) => (
                  <li
                    key={c._id?.toString() || idx}
                    className="bg-[#2b2d2f] p-3 rounded-md"
                  >
                    <p className="text-white text-sm font-semibold">
                      {c.name}{" "}
                      <span className="text-gray-500 font-normal text-xs">
                        • {c.postTitle || "a post"}
                      </span>
                    </p>
                    <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                      {String(c.message).slice(0, 120)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
