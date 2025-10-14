"use client"
import Link from 'next/link';
import { useState } from 'react';


export default function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <nav className="bg-[#ede9e5] px-6 py-2 flex items-center justify-between mx-auto mt-0 md:mt-4 max-w-[700px] md:rounded-md md:px-8 border border-black">
            <Link href="/" className="font-bold text-md text-[#0C1016] md:mb-0 mb-0">
                RIVRIDIS
            </Link>
            <div className="flex-1 flex justify-center">
                <div className="flex gap-4 hidden md:flex">
                    <Link href="/"><span className="text-[#0C1016] cursor-pointer text-sm">HOME</span></Link>
                    <Link href="/products"><span className="text-[#0C1016] cursor-pointer text-sm">PRODUCTS</span></Link>

                    <div className="relative">
                        <button
                            type="button"
                            className="text-[#0C1016] cursor-pointer text-sm focus:outline-none"
                            onClick={() => setDropdownOpen((open) => !open)}
                            // ref={dropdownRef}
                        >
                            RESOURCES
                        </button>
                        {dropdownOpen && (
                            <div className="absolute left-0 mt-3 w-32 bg-zinc-800 rounded-md shadow-lg z-10">
                                <Link href="/blog"><div className="px-4 py-2 hover:bg-zinc-700 text-[#ede9e5] cursor-pointer rounded-md">BLOG</div></Link>
                                <Link href="/stories"><div className="px-4 py-2 hover:bg-zinc-700 text-[#ede9e5] cursor-pointer rounded-md">STORIES</div></Link>
                            </div>
                        )}
                    </div>
            
                    <Link href="/contact"><span className="text-[#0C1016] cursor-pointer text-sm">CONTACT</span></Link>
                </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
                <button>
                    <Link href="/links"><span className="text-[#0C1016] cursor-pointer text-sm">LINKS</span></Link>
                </button>
            </div>
        </nav>
    );
}
    