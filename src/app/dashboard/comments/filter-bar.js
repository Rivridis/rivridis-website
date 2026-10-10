"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FilterBar({ type, q, item, postOptions, storyOptions, isFiltering }) {
  const router = useRouter();
  const [t, setT] = useState(type);
  const [query, setQuery] = useState(q);
  const [it, setIt] = useState(item);

  const opts = t === "posts" ? postOptions : t === "stories" ? storyOptions : [];

  function push(nt, nq, nit) {
    const p = new URLSearchParams();
    if (nt && nt !== "all") p.set("type", nt);
    if (nq.trim()) p.set("q", nq.trim());
    if (nit) p.set("item", nit);
    const qs = p.toString();
    router.push(`/dashboard/comments${qs ? `?${qs}` : ""}`);
  }

  // Type change applies instantly: item list updates immediately
  // and results reload without pressing FILTER. Item resets (options changed).
  function onTypeChange(nt) {
    setT(nt);
    setIt("");
    push(nt, query, "");
  }

  function onSubmit(e) {
    e.preventDefault();
    push(t, query, it);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-[#1a1c1e] rounded-md p-4 mb-4 flex flex-col md:flex-row gap-3 md:items-center"
    >
      <select
        value={t}
        onChange={(e) => onTypeChange(e.target.value)}
        className="px-3 py-2 rounded-md bg-[#2b2d2f] text-white text-sm border border-[#7b735c] focus:outline-none"
      >
        <option value="all">All types</option>
        <option value="posts">Posts only</option>
        <option value="stories">Stories only</option>
      </select>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search name, text or title..."
        className="flex-1 px-3 py-2 rounded-md bg-[#2b2d2f] text-white text-sm border border-[#7b735c] focus:outline-none placeholder:text-gray-500"
      />
      <select
        value={it}
        onChange={(e) => setIt(e.target.value)}
        className="px-3 py-2 rounded-md bg-[#2b2d2f] text-white text-sm border border-[#7b735c] focus:outline-none w-full md:w-64 md:shrink-0 truncate"
      >
        {t === "all" ? (
          <option value="">Item Subtype</option>
        ) : (
          <>
            <option value="">{t === "posts" ? "All posts" : "All stories"}</option>
            {opts.map((p) => (
              <option key={`${p.kind}:${p.id}`} value={`${p.kind}:${p.id}`}>
                {(p.title || "Untitled").slice(0, 55)} ({p.count})
              </option>
            ))}
          </>
        )}
      </select>
      <div className="flex gap-2 shrink-0">
        <button
          type="submit"
          className="bg-[#7b735c] text-white text-sm px-4 py-2 rounded-md hover:bg-[#6d6553] transition"
        >
          FILTER
        </button>
        {isFiltering && (
          <button
            type="button"
            onClick={() => router.push("/dashboard/comments")}
            className="bg-transparent border border-[#7b735c] text-white text-sm px-4 py-2 rounded-md hover:bg-[#2c2e30] transition"
          >
            CLEAR
          </button>
        )}
      </div>
    </form>
  );
}
