import Navbar from "src/app/components/navbar.js"
import Footer from "src/app/components/footer.js"
import Link from 'next/link';


export const metadata = {
  title: 'Rivridis MelodyKit | Rivridis Studio',
  description: 'Rivridis MelodyKit is an easy-to-use DAW designed for both hobby and professional music production.',
};


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-linear-to-t to-[#0C1016] from-[#9bb1cf]">
              {/* Navbar */}
                      <div className="w-full fixed top-0 left-0 z-50">
                      <Navbar />
                      </div>
                      <main className="flex flex-col items-center justify-center flex-1">
                          <section id ="top" className="text-center max-w-3xl pt-40 items-center justify-center flex flex-col"> 
                            <h1 className="text-5xl md:text-7xl mb-4 text-[#ede9e5]">RIVRIDIS MELODYKIT</h1>
                            <p className="p-5 text-xl md:text-2xl text-[#ede9e5] mb-6">
                            MelodyKit is an easy to use DAW, which can be used for both hobby and professional music production. Try out the beta now!
                            </p>
                            <div className="mb-6 flex flex-col md:flex-row gap-4">
                            <Link href="https://discord.gg/eVKE3A3fH9" className="inline-block bg-[#e2d5a6] text-#000000 px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#4752C4] transition">
                            Join Discord for Beta
                            </Link>
                            <Link href="https://www.patreon.com/c/Rivridis" className="inline-block bg-[#e2d5a6] text-#000000 px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#d85743] transition">
                            Download from Patreon
                            </Link>
                            </div>
                          </section>
                         
                <div className="flex justify-center p-6">
                  <img src="/melody_ui.png" alt="Rivridis MelodyKit" className="w-full max-w-6xl rounded-lg shadow-lg" />
                </div>


                {/* Footer */}
                <div className="w-full mt-auto">
                  <Footer />
                </div>
              </main>
    </div>
  )
}
