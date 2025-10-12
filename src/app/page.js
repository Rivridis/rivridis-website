"use client"

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SmoothBackgroundWrapper from "./components/background";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0C1016]">
      
      {/* Navbar */}
      <div className="hidden lg:block lg:fixed lg:top-1/2 lg:left-15 lg:-translate-y-1/2 lg:-translate-x-1/2">
        <p className="text-[#ede9e5] text-sm font-light -rotate-90 ">
          <span>GAMING</span>
          <span className="ml-10">SOFTWARE</span>
          <span className="ml-10">CREATIVE DESIGN</span>
        </p>
      </div>
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar />
      </div>
        <div className="flex flex-col items-center justify-center w-full px-6 flex-1 min-h-screen pt-16 bg-[url('/hero.png')] bg-cover bg-center bg-fixed">
          <header className="mb-8 text-center">
            <p className="text-5xl md:text-8xl text-[#0C1016] mb-4">RIVRIDIS STUDIO</p>

            <p className="text-xl md:text-2xl text-[#ede9e5]">CRAFTING DIGITAL EXPERIENCES THAT RESONATE <br /> WITH LOVE</p>
          </header>
        </div>
        
        {/* About Section */}
        <section className="min-h-screen bg-[#0C1016] text-gray-200 flex px-8 py-16 items-center justify-center">
        <div className="max-w-5xl space-y-6 ">
          <div>
            <p className="text-sm text-[#ede9e5] tracking-widest">- ABOUT US -</p>
            <h2 className="text-2xl text-[#ede9e5] md:text-3xl mt-2">
              BUILDING DIGITAL EXPERIENCES THAT INSPIRE
            </h2>
          </div>

          <div className="space-y-4 leading-relaxed text-xl md:text-2xl text-[#ede9e5]">
            <p>
              At Rivridis Studio, we craft digital experiences that blend creativity
              with technology. From sleek Windows applications to immersive web
              platforms and games, we bring ideas to life with passion and precision.
            </p>

            <p>
              Our mission is to build software that feels as good as it performs.
              We focus on seamless design, solid performance, and user-centered
              development that makes every interaction meaningful.
            </p>

            <p>
              Driven by innovation and guided by care, we turn vision into reality.
              At Rivridis Studio, every line of code is written with love,
              because great digital experiences start with heart.
            </p>
          </div>

          <div>
            <a
              href="/contact"
              className="text-[#B6AD90] font-medium hover:text-[#006eff] transition-colors"
            >
              CONTACT US
            </a>
          </div>
        </div>
      </section>

      <SmoothBackgroundWrapper>
      {/*Portfolio Section */}
      <section className="min-h-screen text-gray-200 flex px-8 py-16 items-center justify-center">
        <div className="w-5xl space-y-6 flex flex-col ">
          <div>
            <p className="text-sm text-[#ede9e5] tracking-widest">- PORTFOLIO -</p>
            <h2 className="text-2xl text-[#ede9e5] md:text-3xl mt-2">
              OUR WORK SPEAKS FOR ITSELF
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            {/* Card 1 */}
            <div className="flex-1 bg-[#889cb8] p-8 rounded-xl shadow text-center text-black min-w-[200px] min-h-[350px]">
              <h2 className="text-2xl mb-3">LLM ASSISTANT</h2>
              <p className="text-2xl">A windows assistant based on Pyside 6 that interfaces with local LLMs to call functions and be an assistant</p>
              <a href="https://github.com/Rivridis/Assistant-Client" className="mt-8 inline-block text-[#e2d5a6] text-xl px-4 py-2 rounded-md hover:text-[#006eff] transition-colors">
                VIEW SOURCE
              </a>
            </div>

            {/* Card 2 */}
            <div className="flex-1 bg-[#889cb8] p-8 rounded-xl shadow text-center text-black min-w-[200px] min-h-[350px]">
              <h2 className="text-2xl mb-3">RIVRIDIS READER</h2>
              <p className="text-2xl">A full stack app based on the QT framework, that can load and display EPUB files that are present in the system</p>
              <a href="https://github.com/Rivridis/Ebook-Reader" className="mt-8 inline-block text-[#e2d5a6] text-xl px-4 py-2 rounded-md hover:text-[#006eff] transition-colors">
                VIEW SOURCE
              </a>
            </div>

            {/* Card 3 */}
            <div className="flex-1 bg-[#889cb8] p-8 rounded-xl shadow text-center text-black min-w-[200px] min-h-[350px]">
              <h2 className="text-2xl mb-3">MEDIA GUESSER</h2>
              <p className="text-2xl">A react and nextjs based web app that displays screenshots from movies, and asks the user to guess the movie</p>
              <a href="https://github.com/Rivridis/MediaGuesser" className="mt-8 inline-block text-[#e2d5a6] text-xl px-4 py-2 rounded-md hover:text-[#006eff] transition-colors">
                VIEW SOURCE
              </a>
            </div>
        </div>
        </div>
      </section>

      {/* Collaboration Section with smooth transition */}
      
        <section className="min-h-screen flex items-center justify-center px-8 py-16 text-[#0C1016]">
          <div className="max-w-5xl space-y-6">
            <div>
              <p className="text-sm tracking-widest">- COLLABORATION -</p>
              <h2 className="text-2xl md:text-3xl mt-2 font-semibold">
                LET'S BUILD TOGETHER
              </h2>
            </div>

            <div className="space-y-4 leading-relaxed text-xl md:text-2xl md:py-32">
              <p className="md:text-center md:px-32">
                We occasionally collaborate on projects that inspire us, from innovative apps to creative game ideas.
              </p>
              <p className="md:text-center">
                <a
                  href="/contact"
                  className="text-[#e2d5a6] font-medium hover:text-[#006eff] transition-colors"
                >
                  Have an idea? Let's talk
                </a>
              </p>
            </div>
          </div>
        </section>
      </SmoothBackgroundWrapper>

    <Footer />
  </div>
  );
}
