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
        
        <div
          className="w-full min-h-screen bg-zinc-800 text-[#ede9e5] flex flex-col items-center justify-center"
        >
          <div className="max-w-5xl w-full px-6 py-16">
            <h2 className="text-4xl font-bold text-center py-10">Showcase</h2>
            <div className="flex flex-col items-center justify-center space-y-8">
              
              {/* Product Card 1 */}
              <div className="bg-zinc-900 rounded-lg shadow-lg p-18 w-3/4 flex flex-col items-center">
                <h3 className="text-2xl text-[#b6ad90] font-semibold mb-2 text-center">LLM-Assistant</h3>
                <p className="text-base text-[#ede9e5] mb-4 text-center hidden md:block">
                  A windows assistant based on Pyside 6 that interfaces with local LLMs to call functions and act as a general assistant.
                </p>
                <a 
                href="https://github.com/Rivridis/LLM-Assistant" className="bg-[#b6ad90] px-6 py-2 rounded-sm shadow-md hover:bg-[#a89f7f] text-zinc-900 transition text-center">View Source</a>
              </div>
              {/* Product Card 2 */}
              <div className="bg-zinc-900 rounded-lg shadow-lg p-18 w-3/4 flex flex-col items-center">
                <h3 className="text-2xl text-[#b6ad90] font-semibold mb-2 text-center">Rivridis Reader</h3>
                <p className="text-base text-[#ede9e5] mb-4 text-center hidden md:block">
                  A full stack app based on the QT framework, that can load and display EPUB files that are present in the system. It also has the ability to remember the reading position of each book.
                </p>
                <a 
                href="https://github.com/Rivridis/Ebook-Reader" className="bg-[#b6ad90] px-6 py-2 rounded-sm shadow-md hover:bg-[#a89f7f] text-zinc-900 transition text-center">View Source</a>
              </div>
              {/* Product Card 3 */}
              <div className="bg-zinc-900 rounded-lg shadow-lg p-18 w-3/4 flex flex-col items-center">
                <h3 className="text-2xl text-[#b6ad90] font-semibold mb-2 text-center">Media Guesser</h3>
                <p className="text-base text-[#ede9e5] mb-4 text-center hidden md:block">
                  A react and nextjs based web app that displays screenshots from movies, and asks the user to guess which movie is the screenshot from. The user is given 5 tries to guess correctly, before the next screenshot is shown.
                </p>
                <a 
                href="https://github.com/Rivridis/MediaGuesser" className="bg-[#b6ad90] px-6 py-2 rounded-sm shadow-md hover:bg-[#a89f7f] text-zinc-900 transition text-center">View Source</a>
              </div>
         
          </div>
          </div>
        </div>

        {/* Skills Section */}
      <div className="w-full min-h-screen bg-zinc-900 text-[#ede9e5] flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full px-6">
          <h2 className="text-4xl font-bold mb-10 text-center pt-6">Technologies Used</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-12">

            <img src="skills/python.png" className="rounded-lg h-32 w-32 flex flex-col items-center justify-center" />
            <img src="skills/react.png" className="rounded-lg h-32 w-32 flex flex-col items-center justify-center" />
            <img src="skills/QT.png" className="rounded-lg h-32 w-32 flex flex-col items-center justify-center" />
            <img src="skills/torch.png" className="rounded-lg h-32 w-32 flex flex-col items-center justify-center" />
            <img src="skills/cpp.png" className="rounded-lg h-32 w-32 flex flex-col items-center justify-center" />


  
      
          </div>
          
        </div>
      </div>

  <section className="bg-zinc-800 text-[#ede9e5] w-full min-h-screen flex items-center justify-center">
  <div className="max-w-7xl mx-auto py-12">
    <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-[#ede9e5] text-center">
      Tailored Services to Match Your Needs
    </h2>

    <div className="flex flex-col md:flex-row gap-8 p-6">
      
      {/* LLM Client App */}
      <div className="bg-[#eae5e2] text-black p-6 rounded-lg shadow">
        <img src="/ai.png" alt="LLM App" className="mb-4 mx-auto w-12 h-12" />
        <h3 className="text-lg font-semibold mb-2">LLM Client App</h3>
        <p className="text-sm text-gray-800">
          Run open source LLMs on your windows device with function calling. We provide custom solutions as well.
        </p>
      </div>

      {/* Software Development */}
      <div className="bg-[#eae5e2] text-black p-6 rounded-lg shadow">
        <img src="/soft.png" alt="Software Dev" className="mb-4 mx-auto w-12 h-12" />
        <h3 className="text-lg font-semibold mb-2">Software Development</h3>
        <p className="text-sm text-gray-800">
          Full-stack custom software solutions, from concept to deployment, for web, mobile, and desktop applications.
        </p>
      </div>

      {/* Music & Song Production */}
      <div className="bg-[#eae5e2] text-black  p-6 rounded-lg shadow">
        <img src="/digital.png" alt="Music" className="mb-4 mx-auto w-12 h-12" />
        <h3 className="text-lg font-semibold mb-2">Digital Artwork</h3>
        <p className="text-sm text-gray-800">
          Unique digital art draw using procreate, for your personal or commercial use. We also do 3D artwork using Blender 3D.
        </p>
      </div>


      {/* Music & Song Production */}
      <div className="bg-[#eae5e2] text-black  p-6 rounded-lg shadow">
        <img src="/music.png" alt="Music" className="mb-4 mx-auto w-12 h-12" />
        <h3 className="text-lg font-semibold mb-2">Music & Song Production</h3>
        <p className="text-sm text-gray-800">
          End-to-end music creation, composition, mixing, and mastering, for indie artists, brands, or personal projects.
        </p>
      </div>
    </div>
    
       {/* CTA Button */}
    <div className="text-center pt-16">
      <a
        href="/services"
        className="inline-block bg-[#b6ad90] text-black text-sm font-medium px-6 py-3 rounded-md shadow hover:bg-[#ede9e5] transition duration-300"
      >
        Let's Work Together
      </a>
    </div>
  </div>
</section>


      <Footer />
  </div>
  );
}
