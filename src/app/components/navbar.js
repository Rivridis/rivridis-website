"use client"
import Link from 'next/link';
import { useState } from 'react';


export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <nav className="bg-zinc-800 px-6 py-2 flex items-center justify-between mx-auto mt-0 md:mt-4 max-w-[700px] md:rounded-md md:px-8">
            <div className="font-bold text-md text-[#ede9e5] md:mb-0 mb-0">
                RIVRIDIS
            </div>
            <div className="flex-1 flex justify-center">
                <div className="flex gap-4 hidden md:flex">
                    <Link href="/"><span className="text-[#ede9e5] cursor-pointer text-sm">Home</span></Link>
                    <Link href="/services"><span className="text-[#ede9e5] cursor-pointer text-sm">Services</span></Link>

                    <div className="relative">
                        <button
                            type="button"
                            className="text-[#ede9e5] cursor-pointer text-sm focus:outline-none"
                            onClick={() => setDropdownOpen((open) => !open)}
                            // ref={dropdownRef}
                        >
                            Resources
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-0 mt-3 w-32 bg-zinc-800 rounded-md shadow-lg z-10">
                                <Link href="#"><div className="px-4 py-2 hover:bg-zinc-700 text-[#ede9e5] cursor-pointer rounded-md">Blog</div></Link>
                                <Link href="#"><div className="px-4 py-2 hover:bg-zinc-700 text-[#ede9e5] cursor-pointer rounded-md">Stories</div></Link>
                                <Link href="#"><div className="px-4 py-2 hover:bg-zinc-700 text-[#ede9e5] cursor-pointer rounded-md">Music</div></Link>
                            </div>
                        )}
                    </div>
            
                    <Link href="/contact"><span className="text-[#ede9e5] cursor-pointer text-sm">Contact</span></Link>
                </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
                <button>
                    <Link href="#foot"><span className="text-[#ede9e5] cursor-pointer text-sm">Links</span></Link>
                </button>
            </div>
        </nav>
    );
}
    