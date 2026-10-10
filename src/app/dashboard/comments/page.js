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

export default async function CommentsPage() {
  const client = await clientPromise;
  const db = client.db("blog-data");

  const comments = await db
    .collection("comments")
    .find({})
    .sort({ date: -1 })
    .toArray();

  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white py-8 px-8 md:px-30">
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar text="DASHBOARD" />
      </div>

      <div className="pt-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <h2 className="text-2xl tracking-wide font-semibold">
            All Comments ({comments.length})
          </h2>
          <div className="mt-4 sm:mt-0">
            <Link href="/dashboard">
              <button className="bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition">
                BACK
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-[#1a1c1e] rounded-md p-6">
          {comments.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              No comments yet.
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
