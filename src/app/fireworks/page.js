"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function LandingPage() {
return (
    <div className="flex flex-col bg-gray-600">
        {/* Navbar */}
        <div className="w-full fixed top-0 left-0 z-50">
            <Navbar />
        </div>

        {/* HERO */}
        <main className="min-h-screen text-white flex-1 flex items-center justify-center px-6 pt-20 pb-12">
            <section className="w-full max-w-3xl text-center">
                {/* Decorative logo + title block */}
                <div className="flex flex-col items-center gap-4">
                    <img
                        src="/fireworkslogo.png"
                        alt="Project Fireworks logo"
                        className="w-20 h-20 sm:w-35 sm:h-35 object-contain drop-shadow-lg"
                    />

                    <h1 className="text-3xl text-[#eeaa6d] sm:text-5xl md:text-6xl  font-extrabold leading-tight tracking-tight">
                        PROJECT FIREWORKS
                    </h1>

                    <p className="max-w-xl text-sm sm:text-base text-opacity-90 mt-2">
                        A semi-realistic Shinkai inspired social world, where friends can hangout, play and share memories.
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center">
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center rounded-md px-5 py-3 bg-black bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 border border-white/10 shadow-lg transition"
                        aria-label="Join the Project Fireworks waitlist"
                    >
                        <span className="font-semibold">Join Waitlist</span>
                    </a>

                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center rounded-md px-5 py-3 bg-white text-[#956784] font-semibold hover:opacity-95 shadow transition"
                        aria-label="Watch trailer"
                    >
                        Watch Trailer
                    </a>
                </div>

                {/* small feature row */}
                <div className="mt-6 flex flex-wrap gap-2 items-center justify-center text-xs sm:text-sm">
                    <span className="px-3 py-1 bg-white/10 rounded-full">Multiplayer</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full">Exploration</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full">Hangout</span>
                </div>
            </section>
        </main>
        <Footer />
    </div>
)
}
