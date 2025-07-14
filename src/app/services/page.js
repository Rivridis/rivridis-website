
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import Link from 'next/link';

export const metadata = {
  title: 'Rivridis Services | Rivridis Inc',
  description: 'Rivridis Services offers a range of software tools, as well as creative solutions, to enhance productivity.',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#ede9e5]">
          {/* Navbar */}
          <div className="w-full fixed top-0 left-0 z-50">
            <Navbar />
          </div>

        <div className="flex flex-col gap-1 mt-16 px-6 py-6 md:px-64">
            {/* Card 1 */}
            <div className="flex flex-row items-center bg-zinc-800 rounded-xl shadow-lg p-16">
                <div className="flex-1 text-[#ede9e5]">
                    <Link href = "/windows-assistant" className="text-2xl font-bold mb-2 text-[#b6ad90] hover:underline">Rivridis Assistant</Link>
                    <p className="text-zinc-200">A windows assistant based on Pyside 6 that interfaces with local LLMs to call functions and act as a general assistant.</p>
                </div>
                <img
                    src="ai.png"
                    className="w-32 h-32 object-contain ml-6 rounded-lg bg-zinc-700"
                />
            </div>
            {/* Card 2 */}
            <div className="flex flex-row items-center bg-zinc-800 rounded-xl shadow-lg p-16">
                <div className="flex-1 text-[#ede9e5]">
                    <Link href = "/contact" className="text-2xl font-bold mb-2 text-[#b6ad90] hover:underline">Software Development</Link>
                    <p className="text-zinc-200">Full-stack custom software solutions — from concept to deployment — for web, mobile, and desktop applications.</p>
                </div>
                <img
                    src="soft.png"
                    className="w-32 h-32 object-contain ml-6 rounded-lg bg-zinc-700"
                />
            </div>
            {/* Card 3 */}
            <div className="flex flex-row items-center bg-zinc-800 rounded-xl shadow-lg p-16">
                <div className="flex-1 text-[#ede9e5]">
                    <Link href = "/contact" className="text-2xl font-bold mb-2 text-[#b6ad90] hover:underline">Artwork and Design</Link>
                    <p className="text-zinc-200">Unique digital illustrations and branding art tailored for your personal or commercial use.</p>
                </div>
                <img
                    src="digital.png"
                    className="w-32 h-32 object-contain ml-6 rounded-lg bg-zinc-700"
                />
            </div>
            {/* Card 4 */}
            <div className="flex flex-row items-center bg-zinc-800 rounded-xl shadow-lg p-16">
                <div className="flex-1 text-[#ede9e5]">
                    <Link href = "/contact" className="text-2xl font-bold mb-2 text-[#b6ad90] hover:underline">Music & Song Production</Link>
                    <h2 className="text-2xl font-bold mb-2"></h2>
                    <p className="text-zinc-200">End-to-end music creation — composition, mixing, and mastering — for indie artists, brands, or personal projects.</p>
                </div>
                <img
                    src="music.png"
                    className="w-32 h-32 object-contain ml-6 rounded-lg bg-zinc-700"
                />
            </div>
        </div>
        <Footer />
    </div>
  )
}