import { auth } from "@/auth";
import { signIn } from "@/auth";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { KeyRound, ArrowLeft } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";

export default async function SignIn() {
  const session = await auth();
  if (session) {
    redirect("/dashboard", RedirectType.replace);
  }

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
                <KeyRound className="h-7 w-7" />
              </span>
            </div>

            <p className="mt-6 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#B6AD90]">
              <span className="h-px w-8 bg-[#B6AD90]/60" />
              Admin access
              <span className="h-px w-8 bg-[#B6AD90]/60" />
            </p>

            <h1 className="mt-4 text-2xl font-normal uppercase leading-snug tracking-wide md:text-3xl">
              Blog Admin Login
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#ede9e5]/60 md:text-base">
              Sign in with an authorized account to manage posts and stories.
            </p>

            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/dashboard" });
              }}
              className="mx-auto mt-8 max-w-xs"
            >
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-full bg-[#ede9e5] px-7 py-3.5 text-sm font-medium text-[#0C1016] shadow-xl transition-colors hover:bg-[#e2d5a6]"
              >
                <FcGoogle size={20} />
                Sign in with Google
              </button>
            </form>

            <p className="mx-auto mt-6 max-w-sm text-xs leading-relaxed text-[#ede9e5]/40">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-[#e2d5a6] hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-[#e2d5a6] hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#ede9e5]/50 transition-colors hover:text-[#e2d5a6]"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
