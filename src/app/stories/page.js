import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import clientPromise from "@/lib/mongo.js";

export default async function Home() {
  const client = await clientPromise;
  const docs = await client
    .db("story-data")
    .collection("stories")
    .find({})
    .sort({ date: -1 })
    .toArray();

  const fmt = (v) =>
    v
      ? new Date(v).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  const posts = docs.map((d) => {
    const updated =
      d.updatedAt && d.date && new Date(d.updatedAt).getTime() - new Date(d.date).getTime() > 60_000
        ? fmt(d.updatedAt)
        : "";
    return {
      title: d.title,
      description: d.description || "",
      author: d.author || "Rivridis",
      date: fmt(d.date),
      updated,
      link: `/stories/${d.slug}`,
    };
  });

  return (
    <main className="flex flex-col min-h-screen bg-[#889cb8]">
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar />
      </div>
      <section className="w-full max-w-6xl mx-auto pt-25 px-16 pb-16 text-[#ede9e5]">
        <h1 className="text-4xl md:text-5xl mb-6 text-[#0C1016]">STORIES</h1>
        <div className="space-y-1">
          {posts.length === 0 ? (
            <p className="text-[#0C1016]">No stories yet.</p>
          ) : (
          posts.map((post, idx) => (
            <a
              key={idx}
              href={post.link}
              className="block bg-[#0C1016] rounded-lg shadow p-12 hover:bg-[#2d2a26] transition"
            >
              <h2 className="text-2xl text-[#b6ad90]  font-bold mb-2">{post.title}</h2>
              <p className="mb-4 text-gray-300">{post.description}</p>
              <div className="text-sm text-gray-400">
                By <span className="font-medium">{post.author}</span> &middot; {post.date}
                {post.updated ? ` · Updated ${post.updated}` : ""}
              </div>
            </a>
          ))
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
