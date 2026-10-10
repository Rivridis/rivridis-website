"use client";

import { useEffect, useState } from "react";

export default function Comments({ postId, postTitle, postCategory }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function fetchComments() {
    try {
      setLoading(true);
      const res = await fetch(`/api/comments?postId=${encodeURIComponent(postId)}`);
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments || []);
      }
    } catch {
      // silent fail — comments just won't show
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (postId) fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !message.trim()) {
      setError("Please enter your name and a comment.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, postTitle, postCategory, name, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to post comment.");
        return;
      }
      setName("");
      setMessage("");
      setSuccess("Comment posted!");
      await fetchComments();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="w-full mt-12 border-t border-black/20 pt-8">
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Comments ({comments.length})
      </h2>
      <p className="text-sm text-[#0C1016]/70 mb-6">
        Join the discussion. No account needed, just respect the code of conduct.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 border border-black/10 rounded-md p-4 md:p-6 mb-8"
      >
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="comment-name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="comment-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              placeholder="Your name"
              className="w-full rounded-md border border-black/20 bg-white px-3 py-2 text-sm outline-none focus:border-black/50"
            />
          </div>
          <div>
            <label htmlFor="comment-message" className="block text-sm font-medium mb-1">
              Comment
            </label>
            <textarea
              id="comment-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={2000}
              rows={4}
              placeholder="Share your thoughts..."
              className="w-full rounded-md border border-black/20 bg-white px-3 py-2 text-sm outline-none focus:border-black/50 resize-y"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        {success && <p className="mt-3 text-sm text-green-700">{success}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 bg-[#0C1016] text-white text-sm px-5 py-2 rounded-md hover:bg-[#2c2e30] transition disabled:opacity-50"
        >
          {submitting ? "POSTING..." : "POST COMMENT"}
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p className="text-sm text-[#0C1016]/60">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-[#0C1016]/60">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li
              key={String(c._id)}
              className="bg-white/60 border border-black/10 rounded-md p-4"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-semibold text-sm">{c.name}</span>
                <span className="text-xs text-[#0C1016]/60">
                  {c.date ? new Date(c.date).toLocaleString() : ""}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap break-words">{c.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
