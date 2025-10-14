import clientPromise from "@/lib/mongo.js";
import Navbar from "src/app/components/navbar.js"
import Footer from "src/app/components/footer.js"
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

export default async function PostPage({ params }) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);
  const client = await clientPromise;
  const db = client.db("blog-data");

  const posts = await db.collection("blogs").find({ title: decodedTitle }).toArray();

  if (!posts || posts.length === 0) {
    return <p>No posts found with this title</p>;
  }

return (
    <main className="flex flex-col min-h-screen bg-[#ede9e5]">
         <div className="w-full fixed top-0 left-0 z-50">
                        <Navbar />
            </div>
     <div className="w-full max-w-6xl mx-auto pt-25 p-6 md:px-16 md:pb-16 text-[#0C1016]">
        <ul className="flex flex-col items-center justify-center">
            {posts.map((post) => (
                <div key={post._id} className="w-full py-6 prose prose-xl prose-neutral">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            ))}
        </ul>
     </div>
    </main>
);
}
