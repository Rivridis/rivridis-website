import Navbar from "src/app/components/navbar.js"
import Footer from "src/app/components/footer.js"
import Link from 'next/link';


export const metadata = {
  title: 'Rivridis Assistant | Rivridis Inc',
  description: 'Rivridis Assistant is an AI-powered tool designed to enhance productivity and streamline workflows.',
};


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-t to-[#0C1016] from-[#9bb1cf]">
              {/* Navbar */}
              <div className="w-full fixed top-0 left-0 z-50">
                <Navbar />
              </div>
              <main className="flex flex-col items-center justify-center flex-1">
                        <section id ="top" className="text-center max-w-3xl  min-h-screen items-center justify-center flex flex-col"> 
                          <h1 className="text-5xl md:text-7xl mb-4 text-[#ede9e5]">RIVRIDIS ASSISTANT</h1>
                          <p className="p-5 text-xl md:text-2xl text-[#ede9e5] mb-6">
                          Run powerful local LLMs with function calling on your PC. Our agency also provides custom AI Agents tailored to your business needs. Free for personal use.
                          </p>
                          <Link href="https://github.com/Rivridis/Assistant-Client" className="inline-block bg-[#e2d5a6] text-#1a1a1a px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#889cb8] transition">
                          Download for Windows
                          </Link>
                        </section>
                        {/* Features Section */}
                <section className="text-center max-w-2xl mb-16 min-h-screen items-center justify-center flex flex-col">
                  <h2 className="text-5xl md:text-6xl mb-4 text-[#ede9e5]">FEATURES</h2>
                  <p className="p-5 md:p-0 text-xl md:text-2xl text-[#ede9e5] mb-8">
                    Unlock powerful capabilities designed to boost your productivity and streamline your workflow.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 md:p-0 w-full">
                    <div className="bg-[#0C1016] rounded-lg shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">⚡</span>
                      <h3 className="font-semibold text-lg mb-2 text-[#ede9e5]">Local Language Models</h3>
                      <p className="text-[#ede9e5]">Run Large Language models such as Llama or even your custom trained models directly on your Windows device for privacy and speed.</p>
                    </div>
                    <div className="bg-[#0C1016] rounded-lg shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">🔗</span>
                      <h3 className="font-semibold text-lg mb-2 text-[#ede9e5]">Function Calling</h3>
                      <p className="text-[#ede9e5]">Use predefined functions, to get information easily. New functions will be added in future updates.</p>
                    </div>
                    <div className="bg-[#0C1016] rounded-lg shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">🛠️</span>
                      <h3 className="font-semibold text-lg mb-2 text-[#ede9e5]">LLM Server</h3>
                      <p className="text-[#ede9e5]">Run any LLM server and connect it directly to multiple app instances in office environments. Supports OpenAI API.</p>
                    </div>
                    <div className="bg-[#0C1016] rounded-lg shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">🔒</span>
                      <h3 className="font-semibold text-lg mb-2 text-[#ede9e5]">Privacy First</h3>
                      <p className="text-[#ede9e5]">Your data stays private to your machine. We do not collect any data. Internet access is only required for the search function. </p>
                    </div>
                  </div>
                </section>
                <div className="flex justify-center p-6">
                  <img src="/new_ui.png" alt="Windows Assistant Client" className="w-full max-w-6xl rounded-lg shadow-lg" />
                </div>


                {/* Footer */}
                <div className="w-full mt-auto">
                  <Footer />
                </div>
              </main>
    </div>
  )
}
