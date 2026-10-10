"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { signOut } from "next-auth/react"

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function Dashboard({user, initialType = "post"}) {
  const [kind, setKind] = useState(initialType === "story" ? "story" : "post");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");
  const contentRef = useRef("");

  const isStory = kind === "story";
  const prefix = isStory ? "story" : "post";

  // Must be memoized: a new object identity makes SimpleMDE tear down
  // and recreate the editor on every render (i.e. every keystroke).
  const mdeOptions = useMemo(
    () => ({
      spellChecker: false,
      placeholder: isStory ? "Write your story in Markdown..." : "Write your post in Markdown...",
    }),
    [isStory]
  );

  const switchKind = (next) => {
    // persist current draft under its own prefix before switching
    localStorage.setItem(`${prefix}-title`, title);
    if (isStory) localStorage.setItem("story-description", description);
    else localStorage.setItem("post-category", category);
    localStorage.setItem(`${prefix}-content`, contentRef.current);

    const np = next === "story" ? "story" : "post";
    setKind(np);
    setMessage("");
    setTitle(localStorage.getItem(`${np}-title`) || "");
    if (np === "story") setDescription(localStorage.getItem("story-description") || "");
    else setCategory(localStorage.getItem("post-category") || "");
    const saved = localStorage.getItem(`${np}-content`) || "";
    contentRef.current = saved;
    setContent(saved);
  };

  // ✅ Load saved draft on mount
  useEffect(() => {
    const np = initialType === "story" ? "story" : "post";
    setTitle(localStorage.getItem(`${np}-title`) || "");
    if (np === "story") setDescription(localStorage.getItem("story-description") || "");
    else setCategory(localStorage.getItem("post-category") || "");
    const saved = localStorage.getItem(`${np}-content`) || "";
    contentRef.current = saved;
    setContent(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Save draft whenever fields change
  useEffect(() => {
    localStorage.setItem(`${prefix}-title`, title);
  }, [title, prefix]);

  useEffect(() => {
    if (isStory) localStorage.setItem("story-description", description);
    else localStorage.setItem("post-category", category);
  }, [description, category, isStory]);

  const handleContentChange = (value) => {
    contentRef.current = value;
    setContent(value);
    localStorage.setItem(`${prefix}-content`, value);
  };

  const clearDraft = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    contentRef.current = "";
    setContent("");
    localStorage.removeItem(`${prefix}-title`);
    localStorage.removeItem(`${prefix}-content`);
    localStorage.removeItem(isStory ? "story-description" : "post-category");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = isStory ? "/api/stories" : "/api/posts";
      const payload = isStory
        ? { title, description, content: contentRef.current }
        : { title, category, content: contentRef.current };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
    if (res.ok) {
        alert(isStory ? "✅ Story created successfully!" : "✅ Post created successfully!");
        clearDraft();
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
    <div className="flex flex-col space-y-2 mx-auto max-w-3xl rounded-lg bg-[#1a1c1e] p-8 shadow">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Create a New {isStory ? "Story" : "Post"}, {user.name}!</h1>
        <button
          onClick={() => window.history.back()}
          className="rounded-md bg-[#7b735c] px-4 py-2 text-white hover:bg-[#6d6553] transition-colors"
        >
          Back
        </button>
      </div>

      {/* Post / Story switcher */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => switchKind("post")}
          className={`flex-1 rounded-md px-4 py-2 text-sm transition-colors ${!isStory ? "bg-[#7b735c] text-white" : "bg-[#2b2d2f] text-gray-400 hover:text-white"}`}
        >
          POST
        </button>
        <button
          type="button"
          onClick={() => switchKind("story")}
          className={`flex-1 rounded-md px-4 py-2 text-sm transition-colors ${isStory ? "bg-[#7b735c] text-white" : "bg-[#2b2d2f] text-gray-400 hover:text-white"}`}
        >
          STORY
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-b border-[#7b735c] px-4 py-2 text-white focus:outline-none"
        />

        {isStory ? (
          <textarea
            placeholder="Short description (shown on the stories list)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full border-b border-[#7b735c] px-4 py-2 text-white focus:outline-none resize-y"
          />
        ) : (
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-b border-[#7b735c] px-4 py-2 text-white focus:outline-none"
          />
        )}

        <div className="[&_.EasyMDEContainer]:bg-[#1a1c1e] [&_.CodeMirror]:bg-[#1a1c1e] [&_.CodeMirror]:text-white [&_.CodeMirror]:border-[#7b735c] [&_.editor-toolbar]:bg-[#1a1c1e] [&_.editor-toolbar]:border-[#7b735c] [&_.editor-toolbar_button]:text-[#7b735c] [&_.editor-toolbar_button:hover]:bg-[#7b735c] [&_.editor-toolbar_button:hover]:text-[#1a1c1e] [&_.CodeMirror-cursor]:border-white">
          <SimpleMDE
            key={kind}
            value={content}
            onChange={handleContentChange}
            options={mdeOptions}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#7b735c] px-4 py-2 text-white transition-colors hover:bg-[#6d6553] disabled:opacity-50"
        >
          {loading ? "Saving..." : isStory ? "Create Story" : "Create Post"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-white">{message}</p>}
    </div>
  );
}
