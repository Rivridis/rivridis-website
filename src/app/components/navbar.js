import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-zinc-800 px-6 py-2 flex items-center justify-between mx-auto mt-0 md:mt-4 max-w-[700px] md:rounded-md md:px-8">
            <div className="font-bold text-md text-[#ede9e5] md:mb-0 mb-0">
                RIVRIDIS
            </div>
            <div className="flex-1 flex justify-center">
                <div className="flex gap-4 hidden md:flex">
                    <Link href="#"><span className="text-[#ede9e5] cursor-pointer text-sm">Home</span></Link>
                    <Link href="#"><span className="text-[#ede9e5] cursor-pointer text-sm">Services</span></Link>
                    <Link href="#"><span className="text-[#ede9e5] cursor-pointer text-sm">Portfolio</span></Link>
                    <Link href="#"><span className="text-[#ede9e5] cursor-pointer text-sm">Contact Us</span></Link>
                </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
                <button>
                    <Link href="#"><span className="text-[#ede9e5] cursor-pointer text-sm">Menu</span></Link>
                </button>
            </div>
        </nav>
    );
}
    