"use client";

import { useEffect, useState } from "react";

export default function Comments({ storyId, storySlug, storyTitle }) {
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
      const res = await fetch(`/api/story-comments?storyId=${encodeURIComponent(storyId)}`);
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
    if (storyId) fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

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
      const res = await fetch("/api/story-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId, storySlug, storyTitle, name, message }),
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
    <section className="w-full max-w-6xl mx-auto px-4 pb-16 text-[#2d2a26]">
      <div className="border-t border-[#2d2a26]/20 pt-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Comments ({comments.length})
        </h2>
        <p className="text-sm text-[#2d2a26]/70 mb-6">
          Join the discussion. No account needed, just respect the code of conduct.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/60 border border-[#2d2a26]/10 rounded-md p-4 md:p-6 mb-8"
        >
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="story-comment-name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="story-comment-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                placeholder="Your name"
                className="w-full rounded-md border border-[#2d2a26]/20 bg-white px-3 py-2 text-sm outline-none focus:border-[#2d2a26]/50"
              />
            </div>
            <div>
              <label htmlFor="story-comment-message" className="block text-sm font-medium mb-1">
                Comment
              </label>
              <textarea
                id="story-comment-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={2000}
                rows={4}
                placeholder="Share your thoughts..."
                className="w-full rounded-md border border-[#2d2a26]/20 bg-white px-3 py-2 text-sm outline-none focus:border-[#2d2a26]/50 resize-y"
              />
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
          {success && <p className="mt-3 text-sm text-green-700">{success}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 bg-[#2d2a26] text-white text-sm px-5 py-2 rounded-md hover:bg-[#4a4239] transition disabled:opacity-50"
          >
            {submitting ? "POSTING..." : "POST COMMENT"}
          </button>
        </form>

        {/* List */}
        {loading ? (
          <p className="text-sm text-[#2d2a26]/60">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-[#2d2a26]/60">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li
                key={String(c._id)}
                className="bg-white/60 border border-[#2d2a26]/10 rounded-md p-4"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-sm">{c.name}</span>
                  <span className="text-xs text-[#2d2a26]/60">
                    {c.date
                      ? new Date(c.date).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap break-words">{c.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
