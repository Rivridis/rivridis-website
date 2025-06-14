import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function TermsPage() {
    return (
        <main className="flex flex-col min-h-screen bg-[#ede9e5]">
            <div className="w-full fixed top-0 left-0 z-50">
                <Navbar />
            </div>
            <section className="max-w-2xl mx-auto pt-32 px-4 pb-16 text-[#2d2a26]">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2d2a26]">Terms of Service</h1>
                <p className="text-lg text-[#4b4845] mb-8">
                    Welcome to Rivridis Assistant! By using our service, you agree to the following terms and conditions.
                </p>
                <h2 className="text-2xl font-semibold mb-2 text-[#2d2a26]">Terms and Conditions</h2>
                <p className="mb-4"><span className="font-semibold">Effective Date:</span> 14-06-25</p>

                <p className="mb-4">
                    These Terms and Conditions ("Terms") govern your access to and use of the website <span className="font-semibold">rivridis.com</span> ("Website") and the <span className="font-semibold">Rivridis Assistant</span> application ("App"), collectively referred to as the "Service." By accessing or using the Service, you agree to be bound by these Terms.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">1. Acceptance of Terms</h3>
                <p className="mb-4">
                    By accessing or using the Website or downloading and using the Rivridis Assistant app, you confirm that you have read, understood, and agreed to be bound by these Terms. If you do not agree to these Terms, you must not use the Service.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">2. Service Description</h3>
                <p className="mb-4">
                    Rivridis.com offers access to the <span className="font-semibold">Rivridis Assistant</span>, a downloadable app that provides AI-based assistant services powered by a large language model (LLM). The App is available in both a <span className="font-semibold">free version</span> and a <span className="font-semibold">paid subscription version</span>.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">3. Subscriptions and Payments</h3>
                <p className="mb-2">
                    The subscription plans for Rivridis Assistant are not processed through the Website or App. By using or subscribing to the Service, you acknowledge that:
                </p>
                <ul className="list-disc list-inside mb-4 text-left pl-4">
                    <li>Payment and subscription management are handled through third-party platforms not governed by Rivridis.com or the App.</li>
                    <li>We do not provide billing, subscription tracking, or cancellation services via the Website or App.</li>
                    <li>All subscription-related terms are subject to the policies of the respective payment or distribution platforms.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">4. User Accounts</h3>
                <p className="mb-4">
                    No user accounts are required to use the Service. You may access the Website and download the App without registration. However, we may collect your <span className="font-semibold">email address</span> if you choose to contact us via the Website's contact form.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">5. Privacy</h3>
                <p className="mb-4">
                    We respect your privacy. The only personal data we collect is the <span className="font-semibold">email address</span> submitted via our contact form. For more details, please review our <a href="/privacy-policy" className="text-[#b6ad90] hover:underline">Privacy Policy</a>.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">6. Age Restriction</h3>
                <p className="mb-4">
                    There are <span className="font-semibold">no specific age restrictions</span> for using the Website or the App. However, we encourage parents and guardians to supervise the use of online tools by minors.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">7. Intellectual Property</h3>
                <p className="mb-2">
                    All content on Rivridis.com and the Rivridis Assistant app, including text, graphics, logos, software, and trademarks, are the property of Rivridis or its licensors and are protected by applicable intellectual property laws.
                </p>
                <p className="mb-4">
                    You may not copy, modify, distribute, sell, or lease any part of our Service without explicit written permission.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">8. Acceptable Use</h3>
                <p className="mb-2">You agree not to:</p>
                <ul className="list-disc list-inside mb-4 text-left pl-4">
                    <li>Use the Service for any unlawful purpose;</li>
                    <li>Attempt to reverse-engineer or extract source code from the App;</li>
                    <li>Interfere with or disrupt the operation of the Website or App;</li>
                    <li>Use automated systems to access the Website or App without permission.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">9. Third-Party Links and Services</h3>
                <p className="mb-4">
                    The Service does <span className="font-semibold">not integrate third-party services</span> such as analytics, advertising, or external APIs. However, we may link to third-party sites for user convenience. We are not responsible for the content or privacy practices of those sites.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">10. Disclaimer of Warranties</h3>
                <p className="mb-4">
                    The Service is provided on an "as is" and "as available" basis. We make no warranties or representations regarding the accuracy, reliability, or availability of the Service.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">11. Limitation of Liability</h3>
                <p className="mb-4">
                    To the fullest extent permitted by law, Rivridis shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Service.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">12. Governing Law</h3>
                <p className="mb-4">
                    These Terms shall be governed by and construed in accordance with the laws of <span className="font-semibold">India</span>, without regard to conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the courts located in <span className="font-semibold">Chennai, Tamil Nadu</span>.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">13. Modifications</h3>
                <p className="mb-4">
                    We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated effective date. Continued use of the Service after changes constitutes your acceptance of the revised Terms.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-2 text-[#2d2a26]">14. Contact Us</h3>
                <p>
                    If you have any questions about these Terms, you may contact us via the Website’s contact form or by emailing <span className="font-semibold">info@rivridis.com</span>.
                </p>
            </section>
            <Footer />
        </main>
    );
}
