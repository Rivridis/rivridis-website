import clientPromise from "@/lib/mongo.js";
import Link from "next/link";
import Navbar from "src/app/components/navbar.js"
import Footer from "src/app/components/footer.js"

export default async function BlogPage() {
  const client = await clientPromise;
  const db = client.db("blog-data");

  const posts = await db
    .collection("blogs")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const categories = [...new Set(posts.map(post => post.category))];

  return (
    <main className="flex flex-col min-h-screen bg-[#889cb8]">

      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar />
      </div>
      
      <div className="w-full max-w-6xl mx-auto pt-25 p-6 md:px-16 md:pb-16 text-[#0C1016]">
        <h1 className="text-4xl md:text-5xl mb-6">BLOG - CATEGORIES</h1>
        {categories.length === 0 && <p>No categories yet.</p>}

        {categories.map((category) => (
          <div key={category} className="border-b border-black py-6">
            <Link href={`/blog/${category}`} className="text-2xl hover:underline">
              {category}
            </Link>

          </div>
      ))}
      </div>
      <Footer />
    </main>
  );
}
