import { auth } from "@/auth";
import { signIn } from "@/auth"
import { FcGoogle } from "react-icons/fc" // Google icon
import Navbar from "src/app/components/navbar.js"
import { redirect, RedirectType } from 'next/navigation'

export default async function SignIn() {

  const session = await auth();
  if (session) {
    // Already logged in → redirect to dashboard
    redirect("/dashboard", RedirectType.replace);
  }
  return (
    <div className="flex min-h-screen items-center justify-center  bg-[#889cb8] px-4"
    >
      <div className="w-full fixed top-0 left-0 z-50">
          <Navbar />
      </div>
       <section id ="top" className="text-center max-w-3xl  min-h-screen items-center justify-center flex flex-col"> 
          <h1 className="text-5xl md:text-7xl text-[#0C1016]">Blog Admin Login</h1>
          <p className="mt-4 text-center text-md text-[#0C1016]">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-[#e2d5a6] hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="text-[#e2d5a6] hover:underline">
            Privacy Policy
          </a>
          </p>
          <form
          action={async () => {
            "use server"
            await signIn("google",{ redirectTo: "/dashboard" })
          }}
          className="mt-6 space-y-4"
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm transition hover:bg-gray-100"
          >
            <FcGoogle size={24} />
            Sign in with Google
          </button>
        </form>
        </section>

    </div>
  )
}
