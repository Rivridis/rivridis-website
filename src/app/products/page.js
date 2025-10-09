
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import Link from 'next/link';

export const metadata = {
  title: 'Rivridis Services | Rivridis Inc',
  description: 'Rivridis Services offers a range of software tools, as well as creative solutions, to enhance productivity.',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#889cb8]">
          {/* Navbar */}
          <div className="w-full fixed top-0 left-0 z-50">
            <Navbar />
          </div>

        <div className="w-full max-w-6xl mx-auto pt-25 px-16 pb-16 text-[#ede9e5] space-y-1">
           <h1 className="text-4xl md:text-5xl mb-6 text-[#0C1016]">PRODUCTS</h1>
            {/* Card 1 */}
            <a className="bg-[#0C1016] rounded-lg shadow p-10 hover:bg-[#2d2a26] transition flex flex-row items-center" href="/rivridis-assistant">
                <div className="flex-1 text-[#ede9e5]">
                    <div className="text-2xl font-bold mb-2 text-[#b6ad90]">Rivridis Assistant</div>
                    <p className="text-zinc-200">A windows assistant based on Pyside 6 that interfaces with local LLMs to call functions and act as a general assistant.</p>
                </div>
                <img
                    src="ai.png"
                    className="w-32 h-32 object-contain ml-6 rounded-lg bg-zinc-700 hidden md:block"
                />
            </a>
            {/* Card 2 */}
            <a className="bg-[#0C1016] rounded-lg shadow p-10 hover:bg-[#2d2a26] transition flex flex-row items-center" href="/fireworks">
                <div className="flex-1 text-[#ede9e5]">
                    <div className="text-2xl font-bold mb-2 text-[#b6ad90]">Project Fireworks</div>
                    <p className="text-zinc-200">Fireworks is a cozy multiplayer world where friends can hang out, explore, and play together. Build spaces, dive into dungeons, join PvP mini-games, or just relax in a vibrant city hub, your new virtual hangout beyond chat apps.</p>
                </div>
                <img
                    src="fireworkslogo.png"
                    className="w-32 h-32 object-contain ml-6 rounded-lg bg-zinc-700 hidden md:block"
                />
            </a>
          
        </div>
        <Footer />
    </div>
  )
}