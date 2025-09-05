"use client";
import { useState } from "react";
import SHA256 from "crypto-js/sha256";

export default function ProtectedPage() {
  const [input, setInput] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const PASSWORD_HASH = "515b168eba6513753671389b36b732f3e7e90b66421e89e64acf307cbe24187d";

  const handleSubmit = (e) => {
    e.preventDefault();
    const hash = SHA256(input).toString();

    if (hash === PASSWORD_HASH) {
      setAuthorized(true);
    } else {
      alert("Wrong password. Try again.");
    }
  };

  if (!authorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#ede9e5]">
        <div className="bg-[#f7f5f2] p-6 rounded-lg shadow w-80">
          <h2 className="text-lg font-semibold mb-4 text-center">Enter Password</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Password"
              className="border border-[#d6ccc2] rounded px-3 py-2  focus:outline-none focus:ring focus:ring-[#b6ad90]"
            />
            <button
              type="submit"
              className="bg-[#b6ad90] text-white rounded py-2 hover:bg-[#a69c7c] transition"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[#ede9e5]">
      <h1 className="text-2xl font-bold mb-4">Holy timewaste 🚀</h1>
      <p>You are useless. Touch grass.</p>
    </div>
  );
}
