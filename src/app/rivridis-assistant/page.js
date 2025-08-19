import Navbar from "src/app/components/navbar.js"
import Footer from "src/app/components/footer.js"
import Link from 'next/link';
import UseCasePanel from "src/app/components/UseCasePanel.js";

export const metadata = {
  title: 'Rivridis Assistant | Rivridis Inc',
  description: 'Rivridis Assistant is an AI-powered tool designed to enhance productivity and streamline workflows.',
};


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#ede9e5]">
              {/* Navbar */}
              <div className="w-full fixed top-0 left-0 z-50">
                <Navbar />
              </div>
              <main className="flex flex-col items-center justify-center flex-1 px-4">
                {/* Hero Section */}
                <section id ="top" className="text-center max-w-2xl  min-h-screen items-center justify-center flex flex-col"> 
                  <h1 className="text-7xl font-bold mb-4 text-[#2d2a26]">Rivridis Assistant</h1>
                  <p className="text-2xl text-[#4b4845] mb-6">
                    Run powerful local LLMs with function calling on your PC. Our agency also provides custom AI Agents tailored to your business needs.
                  </p>
                  <Link href="#pricing" className="inline-block bg-[#2d2a26] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#4b4845] transition">
                    View Pricing
                  </Link>
                </section>
                {/* Features Section */}
                <section className="text-center max-w-2xl mb-16 min-h-screen items-center justify-center flex flex-col">
                  <h2 className="text-6xl font-bold mb-4 text-[#2d2a26]">Features</h2>
                  <p className="text-2xl text-[#4b4845] mb-8">
                    Unlock powerful capabilities designed to boost your productivity and streamline your workflow.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                    <div className="bg-zinc-900 rounded-lg shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">⚡</span>
                      <h3 className="font-semibold text-lg mb-2 text-[#ede9e5]">Local Language Models</h3>
                      <p className="text-[#ede9e5]">Run Large Language models such as Llama or even your custom trained models directly on your Windows device for privacy and speed.</p>
                    </div>
                    <div className="bg-zinc-900 rounded-lg shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">🔗</span>
                      <h3 className="font-semibold text-lg mb-2 text-[#ede9e5]">Function Calling</h3>
                      <p className="text-[#ede9e5]">Use predefined functions, to get information easily. We shall create custom functions and integrations as required for the customers of Enterprise Plan.</p>
                    </div>
                    <div className="bg-zinc-900 rounded-lg shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">🛠️</span>
                      <h3 className="font-semibold text-lg mb-2 text-[#ede9e5]">LLM Server</h3>
                      <p className="text-[#ede9e5]">Run the LLM server provided for maximum control and connect it directly to multiple app instances in office environments. Supports OpenAI API.</p>
                    </div>
                    <div className="bg-zinc-900 rounded-lg shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">🔒</span>
                      <h3 className="font-semibold text-lg mb-2 text-[#ede9e5]">Privacy First</h3>
                      <p className="text-[#ede9e5]">Your data stays private to your machine. We do not collect any data. Internet access is only required for the search function. </p>
                    </div>
                  </div>
                </section>
                <img src="/new_ui.png" alt="Windows Assistant Client" className="w-full max-w-6xl mb-16 rounded-lg shadow-lg" />


              


                {/* Pricing Section */}
                <section id="pricing" className="w-full max-w-5xl mb-20 pt-15">
                  <h2 className="text-6xl font-bold text-center mb-8 text-[#2d2a26]">Pricing</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Basic Plan */}
                    <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center border-2 border-[#ede9e5]">
                      <h3 className="font-semibold text-xl mb-2">Basic</h3>
                      <p className="text-4xl font-bold">$0
                      </p>
                      <p className="text-base text-gray-500 mb-4">per member / month</p>
                      <ul className="mb-6 text-[#4b4845]">
                        <li>✔ Predefined Functions</li>
                        <li>✔ Chat, Code and PDF Mode</li>
                        <li>✔ Open Source</li>
                        <li>✖ Server Support</li>
                      </ul>
                      <button className="bg-[#ede9e5] text-[#2d2a26] px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#d6d3ce] transition">
                        <a href="https://github.com/Rivridis/LLM-Assistant/releases/download/v2.0-stable/rivridis-assistant-nvidia.exe">Download</a>
                      </button>
                    </div>
                    {/* Pro Plan */}
                    <div className="bg-[#2d2a26] text-white rounded-xl shadow-lg p-8 flex flex-col items-center border-4 border-[#ede9e5] scale-105">
                      <h3 className="font-semibold text-xl mb-2">Standard </h3>
                      <p className="flex text-4xl font-bold justify-center contents-center">$15</p>
                      <p className="text-base text-gray-500 mb-4">per member / month</p>
                      <ul className="mb-6">
                        <li>✔ OpenAI API Support</li>
                        <li>✔ Server and Installer provided</li>
                        <li>✔ Commercial Use</li>
                        <li>✔ Basic Integrations</li>
                      </ul>
                      <button className="bg-[#ede9e5] text-[#2d2a26] px-6 py-2 rounded-lg font-semibold shadow hover:bg-white transition">
                        <a href="https://forms.gle/dEDcouL6v3fAVryZ9">Get Started</a>
                      </button>
                    </div>
                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center border-2 border-[#ede9e5]">
                      <h3 className="font-semibold text-xl mb-2">Enterprise</h3>
                      <p className="text-4xl font-bold flex">Custom
                      </p>
                      <p className="text-base text-gray-500 mb-4">Custom Pricing</p>
                      <ul className="mb-6 text-[#4b4845]">
                        <li>✔ Everything in Standard</li>
                        <li>✔ Integration with internal tools</li>
                        <li>✔ Fully branded builds</li>
                        <li>✔ On-premise support</li>
                      </ul>
                      <button className="bg-[#2d2a26] text-white px-6 py-2.5 rounded-lg font-semibold shadow hover:bg-[#4b4845] transition">
                        <a href="/contact">Contact Sales</a>
                      </button>
                    </div>
                  </div>
                </section>

                <UseCasePanel />

                {/* Footer */}
                <div className="w-full mt-auto">
                  <Footer />
                </div>
              </main>
    </div>
  )
}
