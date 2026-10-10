"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ShieldX, ArrowRight, LogOut } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0C1016] text-[#ede9e5] antialiased selection:bg-[#e2d5a6] selection:text-[#0C1016]">
      <div className="fixed inset-x-0 top-0 z-50">
        <Navbar />
      </div>

      <main className="flex flex-1 items-center justify-center px-6 pb-24 pt-32">
        <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-[#0C1016] px-6 py-14 text-center shadow-2xl ring-1 ring-white/10 md:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(136,156,184,0.35),transparent_70%)]" />
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#e2d5a6]/60 to-transparent" />

          <div className="relative">
            <div className="flex justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#889cb8]/20 text-[#e2d5a6] ring-1 ring-white/10">
                <ShieldX className="h-7 w-7" />
              </span>
            </div>

            <p className="mt-6 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#B6AD90]">
              <span className="h-px w-8 bg-[#B6AD90]/60" />
              403 — Restricted
              <span className="h-px w-8 bg-[#B6AD90]/60" />
            </p>

            <h1 className="mt-4 text-2xl font-normal uppercase leading-snug tracking-wide md:text-3xl">
              Access Denied
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#ede9e5]/60 md:text-base">
              You don’t have permission to view this page. This area is
              reserved for admins only.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 rounded-full bg-[#e2d5a6] px-7 py-3.5 text-sm font-medium text-[#0C1016] shadow-xl transition-colors hover:bg-[#ede9e5]"
              >
                Back to home
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-[#ede9e5] transition-colors hover:bg-white/5"
              >
                <LogOut className="h-4 w-4" />
                Switch account
              </button>
            </div>

            <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[#ede9e5]/40">
              Signed in with the wrong account?
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
