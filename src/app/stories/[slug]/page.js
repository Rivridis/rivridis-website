import Navbar from "src/app/components/navbar.js";
import Footer from "src/app/components/footer.js";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import clientPromise from "@/lib/mongo.js";
import Comments from "./comments.js";

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const client = await clientPromise;
  const story = await client
    .db("story-data")
    .collection("stories")
    .findOne({ slug: decodedSlug });

  if (!story) {
    return (
      <main className="flex flex-col min-h-screen bg-[#ede9e5]">
        <div className="w-full fixed top-0 left-0 z-50">
          <Navbar />
        </div>
        <div className="w-full max-w-6xl mx-auto mt-24 px-4 pb-16 text-[#2d2a26]">
          <p>Story not found.</p>
          <Link href="/stories" className="underline">
            Back to stories
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-[#ede9e5]">
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar />
      </div>
      <nav className="w-full max-w-6xl mx-auto mt-24 mb-8 flex items-center justify-center gap-2 text-sm">
        <a href="/" className="text-[#2d2a26]">
          Home
        </a>
        <span className="mx-1 text-gray-400">{">"}</span>
        <a href="/stories" className="text-[#2d2a26]">
          Stories
        </a>
        <span className="mx-1 text-gray-400">{">"}</span>
        <span className="font-semibold text-[#2d2a26]">{story.title}</span>
      </nav>
      <div>
        <section className="w-full max-w-6xl mx-auto px-4 pb-16 text-lg text-[#2d2a26]">
          <div className="prose prose-xl prose-neutral max-w-none">
            <ReactMarkdown>{story.content}</ReactMarkdown>
          </div>
        </section>
      </div>
      <Comments
        storyId={story._id.toString()}
        storySlug={story.slug || decodedSlug}
        storyTitle={story.title || ""}
      />
    </main>
  );
}
