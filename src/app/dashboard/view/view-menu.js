"use client";

import { useState } from "react";
import Link from "next/link";

export default function ViewMenu({ showStories }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="More actions"
        className="bg-[#1a1c1e] text-white text-lg leading-none px-3 py-2 rounded-md hover:bg-[#2c2e30] transition"
      >
        …
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default bg-transparent"
          />
          <div className="absolute right-0 top-full mt-2 w-40 z-20 bg-[#2b2d2f] border border-white/10 rounded-md p-1 shadow-lg flex flex-col">
            <Link
              href="/dashboard/view"
              onClick={() => setOpen(false)}
              className={`text-sm px-4 py-2 rounded-md transition text-left ${
                !showStories
                  ? "bg-[#7b735c] text-white"
                  : "text-gray-300 hover:bg-[#3a3d3f] hover:text-white"
              }`}
            >
              POSTS
            </Link>
            <Link
              href="/dashboard/view?type=stories"
              onClick={() => setOpen(false)}
              className={`text-sm px-4 py-2 rounded-md transition text-left ${
                showStories
                  ? "bg-[#7b735c] text-white"
                  : "text-gray-300 hover:bg-[#3a3d3f] hover:text-white"
              }`}
            >
              STORIES
            </Link>
            <Link
              href="/dashboard/create"
              onClick={() => setOpen(false)}
              className="text-sm px-4 py-2 rounded-md transition text-left text-gray-300 hover:bg-[#3a3d3f] hover:text-white"
            >
              CREATE
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
