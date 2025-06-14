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
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
                <p className="mb-6">
                    <strong>Effective Date:</strong> 14-06-25
                </p>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">TL;DR</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>We only collect your email if you use our contact form.</li>
                        <li>We don’t create user accounts or collect app usage data.</li>
                        <li>We do not share or sell your data to third parties.</li>
                        <li>No ads, no trackers, no cookies.</li>
                        <li>We're based in India and comply with local privacy regulations.</li>
                    </ul>
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
                <p className="mb-4">
                    This Privacy Policy describes how Rivridis.com ("we", "our", or "us") collects, uses, and protects your information when you visit our website or use the Rivridis Assistant app ("Service").
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">2. Information We Collect</h2>
                <p>We collect minimal personal information:</p>
                <ul className="list-disc list-inside mb-4">
                    <li>
                        <strong>Email Address:</strong> Collected only if you contact us through the website’s contact form.
                    </li>
                </ul>

                <p className="mb-2">
                    <strong>We do not:</strong>
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Track your activity on the site or app.</li>
                    <li>Collect personal data through cookies or analytics tools.</li>
                    <li>Allow users to create accounts.</li>
                    <li>Store or access your conversations with the AI assistant.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">3. How We Use Your Information</h2>
                <p className="mb-4">
                    The email address you submit is used solely to respond to your inquiries or support requests. We do not use your email for marketing or any third-party services.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Sharing</h2>
                <p className="mb-4">
                    We do <strong>not</strong> sell, rent, or share your personal data with any third parties.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h2>
                <p className="mb-4">
                    We take reasonable steps to protect your data from unauthorized access. However, no method of transmission over the internet is 100% secure.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">6. Children’s Privacy</h2>
                <p className="mb-4">
                    We do not knowingly collect any personal data from children. If we become aware of such data being submitted, we will delete it promptly.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">7. International Data Transfers</h2>
                <p className="mb-4">
                    We operate in India. By using our Service, you consent to the processing of your information in India, where privacy laws may differ from those in your jurisdiction.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">8. Your Rights</h2>
                <p>You may contact us at any time to:</p>
                <ul className="list-disc list-inside mb-4">
                    <li>Request access to your personal data</li>
                    <li>Ask for deletion of your data</li>
                    <li>Withdraw consent</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">9. Changes to This Policy</h2>
                <p className="mb-4">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
                <p>
                    If you have any questions or requests regarding this Privacy Policy, please contact us at  <strong>info@rivridis.com</strong>.
                </p>
            </section>
            <Footer />
        </main>
    );
}
