"use client"
import Navbar from "src/app/components/navbar.js"
import Footer from "src/app/components/footer.js"
import Link from 'next/link';

export default function Home() {
// Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

         try {
  
            const response = await fetch('/api/email', {
                method: 'post',
                body: formData,
            });

            if (!response.ok) {
                console.log("falling over")
                throw new Error(`response status: ${response.status}`);
            }
            const responseData = await response.json();
            console.log(responseData['message'])
    
            alert('Message successfully sent');
        } catch (err) {
            console.error(err);
            alert("Error, please try resubmitting the form");
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#889cb8]">

            <div className="w-full fixed top-0 left-0 z-50">
                <Navbar />
            </div>

            <div className="flex flex-1 items-center justify-center mt-24 mb-12 px-4">
                <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">

                    <div className="md:w-1/2 p-8 bg-[#f7f5f2]">
                        <h2 className="text-2xl font-bold mb-6 text-[#2d2a26]">Contact Us</h2>
                        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                            <div>
                                <label className="block text-sm font-medium text-[#2d2a26] mb-1">Name</label>
                                <input type="text" name="name" className="w-full px-3 py-2 border border-[#d6ccc2] rounded focus:outline-none focus:ring-2 focus:ring-[#b6ad90]" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#2d2a26] mb-1">Email</label>
                                <input type="email" name="email" className="w-full px-3 py-2 border border-[#d6ccc2] rounded focus:outline-none focus:ring-2 focus:ring-[#b6ad90]" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#2d2a26] mb-1">Message</label>
                                <textarea rows="4" name="message" className="w-full px-3 py-2 border border-[#d6ccc2] rounded focus:outline-none focus:ring-2 focus:ring-[#b6ad90]" required></textarea>
                            </div>
                            <button type="submit" className="w-full bg-[#b6ad90] text-white font-semibold py-2 rounded hover:bg-[#a69c7c] transition" tabIndex={0}>
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="md:w-1/2 p-8 flex flex-col justify-center bg-[#ede9e5]">
                        <h3 className="text-xl font-semibold mb-4 text-[#2d2a26]">Get in Touch</h3>
                        <p className="mb-4 text-zinc-900">
                            We'd love to hear from you! Whether you have a question about our services, pricing, or you need to order a service, contact us today. Our team is here to assist you.
                        </p>
                        <div className="mb-2">
                            <span className="font-medium text-[#2d2a26]">Email:</span> <a href="mailto:info@rivridis.com" className="text-zinc-900 hover:underline">info@rivridis.com</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}