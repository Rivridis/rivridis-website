"use client";

import Navbar from "../components/navbar";

export default function LandingPage() {
return (
    <div className="flex flex-col min-h-screen text-white justify-center items-center">
        {/* Navbar */}
        <div className="w-full fixed top-0 left-0 z-50">
            <Navbar />
        </div>
    </div>
)
}
