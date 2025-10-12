"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function SmoothBackgroundWrapper({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.7 0.7", "0.8 0.8"], 
    // start changing around 50% in view, fully changed before bottom
  });

  // Smooth easing of scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // Map scroll progress to colors
  const backgroundColor = useTransform(
    smoothProgress,
    [0, 1],
    ["#0C1016", "#889cb8"],
    { clamp: true }
  );

  return (
    <motion.div
      ref={ref}
      style={{ backgroundColor }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
