"use client";

import { signOut } from "next-auth/react";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        🚫 Access Denied
      </h1>
      <p className="mb-6 text-gray-700">
        You don’t have permission to view this page.
      </p>
      <button
        onClick={() => signOut({ callbackUrl: "/signin" })}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
