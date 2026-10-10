// Shown instantly while the dashboard server component fetches,
// so tab switches feel responsive even on slow connections.
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white py-8 px-8 md:px-30">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-20">
        <div className="lg:col-span-2 bg-[#7b735c] rounded-md px-8 py-10 animate-pulse">
          <div className="h-6 w-48 bg-white/20 rounded" />
        </div>
        <div className="bg-[#1a1c1e] rounded-md px-6 py-6 animate-pulse">
          <div className="h-6 w-40 bg-white/10 rounded mx-auto" />
          <div className="h-6 w-40 bg-white/10 rounded mx-auto mt-2" />
        </div>
        <div className="bg-[#1a1c1e] rounded-md lg:col-span-2 p-6 animate-pulse space-y-3">
          <div className="h-6 w-32 bg-white/10 rounded" />
          <div className="h-20 bg-[#2b2d2f] rounded-md" />
          <div className="h-20 bg-[#2b2d2f] rounded-md" />
          <div className="h-20 bg-[#2b2d2f] rounded-md" />
        </div>
        <div className="bg-[#1a1c1e] rounded-md p-6 animate-pulse space-y-3">
          <div className="h-6 w-40 bg-white/10 rounded" />
          <div className="h-14 bg-[#2b2d2f] rounded-md" />
          <div className="h-14 bg-[#2b2d2f] rounded-md" />
        </div>
      </div>
    </div>
  );
}
