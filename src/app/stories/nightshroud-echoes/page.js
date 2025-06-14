"use client"
import React from "react";
import Navbar from "src/app/components/navbar.js";

export default function Home() {
    const [html, setHtml] = React.useState("");

    React.useEffect(() => {
        fetch("/nightshroud-echoes.html")
            .then((res) => res.text())
            .then((data) => setHtml(data));
    }, []);

    return (
        <main className="flex flex-col min-h-screen bg-[#ede9e5]">
            <div className="w-full fixed top-0 left-0 z-50">
                <Navbar />
            </div>
             <nav className="w-full max-w-6xl mx-auto mt-24 mb-8 flex items-center justify-center gap-2 text-sm">
                <a href="/" className="text-[#2d2a26]">Home</a>
                <span className="mx-1 text-gray-400">{'>'}</span>
                <a href="/stories" className="text-[#2d2a26]">Stories</a>
                <span className="mx-1 text-gray-400">{'>'}</span>
                <span className="font-semibold text-[#2d2a26]">Nightshroud Echoes</span>
            </nav>
            
            <div>
                <section className="w-full max-w-6xl mx-auto px-4 pb-16 text-lg text-[#2d2a26]">
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </section>
            </div>
        </main>
    );
}