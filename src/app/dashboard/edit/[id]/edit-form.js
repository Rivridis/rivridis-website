"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function EditForm({ post, updatePost }) {
  const isStory = post.type === "story";
  const [title, setTitle] = useState(post.title || "");
  const [category, setCategory] = useState(post.category || "");
  const [description, setDescription] = useState(post.description || "");
  const [content, setContent] = useState(post.content || "");

  const options = useMemo(
    () => ({
      spellChecker: false,
      placeholder: isStory ? "Edit your story in Markdown..." : "Edit your post in Markdown...",
    }),
    [isStory]
  );

  return (
    <form action={updatePost} className="flex flex-col gap-6">
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="type" value={post.type} />
      {/* Sync SimpleMDE state into the server action payload */}
      <input type="hidden" name="content" value={content} />

      <div>
        <label className="block text-sm mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-md bg-[#2b2d2f] text-white border border-[#7b735c] focus:outline-none"
        />
      </div>

      {isStory ? (
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded-md bg-[#2b2d2f] text-white border border-[#7b735c] focus:outline-none resize-y"
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-[#2b2d2f] text-white border border-[#7b735c] focus:outline-none"
          />
        </div>
      )}

      <div>
        <label className="block text-sm mb-1">Content</label>
        <div className="[&_.EasyMDEContainer]:bg-[#1a1c1e] [&_.CodeMirror]:bg-[#1a1c1e] [&_.CodeMirror]:text-white [&_.CodeMirror]:border-[#7b735c] [&_.editor-toolbar]:bg-[#1a1c1e] [&_.editor-toolbar]:border-[#7b735c] [&_.editor-toolbar_button]:text-[#7b735c] [&_.editor-toolbar_button:hover]:bg-[#7b735c] [&_.editor-toolbar_button:hover]:text-[#1a1c1e] [&_.CodeMirror-cursor]:border-white">
          <SimpleMDE value={content} onChange={setContent} options={options} />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#7b735c] text-white px-4 py-2 rounded-md hover:bg-[#6d6553] transition text-center"
      >
        UPDATE {isStory ? "STORY" : "POST"}
      </button>
    </form>
  );
}
