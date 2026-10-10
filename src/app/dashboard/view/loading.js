// Shown instantly while the view page fetches its 20-doc page.
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white py-8 px-8 md:px-30">
      <div className="pt-12 animate-pulse">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-56 bg-white/20 rounded" />
          <div className="h-9 w-24 bg-white/10 rounded ml-auto" />
        </div>
        <div className="bg-[#1a1c1e] rounded-md p-6 space-y-4">
          <div className="h-24 bg-[#2b2d2f] rounded-md" />
          <div className="h-24 bg-[#2b2d2f] rounded-md" />
          <div className="h-24 bg-[#2b2d2f] rounded-md" />
          <div className="h-24 bg-[#2b2d2f] rounded-md" />
        </div>
      </div>
    </div>
  );
}
