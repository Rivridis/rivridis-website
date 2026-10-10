import clientPromise from "@/lib/mongo.js";
import Link from "next/link";
import Navbar from "src/app/components/navbar.js";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import FilterBar from "./filter-bar.js";

export async function deleteComment(formData) {
  "use server";

  const id = formData.get("id");
  const type = formData.get("type");
  if (!id || !ObjectId.isValid(String(id))) return;

  const client = await clientPromise;
  const commentId = new ObjectId(String(id));

  if (type === "story") {
    const db = client.db("story-data");
    await db.collection("storyComments").deleteOne({ _id: commentId });
    await db
      .collection("stories")
      .updateMany({}, { $pull: { comments: { _id: commentId } } });
  } else {
    const db = client.db("blog-data");
    await db.collection("comments").deleteOne({ _id: commentId });
    await db
      .collection("blogs")
      .updateMany({}, { $pull: { comments: { _id: commentId } } });
  }

  revalidatePath("/dashboard/comments");
  revalidatePath("/dashboard");
}

// Escape user input so it can be used safely in a $regex query
function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesSearch(c, rx) {
  return (
    rx.test(c.name || "") || rx.test(c.message || "") || rx.test(c.itemTitle || "")
  );
}

export default async function CommentsPage({ searchParams }) {
  const sp = await searchParams;
  const typeFilter = sp?.type === "posts" || sp?.type === "stories" ? sp.type : "all";
  const q = String(sp?.q || "").trim();
  const itemFilter = String(sp?.item || "").trim(); // "post:<id>" or "story:<id>"

  const showPosts = typeFilter === "all" || typeFilter === "posts";
  const showStories = typeFilter === "all" || typeFilter === "stories";

  const client = await clientPromise;
  const blogDb = client.db("blog-data");
  const storyDb = client.db("story-data");

  // Items for the dropdown — both lists go to the client filter bar so the
  // item list updates instantly when the type changes (no FILTER press).
  const [postOptionsRaw, storyOptionsRaw] = await Promise.all([
    blogDb.collection("comments").aggregate([
      { $group: { _id: "$postId", itemTitle: { $first: "$postTitle" }, count: { $sum: 1 } } },
      { $sort: { itemTitle: 1 } },
    ]).toArray(),
    storyDb.collection("storyComments").aggregate([
      { $group: { _id: "$storyId", itemTitle: { $first: "$storyTitle" }, count: { $sum: 1 } } },
      { $sort: { itemTitle: 1 } },
    ]).toArray(),
  ]);
  const postOptions = postOptionsRaw.map((p) => ({
    kind: "post",
    id: String(p._id),
    title: p.itemTitle || "Untitled",
    count: p.count,
  }));
  const storyOptions = storyOptionsRaw.map((p) => ({
    kind: "story",
    id: String(p._id),
    title: p.itemTitle || "Untitled",
    count: p.count,
  }));

  const [postCount, storyCount] = await Promise.all([
    blogDb.collection("comments").countDocuments(),
    storyDb.collection("storyComments").countDocuments(),
  ]);
  const totalCount = postCount + storyCount;

  // Fetch (capped per collection, then merge + sort)
  const [postComments, storyComments] = await Promise.all([
    showPosts
      ? blogDb.collection("comments").find({}).sort({ date: -1 }).limit(500).toArray()
      : [],
    showStories
      ? storyDb.collection("storyComments").find({}).sort({ date: -1 }).limit(500).toArray()
      : [],
  ]);

  let comments = [
    ...postComments.map((c) => ({
      ...c,
      kind: "post",
      itemTitle: c.postTitle || "",
      itemHref: `/blog/${encodeURIComponent(String(c.postCategory || "uncategorized"))}/${encodeURIComponent(String(c.postTitle || ""))}`,
    })),
    ...storyComments.map((c) => ({
      ...c,
      kind: "story",
      itemTitle: c.storyTitle || "",
      itemHref: `/stories/${encodeURIComponent(String(c.storySlug || c.storyTitle || ""))}`,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Per-item filter — only honored when its kind matches the selected type.
  // (With "All types" the item dropdown is blank, so any stale item param is ignored.)
  let effectiveItem = "";
  let activeItemTitle = "";
  if (itemFilter) {
    const [itemKind, ...rest] = itemFilter.split(":");
    const itemId = rest.join(":");
    const matchesType =
      (typeFilter === "posts" && itemKind === "post") ||
      (typeFilter === "stories" && itemKind === "story");
    if (matchesType) {
      effectiveItem = itemFilter;
      comments = comments.filter(
        (c) => c.kind === itemKind && String(c.kind === "story" ? c.storyId : c.postId) === itemId
      );
      const opts = itemKind === "story" ? storyOptions : postOptions;
      activeItemTitle = opts.find((p) => p.id === itemId)?.title || "";
    }
  }

  // Text search
  if (q) {
    const rx = new RegExp(escapeRegex(q), "i");
    comments = comments.filter((c) => matchesSearch(c, rx));
  }

  const isFiltering = Boolean(q || effectiveItem || typeFilter !== "all");

  const typeLabel =
    typeFilter === "posts" ? "posts" : typeFilter === "stories" ? "stories" : "posts and stories";

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
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <button className="bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition">
                BACK
              </button>
            </Link>
          </div>
        </div>

        {/* Filter bar — type switch applies instantly (client component) */}
        <FilterBar
          key={`${typeFilter}|${q}|${effectiveItem}`}
          type={typeFilter}
          q={q}
          item={effectiveItem}
          postOptions={postOptions}
          storyOptions={storyOptions}
          isFiltering={isFiltering}
        />

        {isFiltering && (
          <p className="text-sm text-white/70 mb-4">
            {comments.length === 0
              ? "No comments match your filters."
              : `Showing ${comments.length} match${comments.length === 1 ? "" : "es"} in ${typeLabel}`}
            {effectiveItem && activeItemTitle ? ` on "${activeItemTitle}"` : ""}
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
                const id = c._id?.toString() || `${c.kind}-${idx}`;
                const date = c.date
                  ? new Date(c.date).toLocaleString()
                  : "Unknown date";
                return (
                  <li
                    key={`${c.kind}-${id}`}
                    className="bg-[#2b2d2f] p-5 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">
                        {c.name}{" "}
                        <span className="text-gray-500 font-normal">• {date}</span>{" "}
                        <span className="text-[10px] uppercase tracking-wide text-[#7b735c]">
                          {c.kind}
                        </span>
                      </p>
                      <p className="text-gray-300 text-sm mt-2 whitespace-pre-wrap break-words">
                        {c.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {c.kind === "story" ? "Story: " : "Post: "}
                        {c.itemTitle ? (
                          <Link
                            href={c.itemHref}
                            className="hover:underline text-gray-400"
                          >
                            {c.itemTitle}
                          </Link>
                        ) : (
                          "Unknown"
                        )}
                      </p>
                    </div>
                    <div className="items-center">
                    <form action={deleteComment}>
                      <input type="hidden" name="id" value={String(c._id)} />
                      <input type="hidden" name="type" value={c.kind} />
                      <button
                        type="submit"
                        className="bg-[#1a1c1e] border border-[#7b735c] text-white text-xs px-3 py-2 rounded-md hover:bg-[#2c2e30] transition shrink-0"
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
