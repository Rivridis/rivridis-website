import Navbar from "src/app/components/navbar.js"
import Link from 'next/link';
import Footer from "src/app/components/footer.js"

export default function Page() {
    return (
        <main className="bg-[#ede9e5] min-h-screen">
            <div className="w-full fixed top-0 left-0 z-50">
                <Navbar />
            </div>

            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-8 mt-25 text-[#2d2a26]">Links</h1>
                <div className="space-y-4 w-full max-w-xl text-center">
                    <div className="bg-white rounded-lg shadow p-5">
                        <Link href="https://rivridis.gumroad.com/l/ProcreateMangaTools" className="block text-lg text-blue-600 hover:underline">
                            Gumroad - Manga Brushes
                        </Link>
                    </div>
                    <div className="bg-white rounded-lg shadow p-5">
                        <Link href="https://ko-fi.com/rivridis" className="block text-lg text-blue-600 hover:underline">
                            Kofi
                        </Link>
                    </div>
                    <div className="bg-white rounded-lg shadow p-5">
                        <Link href="https://www.instagram.com/rivridis" className="block text-lg text-blue-600 hover:underline">
                            Instagram
                        </Link>
                    </div>
                    <div className="bg-white rounded-lg shadow p-5">
                        <Link href="https://github.com/Rivridis" className="block text-lg text-blue-600 hover:underline">
                            Github
                        </Link>
                    </div>
                    <div className="bg-white rounded-lg shadow p-5">
                        <Link href="https://www.reddit.com/user/rivridis" className="block text-lg text-blue-600 hover:underline">
                            Reddit
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <Footer />
            </div>
        </main>
    );
}