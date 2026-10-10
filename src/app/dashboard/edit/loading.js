// Mirrors dashboard/edit/[id]/page.js layout:
// centered max-w-4xl card with "Edit ..." header + BACK + form fields.
// Placed at edit/loading.js so it covers edit/[id] navigations.
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#8a9bb2] text-white pt-20 px-8 pb-8 md:px-30">
      <div className="pt-8 max-w-4xl mx-auto bg-[#1a1c1e] p-6 rounded-md shadow-md animate-pulse">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-40 bg-white/10 rounded" />
          <div className="h-9 w-20 bg-[#7b735c]/50 rounded-md" />
        </div>
        <div className="space-y-4">
          <div className="h-10 bg-white/5 rounded" />
          <div className="h-10 bg-white/5 rounded" />
          <div className="h-64 bg-[#2b2d2f] rounded-md" />
          <div className="h-10 bg-[#7b735c]/50 rounded-md" />
        </div>
      </div>
    </div>
  );
}
