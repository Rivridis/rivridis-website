"use client";

import { useState } from "react";
import Link from "next/link";

export default function RecentTabsMenu({ showStories, viewHref }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop / tablet: inline tabs + edit button */}
      <div className="hidden sm:flex items-center gap-2 ml-2">
        <Link href="/dashboard">
          <button
            className={`text-sm px-4 py-2 rounded-md transition ${
              !showStories
                ? "bg-[#7b735c] text-white"
                : "bg-[#2b2d2f] text-gray-400 hover:text-white"
            }`}
          >
            POSTS
          </button>
        </Link>
        <Link href="/dashboard?tab=stories">
          <button
            className={`text-sm px-4 py-2 rounded-md transition ${
              showStories
                ? "bg-[#7b735c] text-white"
                : "bg-[#2b2d2f] text-gray-400 hover:text-white"
            }`}
          >
            STORIES
          </button>
        </Link>
      </div>
      <Link href={viewHref} className="hidden sm:block ml-auto">
        <button className="bg-[#7b735c] text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition">
          EDIT {showStories ? "STORIES" : "POSTS"}
        </button>
      </Link>

      {/* Mobile: "..." expand menu */}
      <div className="sm:hidden ml-auto relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="More actions"
          className="bg-[#2b2d2f] text-white text-lg leading-none px-3 py-2 rounded-md hover:bg-[#3a3d3f] transition"
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
                href="/dashboard"
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
                href="/dashboard?tab=stories"
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
                href={viewHref}
                onClick={() => setOpen(false)}
                className="text-sm px-4 py-2 rounded-md transition text-left text-gray-300 hover:bg-[#3a3d3f] hover:text-white"
              >
                VIEW
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
