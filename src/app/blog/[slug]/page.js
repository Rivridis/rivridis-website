import clientPromise from "@/lib/mongo.js";
import Navbar from "src/app/components/navbar.js"
import Footer from "src/app/components/footer.js"
import Link from "next/link";

export default async function PostPage({ params }) {
  const { slug } = await params;
   const decodedSlug = decodeURIComponent(slug);
  const client = await clientPromise;
  const db = client.db("blog-data");

  const posts = await db.collection("blogs").find({ category: decodedSlug }).toArray();

  if (!posts || posts.length === 0) {
    return <p>No posts found in this category</p>;
  }

  return (
    <main className="flex flex-col min-h-screen bg-[#889cb8]">
       <div className="w-full fixed top-0 left-0 z-50">
              <Navbar />
        </div>
     <div className="w-full max-w-6xl mx-auto pt-25 p-6 md:px-16 md:pb-16 text-[#0C1016]">
      <h1 className="text-4xl md:text-5xl mb-6">POSTS IN: {decodedSlug.toUpperCase()}</h1>
      <ul className="">
        {posts.map((post) => (
          <div key={post._id} className="border-b border-black py-6 flex justify-between items-center">
            <Link href={`/blog/${post.category}/${post.title}`} className="text-2xl hover:underline">{post.title}</Link>
            <span className="text-lg">{String(post.date.toDateString())}</span>

          </div>
        ))}
      </ul>
     </div>
    </main>
  );
}
