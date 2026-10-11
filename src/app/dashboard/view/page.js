import clientPromise from "@/lib/mongo.js";
import Link from "next/link";
import Navbar from "src/app/components/navbar.js"
import ViewMenu from "./view-menu.js";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";


export async function deletePost(formData) {
  "use server";

  const id = formData.get("id");
  const type = formData.get("type");
  if (!id) return;

  const client = await clientPromise;

  if (type === "story") {
    const db = client.db("story-data");
    await db.collection("stories").deleteOne({ _id: new ObjectId(String(id)) });
    await db.collection("storyComments").deleteMany({ storyId: String(id) });
    revalidatePath("/stories");
  } else {
    const db = client.db("blog-data");
    await db.collection("blogs").deleteOne({ _id: new ObjectId(String(id)) });
    await db.collection("comments").deleteMany({ postId: String(id) });
    revalidatePath("/blog");
  }

  // Refresh this page after delete
  revalidatePath("/dashboard/view");
}



// Server Component (runs on the server)
const PAGE_SIZE = 20;

export default async function PostsPage({ searchParams }) {
  const sp = await searchParams;
  const showStories = sp?.type === "stories";
  const page = Math.max(1, parseInt(String(sp?.page ?? "1"), 10) || 1);

  // Connect to MongoDB
  const client = await clientPromise;

  // Perf: old code pulled the ENTIRE collection (full `content` bodies +
  // embedded `comments` arrays) on every tab switch. Now: one indexed
  // count + one 20-doc page, fetched in parallel. `comments: 0` drops the
  // potentially huge embedded comments array from the transfer.
  const coll = showStories
    ? client.db("story-data").collection("stories")
    : client.db("blog-data").collection("blogs");
  const sort = showStories ? { date: -1 } : { createdAt: -1 };

  const [total, posts] = await Promise.all([
    coll.countDocuments({}),
    coll
      .find({}, { projection: { comments: 0 } })
      .sort(sort)
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .toArray(),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const typeQs = showStories ? "?type=stories&" : "?";
  const pageHref = (p) => `/dashboard/view${typeQs}page=${p}`;

  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white py-8 px-8 md:px-30">
      {/* Navbar */}
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar text="DASHBOARD" />
      </div>

      <div className="pt-12">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-xl sm:text-2xl tracking-wide font-semibold truncate">
            {showStories ? `All Stories (${total})` : `All Posts (${total})`}
          </h2>
          {/* Desktop: inline tabs */}
          <div className="hidden sm:flex gap-2 shrink-0">
            <Link href="/dashboard/view">
              <button className={`text-sm px-4 py-2 rounded-md transition ${!showStories ? "bg-[#7b735c] text-white" : "bg-[#1a1c1e] text-gray-400 hover:text-white"}`}>
                POSTS
              </button>
            </Link>
            <Link href="/dashboard/view?type=stories">
              <button className={`text-sm px-4 py-2 rounded-md transition ${showStories ? "bg-[#7b735c] text-white" : "bg-[#1a1c1e] text-gray-400 hover:text-white"}`}>
                STORIES
              </button>
            </Link>
          </div>
          {/* Desktop: inline actions */}
          <div className="hidden sm:flex items-center gap-2 ml-auto">
            <Link href="/dashboard/create">
              <button className="bg-[#1a1c1e] text-sm px-4 py-2 rounded-md hover:bg-[#2c2e30] transition">
                CREATE
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition">
                BACK
              </button>
            </Link>
          </div>
          {/* Mobile: BACK directly + ... for POSTS/STORIES/CREATE */}
          <div className="flex sm:hidden items-center gap-2 ml-auto shrink-0">
            <Link href="/dashboard">
              <button className="bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition">
                BACK
              </button>
            </Link>
            <ViewMenu showStories={showStories} />
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-[#1a1c1e] rounded-md p-6">
          {posts.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              No {showStories ? "stories" : "posts"} available.
            </div>
          ) : (
            <ul className="space-y-4">
              {posts.map((post, idx) => {
                const id = post._id?.toString() || idx;
                const title = post.title || "Untitled";
                const excerpt =
                  post.excerpt ||
                  post.description ||
                  (post.content
                    ? `${String(post.content).slice(0, 160)}${
                        String(post.content).length > 160 ? "..." : ""
                      }`
                    : "No excerpt");

                const viewHref = showStories
                  ? `/stories/${encodeURIComponent(String(post.slug || id))}`
                  : `/blog/${encodeURIComponent(String(post.category || "uncategorized"))}/${encodeURIComponent(String(post.title || post.slug || id))}`;

                const date = post.date
                  ? new Date(post.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "Unknown date";

                return (
                  <li
                    key={id}
                    className="bg-[#2b2d2f] p-5 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <Link
                        href={viewHref}
                        className="text-white text-md font-semibold hover:underline"
                      >
                        {title}
                      </Link>
                      <p className="text-gray-300 text-sm mt-1">{excerpt}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {showStories ? `${post.slug || "—"}` : `Category: ${post.category || "Uncategorized"}`} • {date}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/edit/${id}?type=${showStories ? "story" : "post"}`}>
                        <button className="bg-[#7b735c] text-white text-xs px-3 py-2 rounded-md hover:bg-[#6d6553] transition">
                          EDIT
                        </button>
                      </Link>
                      {/* Example placeholder delete action */}
                       <form action={deletePost}>
                        <input type="hidden" name="id" value={id} />
                        <input type="hidden" name="type" value={showStories ? "story" : "post"} />
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

        {/* Pagination — keeps each page to 20 docs instead of the whole collection */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            {safePage > 1 ? (
              <Link href={pageHref(safePage - 1)}>
                <button className="bg-[#1a1c1e] text-sm px-4 py-2 rounded-md hover:bg-[#2c2e30] transition">
                  PREV
                </button>
              </Link>
            ) : (
              <button disabled className="bg-[#1a1c1e] text-sm px-4 py-2 rounded-md opacity-40 cursor-not-allowed">
                PREV
              </button>
            )}
            <span className="text-sm text-white/70">
              Page {safePage} of {totalPages}
            </span>
            {safePage < totalPages ? (
              <Link href={pageHref(safePage + 1)}>
                <button className="bg-[#1a1c1e] text-sm px-4 py-2 rounded-md hover:bg-[#2c2e30] transition">
                  NEXT
                </button>
              </Link>
            ) : (
              <button disabled className="bg-[#1a1c1e] text-sm px-4 py-2 rounded-md opacity-40 cursor-not-allowed">
                NEXT
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
