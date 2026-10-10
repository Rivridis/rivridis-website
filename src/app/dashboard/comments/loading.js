// Mirrors dashboard/comments/page.js layout:
// header row (title + BACK), filter bar, comment cards.
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white py-8 px-8 md:px-30">
      <div className="pt-12 animate-pulse">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="h-8 w-56 bg-white/20 rounded" />
          <div className="h-9 w-20 bg-[#7b735c]/50 rounded-md" />
        </div>
        <div className="h-12 bg-[#1a1c1e] rounded-md mb-4" />
        <div className="bg-[#1a1c1e] rounded-md p-6 space-y-4">
          <div className="h-24 bg-[#2b2d2f] rounded-md" />
          <div className="h-24 bg-[#2b2d2f] rounded-md" />
          <div className="h-24 bg-[#2b2d2f] rounded-md" />
        </div>
      </div>
    </div>
  );
}
