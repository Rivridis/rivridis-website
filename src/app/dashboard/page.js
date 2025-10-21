import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Dashboard from "./Dashboard";
import Navbar from "src/app/components/navbar.js"
import { signOut } from "@/auth.ts"

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  // Only allow access for the specific Gmail address
  if (session.user?.email !== "rivridis@gmail.com") {
    return (
      <div className="min-h-screen bg-[#889cb8] flex items-center justify-center p-5">
        <div className="flex flex-col items-center justify-center bg-white p-5 rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4">Access Denied</h2>
          <p className="mb-4">You do not have permission to access this page.</p>
          <form className="items-center justify-center" action={async () => {
          "use server"
          await signOut()
      }}
    >
        <button type="submit" className="hover:underline items-center justify-center">Sign Out</button>
        </form>
        </div>
      </div>
    );
  }

  // Pass only simple serializable props
  const user = {
    name: session.user?.name || "User",
    email: session.user?.email || "",
  };

  return (
    <div className="min-h-screen bg-[#889cb8]">
       <div className="w-full fixed top-0 left-0 z-50">
          <Navbar text="DASHBOARD" />
        </div>
      <div className="pt-20 px-10 pb-5"><Dashboard user={user} /></div>
    </div>
  );
}
