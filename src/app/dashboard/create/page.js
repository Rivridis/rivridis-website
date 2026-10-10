import { auth } from "@/auth";
import Create from "./create";
import Navbar from "src/app/components/navbar.js"


export default async function DashboardPage({ searchParams }) {
  const session = await auth();
  const sp = await searchParams;
  const initialType = sp?.type === "story" ? "story" : "post";


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
      <div className="pt-20 px-10 pb-5"><Create user={user} initialType={initialType} /></div>
    </div>
  );
}
