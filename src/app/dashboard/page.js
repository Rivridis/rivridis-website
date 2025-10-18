import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Dashboard from "./Dashboard";
import Navbar from "src/app/components/navbar.js"

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  // Only allow access for the specific Gmail address
  if (session.user?.email !== "rivridis@gmail.com") {
    redirect("/#"); // Or handle as needed, e.g., show an error page
  }

  // Pass only simple serializable props
  const user = {
    name: session.user?.name || "User",
    email: session.user?.email || "",
  };

  return (
    <div className="min-h-screen bg-[#889cb8]">
       <div className="w-full fixed top-0 left-0 z-50">
          <Navbar />
        </div>
      <div className="pt-20 px-10 pb-5"><Dashboard user={user} /></div>
    </div>
  );
}
