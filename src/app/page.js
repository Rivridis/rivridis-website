import Image from "next/image";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#ede9e5]">
      {/* Navbar */}
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar />
      </div>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center w-full px-6 flex-1 min-h-screen pt-24">
        <header className="mb-8 text-center">
          <h1 className="text-7xl font-extrabold text-zinc-900 tracking-tight mb-2">Rivridis Inc.</h1>
          <p className="text-lg text-gray-700">From Canvas to Code, crafting experiences that resonate.</p>
        </header>
      </div>
      
         {/* Showcase Section */}
      <div className="w-full min-h-screen bg-zinc-800 text-[#ede9e5] flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full px-6">
          <h2 className="text-4xl font-bold mb-10 text-center">Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12">
            {/* Product Card 1 */}
            <div className="bg-zinc-900 rounded-lg shadow-lg p-12 flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-2">LLM-Assistant</h3>
              <p className="text-base text-gray-300 mb-4 text-center">
                A windows assistant based on Pyside 6 that interfaces with local LLMs to call functions and act as a general assistant.
              </p>
              <a href="https://github.com/Rivridis/LLM-Assistant" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View on GitHub</a>
            </div>
            {/* Product Card 2 */}
            <div className="bg-zinc-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <Image src="/art.png" alt="Product 2" width={120} height={120} className="mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-2">Artworks</h3>
              <a href="https://www.instagram.com/rivridisart/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View on Instagram</a>
            </div>
            {/* Product Card 3 */}
            <div className="bg-zinc-900 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
              <h3 className="text-2xl font-semibold mb-2">Stories</h3>

              <a href="" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View on website</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="w-full min-h-screen bg-zinc-900 text-[#ede9e5] flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full px-6">
          <h2 className="text-4xl font-bold mb-10 text-center pt-6">Company Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-12">
            {/* Product Card 1 */}
            <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-2">Our Purpose</h3>
              <p className="text-base text-gray-300 mb-4 text-center">
                Rivridis Inc. fuses innovative software development with captivating artistic expression. We're here to ignite imagination and drive progress, transforming bold ideas into impactful, enriching experiences.
              </p>
            </div>
            {/* Product Card 2 */}
            <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
              <p className="text-base text-gray-300 mb-4 text-center">
                Our vision is to empower individuals and businesses, transforming their boldest ideas into impactful, enriching experiences. We craft the future where technology amplifies human creativity, building intuitive, beautiful, and powerful tools that inspire new possibilities in art, music, and digital innovation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-gray-500 text-sm p-2">
        &copy; {new Date().getFullYear()} Rivridis. All rights reserved.
      </footer>
    </div>
  );
}
