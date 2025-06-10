"use client"
import Image from "next/image";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HeroTitle from "./components/title";
import { motion } from "framer-motion";

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

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
          <HeroTitle />

          <p className="text-lg text-gray-700">From Canvas to Code, crafting experiences that resonate.</p>
        </header>
      </div>
      
      <motion.div
        className="w-full min-h-screen bg-zinc-800 text-[#ede9e5] flex flex-col items-center justify-center"
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        
      >
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
            <div className="bg-zinc-900 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
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
      </motion.div>

      {/* Mission Section */}
      <div className="w-full min-h-screen bg-zinc-900 text-[#ede9e5] flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full px-6">
          <h2 className="text-4xl font-bold mb-10 text-center pt-6">Company Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-12">
            {/* Product Card 1 */}
            <div className="bg-zinc-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-2">Our Purpose</h3>
              <p className="text-base text-gray-300 mb-4 text-center">
                Rivridis Inc. fuses innovative software development with captivating artistic expression. We're here to ignite imagination and drive progress, transforming bold ideas into impactful, enriching experiences.
              </p>
            </div>
            {/* Product Card 2 */}
            <div className="bg-zinc-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
              <p className="text-base text-gray-300 mb-4 text-center">
                Our vision is to empower individuals and businesses, transforming their boldest ideas into impactful, enriching experiences. We craft the future where technology amplifies human creativity, building intuitive, beautiful, and powerful tools that inspire new possibilities in art, music, and digital innovation.
              </p>
            </div>
          </div>
        </div>
      </div>

  <section className="bg-zinc-800 text-[#ede9e5] py-12 px-4">
  <div className="max-w-7xl mx-auto py-12">
    <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-[#ede9e5]">
      Tailored Services to Match Your Needs
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      {/* LLM Client App */}
      <div className="bg-[#eae5e2] text-black p-6 rounded-lg shadow">
        <img src="/ai.png" alt="LLM App" className="mb-4 mx-auto w-12 h-12" />
        <h3 className="text-lg font-semibold mb-2">LLM Client App</h3>
        <p className="text-sm text-gray-800">
          Build conversational AI experiences using custom LLM apps. Secure, scalable, and tailored to your business logic.
        </p>
      </div>

      {/* Software Development */}
      <div className="bg-[#eae5e2] text-black p-6 rounded-lg shadow">
        <img src="/soft.png" alt="Software Dev" className="mb-4 mx-auto w-12 h-12" />
        <h3 className="text-lg font-semibold mb-2">Software Development</h3>
        <p className="text-sm text-gray-800">
          Full-stack custom software solutions — from concept to deployment — for web, mobile, and desktop applications.
        </p>
      </div>

      {/* Custom Artwork */}
      <div className="bg-[#eae5e2] text-black p-6 rounded-lg shadow">
        <img src="/digital.png" alt="Artwork" className="mb-4 mx-auto w-12 h-12" />
        <h3 className="text-lg font-semibold mb-2">Artwork</h3>
        <p className="text-sm text-gray-800">
          Unique digital illustrations and branding art tailored for your personal or commercial use.
        </p>
      </div>

      {/* Music & Song Production */}
      <div className="bg-[#eae5e2] text-black  p-6 rounded-lg shadow">
        <img src="/music.png" alt="Music" className="mb-4 mx-auto w-12 h-12" />
        <h3 className="text-lg font-semibold mb-2">Music & Song Production</h3>
        <p className="text-sm text-gray-800">
          End-to-end music creation — composition, mixing, and mastering — for indie artists, brands, or personal projects.
        </p>
      </div>
    </div>
    
       {/* CTA Button */}
    <div className="text-center pt-16">
      <a
        href="/services"
        className="inline-block bg-[#DDA15E] text-black text-sm font-medium px-6 py-3 rounded-md shadow hover:bg-[#ede9e5] transition duration-300"
      >
        Let’s Work Together
      </a>
    </div>
  </div>
</section>


      <Footer />
  </div>
  );
}
