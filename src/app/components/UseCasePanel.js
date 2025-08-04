"use client"
import { useState } from "react";

const useCases = [
  {
    title: "Tech & Development Teams",
    content: "Accelerate software development with AI-assisted code generation, debugging, documentation, and contextual search across internal wikis, logs, and APIs. \n Rivridis Assistant can be customized to integrate with version control systems, issue trackers, and internal dev workflows.",
  },
  {
    title: "Education & Training",
    content: "Enhance learning and content delivery by using AI to summarize study material, generate quizzes, and help instructors search through PDFs, presentations, or recorded lectures. \n Customize Rivridis Assistant for LMS integration or on-campus deployments to maintain privacy.",
  },
  {
    title: "Sales & Retail Teams",
    content: "Automate sales queries, product lookups, and competitor research using Rivridis Assistant with Google Search integration. \nGenerate reports, proposals, or CRM summaries instantly. \nCustomize workflows for store-level operations or remote sales teams.",
  },
  {
    title: "Customer Support & Service",
    content: "Boost support teams with AI-powered responses, ticket triage, and instant access to documentation or policy references. \n Rivridis Assistant can plug into your helpdesk tools or knowledge base for fast, consistent support delivery.",
  },
  {
    title: "HR & Operations",
    content: "Use AI agents to streamline onboarding, draft internal policy documents, and assist with routine HR queries. \n Rivridis Assistant can be tailored to handle FAQs, policy lookup, and HR document parsing — all while staying private and offline.",
  },
];

export default function UseCasePanel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="use-cases" className="w-full max-w-4xl mx-auto mb-20 pt-15">
      <h2 className="text-6xl font-bold text-center mb-8 text-[#2d2a26]">Use Cases</h2>
      <div className="flex flex-col md:flex-row bg-zinc-800 shadow-lg whitespace-pre-line rounded-2xl overflow-hidden min-h-[400px]">
        {/* Left Panel: Titles */}
        <div className="bg-[#1a1a1a] w-full md:w-1/2 p-4 flex flex-col">
          {useCases.map((uc, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-full text-left px-4 py-6 rounded-lg transition-all ${
                activeIndex === index
                  ? "bg-zinc-800 text-[#b6ad90] font-semibold shadow"
                  : "hover:bg-zinc-800/70 text-[#b6ad90]"
              }`}
            >
              {uc.title}
            </button>
          ))}
        </div>

        {/* Right Panel: Explanation */}
        <div className="w-full md:w-1/2 p-6">
          <p className="text-lg text-[#ede9e5]">{useCases[activeIndex].content}</p>
        </div>
      </div>
    </section>
  );
}
