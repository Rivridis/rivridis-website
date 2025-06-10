"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeroTitle() {
  const fullText = "Rivridis Inc.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100); // Typing speed (ms per character)

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.h1
      className="text-7xl font-extrabold text-zinc-900 tracking-tight mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      <span className="animate-pulse">|</span>
    </motion.h1>
  );
}
