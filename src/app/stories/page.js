import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen bg-[#ede9e5]">
            <div className="w-full fixed top-0 left-0 z-50">
                <Navbar />
            </div>
            <section className="w-full max-w-6xl mx-auto pt-25 px-16 pb-16 text-[#ede9e5]"> 
                <h1 className="text-4xl md:text-5xl mb-6 text-[#2d2a26]">STORIES</h1>
                <div className="space-y-1">
                    {[
                        {
                            title: "Echoes of the Nightshroud",
                            description: "Post apocalyptic fiction story. Updated weekly, monthly, or whenever I feel like it.",
                            author: "Rivridis",
                            date: "February 20, 2025",
                            link: "/stories/nightshroud-echoes"
                        },
                        {
                            title: "Starstruck",
                            description: "Fantasy romance story. Completed. Disclaimer: I was forced to write this. I am not responsible for the contents of this story.",
                            author: "Rivridis",
                            date: "May 6, 2024",
                            link: "/stories/starstruck"
                        }
                    ].map((post, idx) => (
                        <a
                            key={idx}
                            href={post.link}
                            className="block bg-zinc-800 rounded-lg shadow p-12 hover:bg-[#2d2a26] transition"
                        >
                            <h2 className="text-2xl text-[#b6ad90]  font-bold mb-2">{post.title}</h2>
                            <p className="mb-4 text-gray-300">{post.description}</p>
                            <div className="text-sm text-gray-400">
                                By <span className="font-medium">{post.author}</span> &middot; {post.date}
                            </div>
                        </a>
                    ))}
                </div>
            </section>
            <Footer />
        </main>
    );
}
