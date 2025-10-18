"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { signOut } from "next-auth/react"

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function Dashboard({user}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const contentRef = useRef("");

  // ✅ Load saved data on mount
  useEffect(() => {
    const savedTitle = localStorage.getItem("post-title");
    const savedCategory = localStorage.getItem("post-category");
    const savedContent = localStorage.getItem("post-content");

    if (savedTitle) setTitle(savedTitle);
    if (savedCategory) setCategory(savedCategory);
    if (savedContent) contentRef.current = savedContent;
  }, []);

  // ✅ Save data whenever fields change
  useEffect(() => {
    localStorage.setItem("post-title", title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem("post-category", category);
  }, [category]);

  const handleContentChange = (value) => {
    contentRef.current = value;
    localStorage.setItem("post-content", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          content: contentRef.current,
        }),
      });

      const data = await res.json();
    if (res.ok) {
        alert("✅ Post created successfully!");
        setTitle("");
        setCategory("");
        contentRef.current = "";

        // clear localStorage on success
        localStorage.removeItem("post-title");
        localStorage.removeItem("post-category");
        localStorage.removeItem("post-content");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col space-y-2 mx-auto max-w-3xl rounded-lg bg-[#ede9e5] p-8 shadow">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Create a New Post, {user.name}!</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-b border-[#0C1016] px-4 py-2 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border-b border-[#0C1016] px-4 py-2 focus:outline-none"
        />

        <SimpleMDE
          value={contentRef.current}
          onChange={handleContentChange}
          options={{
            spellChecker: false,
            placeholder: "Write your post in Markdown...",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#0C1016] px-4 py-2 text-white transition-colors hover:bg-blue-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create Post"}
        </button>
      </form>
      <button
          onClick={() => signOut()}
          className="rounded-md bg-[#0C1016] px-4 py-2 text-white hover:bg-red-800 transition-colors"
        >
          Logout
        </button>

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  );
}
