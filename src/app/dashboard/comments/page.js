import clientPromise from "@/lib/mongo.js";
import Link from "next/link";
import Navbar from "src/app/components/navbar.js";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deleteComment(formData) {
  "use server";

  const id = formData.get("id");
  if (!id || !ObjectId.isValid(String(id))) return;

  const client = await clientPromise;
  const db = client.db("blog-data");
  const commentId = new ObjectId(String(id));

  await db.collection("comments").deleteOne({ _id: commentId });
  await db
    .collection("blogs")
    .updateMany({}, { $pull: { comments: { _id: commentId } } });

  revalidatePath("/dashboard/comments");
  revalidatePath("/dashboard");
}

// Escape user input so it can be used safely in a $regex query
function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default async function CommentsPage({ searchParams }) {
  const sp = await searchParams;
  const q = String(sp?.q || "").trim();
  const postFilter = String(sp?.post || "").trim();

  const client = await clientPromise;
  const db = client.db("blog-data");

  // Posts that have at least one comment (for the dropdown)
  const postOptions = await db
    .collection("comments")
    .aggregate([
      {
        $group: {
          _id: "$postId",
          postTitle: { $first: "$postTitle" },
          postCategory: { $first: "$postCategory" },
          count: { $sum: 1 },
        },
      },
      { $sort: { postTitle: 1 } },
    ])
    .toArray();

  const totalCount = await db.collection("comments").countDocuments();

  // Build filtered query
  const filter = {};
  if (postFilter) filter.postId = postFilter;
  if (q) {
    const rx = { $regex: escapeRegex(q), $options: "i" };
    filter.$or = [{ name: rx }, { message: rx }, { postTitle: rx }];
  }

  const comments = await db
    .collection("comments")
    .find(filter)
    .sort({ date: -1 })
    .limit(500)
    .toArray();

  const isFiltering = Boolean(q || postFilter);
  const activePostTitle =
    postOptions.find((p) => String(p._id) === postFilter)?.postTitle || "";

  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white py-8 px-8 md:px-30">
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar text="DASHBOARD" />
      </div>

      <div className="pt-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl tracking-wide font-semibold">
            {isFiltering
              ? `Comments (${comments.length} of ${totalCount})`
              : `All Comments (${totalCount})`}
          </h2>
          <div className="mt-0">
            <Link href="/dashboard">
              <button className="bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition">
                BACK
              </button>
            </Link>
          </div>
        </div>

        {/* Filter / search bar (GET form — no client JS needed) */}
        <form
          method="get"
          className="bg-[#1a1c1e] rounded-md p-4 mb-4 flex flex-col md:flex-row gap-3 md:items-center"
        >
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search name, text or post title..."
            className="flex-1 px-3 py-2 rounded-md bg-[#2b2d2f] text-white text-sm border border-[#7b735c] focus:outline-none placeholder:text-gray-500"
          />
          <select
            name="post"
            defaultValue={postFilter}
            className="px-3 py-2 rounded-md bg-[#2b2d2f] text-white text-sm border border-[#7b735c] focus:outline-none md:max-w-xs"
          >
            <option value="">All posts</option>
            {postOptions.map((p) => (
              <option key={String(p._id)} value={String(p._id)}>
                {(p.postTitle || "Untitled").slice(0, 60)} ({p.count})
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition"
            >
              FILTER
            </button>
            {isFiltering && (
              <Link href="/dashboard/comments">
                <button
                  type="button"
                  className="bg-transparent border border-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#2c2e30] transition"
                >
                  CLEAR
                </button>
              </Link>
            )}
          </div>
        </form>

        {isFiltering && (
          <p className="text-sm text-white/70 mb-4">
            {comments.length === 0
              ? "No comments match your filters."
              : `Showing ${comments.length} match${comments.length === 1 ? "" : "es"}`}
            {postFilter && activePostTitle ? ` in "${activePostTitle}"` : ""}
            {q ? ` for "${q}"` : ""}
          </p>
        )}

        <div className="bg-[#1a1c1e] rounded-md p-6">
          {comments.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              {isFiltering ? "No matching comments." : "No comments yet."}
            </div>
          ) : (
            <ul className="space-y-4">
              {comments.map((c, idx) => {
                const id = c._id?.toString() || idx;
                const date = c.date
                  ? new Date(c.date).toLocaleString()
                  : "Unknown date";
                const categorySegment = encodeURIComponent(
                  String(c.postCategory || "uncategorized")
                );
                const titleSegment = encodeURIComponent(String(c.postTitle || ""));
                return (
                  <li
                    key={id}
                    className="bg-[#2b2d2f] p-5 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">
                        {c.name}{" "}
                        <span className="text-gray-500 font-normal">• {date}</span>
                      </p>
                      <p className="text-gray-300 text-sm mt-2 whitespace-pre-wrap break-words">
                        {c.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Post:{" "}
                        {c.postTitle ? (
                          <Link
                            href={`/blog/${categorySegment}/${titleSegment}`}
                            className="hover:underline text-gray-400"
                          >
                            {c.postTitle}
                          </Link>
                        ) : (
                          "Unknown"
                        )}
                      </p>
                    </div>
                    <div className="items-center">
                    <form action={deleteComment}>
                      <input type="hidden" name="id" value={id} />
                      <button
                        type="submit"
                        className="bg-[#1a1c1e] border border-[#7b735c] text-xs px-3 py-2 rounded-md hover:bg-[#2c2e30] transition shrink-0"
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
