// Mirrors dashboard/create/page.js + create.js layout:
// centered max-w-3xl form card with title row, switcher, fields, editor.
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#889cb8]">
      <div className="pt-20 px-10 pb-5">
        <div className="flex flex-col space-y-2 mx-auto max-w-3xl rounded-lg bg-[#1a1c1e] p-8 shadow animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-64 bg-white/10 rounded" />
            <div className="h-9 w-20 bg-[#7b735c]/50 rounded-md" />
          </div>
          <div className="flex gap-2 mb-2">
            <div className="flex-1 h-9 bg-[#2b2d2f] rounded-md" />
            <div className="flex-1 h-9 bg-[#2b2d2f] rounded-md" />
          </div>
          <div className="space-y-4">
            <div className="h-10 bg-white/5 border-b border-[#7b735c] rounded-t" />
            <div className="h-10 bg-white/5 border-b border-[#7b735c] rounded-t" />
            <div className="h-64 bg-[#2b2d2f] rounded-md" />
            <div className="h-10 bg-[#7b735c]/50 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
