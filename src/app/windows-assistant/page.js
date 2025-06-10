import Navbar from "src/app/components/navbar.js"
import Footer from "src/app/components/footer.js"
import Link from 'next/link';

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
                  <h1 className="text-7xl font-bold mb-4 text-[#2d2a26]">Assistant Client</h1>
                  <p className="text-2xl text-[#4b4845] mb-6">
                    Your all-in-one productivity tool for Windows. Download and run language models with full function calling support, and get more done with ease.
                  </p>
                  <Link href="#pricing" className="inline-block bg-[#2d2a26] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#4b4845] transition">
                    Download Assistant Client for Windows
                  </Link>
                </section>
                {/* Features Section */}
                <section className="text-center max-w-2xl mb-16 min-h-screen items-center justify-center flex flex-col">
                  <h2 className="text-6xl font-bold mb-4 text-[#2d2a26]">Features</h2>
                  <p className="text-2xl text-[#4b4845] mb-8">
                    Unlock powerful capabilities designed to boost your productivity and streamline your workflow.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">⚡</span>
                      <h3 className="font-semibold text-lg mb-2 text-[#2d2a26]">Local Language Models</h3>
                      <p className="text-[#4b4845]">Run advanced AI models directly on your Windows device for privacy and speed.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">🔗</span>
                      <h3 className="font-semibold text-lg mb-2 text-[#2d2a26]">Function Calling</h3>
                      <p className="text-[#4b4845]">Automate tasks and connect your favorite apps with robust function calling support.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">🛠️</span>
                      <h3 className="font-semibold text-lg mb-2 text-[#2d2a26]">Custom Workflows</h3>
                      <p className="text-[#4b4845]">Create and manage personalized workflows to fit your unique needs.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                      <span className="text-3xl mb-2">🔒</span>
                      <h3 className="font-semibold text-lg mb-2 text-[#2d2a26]">Privacy First</h3>
                      <p className="text-[#4b4845]">Your data stays on your device. No cloud processing required.</p>
                    </div>
                  </div>
                </section>
                <img src="/chat_ui.png" alt="Windows Assistant Client" className="w-full max-w-4xl mb-16 rounded-lg shadow-lg" />


              


                {/* Pricing Section */}
                <section id="pricing" className="w-full max-w-5xl mb-20">
                  <h2 className="text-6xl font-bold text-center mb-8 text-[#2d2a26]">Pricing</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Free Plan */}
                    <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center border-2 border-[#ede9e5]">
                      <h3 className="font-semibold text-xl mb-2">Free</h3>
                      <p className="text-4xl font-bold mb-4">$0</p>
                      <ul className="mb-6 text-[#4b4845]">
                        <li>✔ Basic function calling</li>
                        <li>✖ Custom integrations</li>
                        <li>✖ Priority support</li>
                        <li>✖ Server mode</li>
                      </ul>
                      <button className="bg-[#ede9e5] text-[#2d2a26] px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#d6d3ce] transition">
                        <a href="#">Download</a>
                      </button>
                    </div>
                    {/* Pro Plan */}
                    <div className="bg-[#2d2a26] text-white rounded-xl shadow-lg p-8 flex flex-col items-center border-4 border-[#ede9e5] scale-105">
                      <h3 className="font-semibold text-xl mb-2">Pro</h3>
                      <p className="text-4xl font-bold mb-4">$9.99<span className="text-lg font-normal">/mo</span></p>
                      <ul className="mb-6">
                        <li>✔ All Free features</li>
                        <li>✔ Free updates</li>
                        <li>✔ Server mode</li>
                        <li>✔ Extra QOL features</li>
                      </ul>
                      <button className="bg-[#ede9e5] text-[#2d2a26] px-6 py-2 rounded-lg font-semibold shadow hover:bg-white transition">
                        <a href="#">Subscribe</a>
                      </button>
                    </div>
                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center border-2 border-[#ede9e5]">
                      <h3 className="font-semibold text-xl mb-2">Enterprise</h3>
                      <p className="text-4xl font-bold mb-4">Contact</p>
                      <ul className="mb-6 text-[#4b4845]">
                        <li>✔ All Pro features</li>
                        <li>✔ Dedicated support</li>
                        <li>✔ Custom integrations</li>
                        <li>✔ Volume licensing</li>
                      </ul>
                      <button className="bg-[#2d2a26] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#4b4845] transition">
                        <a href="#">Contact Sales</a>
                      </button>
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <div className="w-full mt-auto">
                  <Footer />
                </div>
              </main>
    </div>
  )
}
