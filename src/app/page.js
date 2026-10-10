"use client";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SmoothBackgroundWrapper from "./components/background";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Clapperboard,
  Cpu,
  Music4,
  ChevronDown,
  Sparkles,
  Layers,
  Gamepad2,
  MessagesSquare,
  Rocket,
} from "lucide-react";

/* ---------- small animation primitives (same palette, no new colors) ---------- */

function Reveal({ children, delay = 0, y = 28, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.65, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] ${
        dark ? "text-[#0C1016]/70" : "text-[#B6AD90]"
      }`}
    >
      <span
        className={`h-px w-8 ${dark ? "bg-[#0C1016]/40" : "bg-[#B6AD90]/60"}`}
      />
      {children}
      <span
        className={`h-px w-8 ${dark ? "bg-[#0C1016]/40" : "bg-[#B6AD90]/60"}`}
      />
    </p>
  );
}

const EASE = [0.21, 0.65, 0.35, 1];

const portfolio = [
  {
    icon: Bot,
    tag: "Desktop · Local LLMs",
    title: "Rivridis AI",
    desc: "A Windows assistant built with PySide 6 that talks to local LLMs to call functions, automate tasks, and assist, private by design.",
    href: "/rivridis-assistant",
  },
  {
    icon: Music4,
    tag: "Open Source · Audio",
    title: "Riv MelodyKit",
    desc: "A lightweight, open-source DAW focused on fast music sketching and beat making. Small footprint, fast ideas.",
    href: "/melodykit",
  },
  {
    icon: Clapperboard,
    tag: "Web · React / Next.js",
    title: "Riv MediaGuess",
    desc: "A movie-guessing web app that shows stills and challenges you to name the film. Built with React and Next.js.",
    href: "https://github.com/Rivridis/MediaGuesser",
  },
];

const stack = [
  { src: "/skills/cpp.png", name: "C++", note: "Performance" },
  { src: "/skills/python.png", name: "Python", note: "Apps & AI" },
  { src: "/skills/react.png", name: "React", note: "Web UI" },
  { src: "/skills/QT.png", name: "Qt", note: "Desktop" },
  { src: "/skills/torch.png", name: "PyTorch", note: "ML" },
  { src: "/skills/ue5.png", name: "UE5", note: "Games" },
];

const ticker = ["Gaming", "Software", "Design"];

export default function Home() {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  // Hero parallax: content drifts up + fades as the sheet scrolls over it.
  const heroOpacity = useTransform(scrollY, [0, 650], [1, 0]);
  const heroY = useTransform(scrollY, [0, 650], [0, -90]);
  const heroBgScale = useTransform(scrollY, [0, 900], [1, 1.08]);
  const cueOpacity = useTransform(scrollY, [0, 180], [1, 0]);

  return (
    <div className="relative min-h-screen bg-[#0C1016] text-[#ede9e5] antialiased selection:bg-[#e2d5a6] selection:text-[#0C1016]">
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[#e2d5a6]"
      />

      {/* Navbar */}
      <div className="fixed inset-x-0 top-0 z-50">
        <Navbar />
      </div>

      {/* ============ 1. FIXED HERO — stays in place, content scrolls over ============ */}
      <motion.div style={{ scale: heroBgScale }} className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.png')" }}
        />
        {/* legibility wash that keeps the palette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#ede9e5]/10 via-transparent to-[#0C1016]/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(12,16,22,0.28)_100%)]" />
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="pointer-events-none fixed inset-0 z-[1] flex items-center justify-center px-6"
      >
        <header className="pointer-events-auto mx-auto w-full max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
            className="mt-6 text-5xl font-normal leading-[1.02] tracking-wide text-[#0C1016] sm:text-6xl md:text-8xl"
          >
            RIVRIDIS STUDIO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
            className="mx-auto mt-6 max-w-xl text-sm font-medium uppercase tracking-[0.22em] text-[#f0f3f7] sm:text-xl"
          >
            Turning ideas into interactive software
          </motion.p>

          
        </header>

        <motion.a
          href="#about"
          style={{ opacity: cueOpacity }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-auto absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[#0C1016]/70 transition-colors hover:text-[#0C1016]"
          aria-label="Scroll to content"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white">Scroll</span>
          <ChevronDown className="h-5 w-5 text-white" />
        </motion.a>
      </motion.div>

      {/* ============ 2. SCROLL-OVER SHEET ============ */}
      <div className="relative z-10 mt-[100svh]">
        <div className="overflow-hidden rounded-t-[1.75rem] border-t border-white/10 bg-[#0C1016] shadow-[0_-24px_80px_-24px_rgba(0,0,0,0.7)] md:rounded-t-[2.5rem]">
          {/* ticker */}
          <div className="overflow-hidden border-b border-white/10 py-4">
            <div className="flex w-max animate-marquee items-center gap-8 pr-8">
              {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
                <span
                  key={i}
                  className="flex items-center gap-8 text-xs font-medium uppercase tracking-[0.3em] text-[#ede9e5]/45"
                >
                  {t}
                  <span className="h-1 w-1 rounded-full bg-[#B6AD90]/70" />
                </span>
              ))}
            </div>
          </div>

          {/* ABOUT */}
          <section id="about" className="scroll-mt-24 px-6 py-20 md:py-28">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div>
                <Reveal>
                  <Eyebrow>About us</Eyebrow>
                  <h2 className="mt-4 text-2xl font-normal uppercase leading-snug tracking-wide md:text-3xl">
                    Turning ideas into interactive software
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-[#ede9e5]/60">
                    A small studio with a simple belief that, the best technology starts with a
                    simple idea and the drive to make it real.
                  </p>
                  <a
                    href="/contact"
                    className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#e2d5a6] transition-colors hover:text-[#006eff]"
                  >
                    Contact us
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Reveal>

                <Reveal delay={0.16} className="mt-10 grid grid-cols-3 gap-4">
                  {[
                    { icon: Gamepad2, label: "Games" },
                    { icon: Layers, label: "Apps & Web" },
                    { icon: Sparkles, label: "Design" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center"
                    >
                      <Icon className="mx-auto h-5 w-5 text-[#889cb8]" />
                      <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-[#ede9e5]/70">
                        {label}
                      </p>
                    </div>
                  ))}
                </Reveal>
              </div>

              <div className="flex flex-col justify-center gap-6 lg:border-l lg:border-white/10 lg:pl-16">
                {[
                  "From sleek Windows applications to immersive web platforms and games, we bring ideas to life that engage, and entertain users.",
                  "We focus on seamless design, solid performance, and user-centered development so every interaction feels meaningful.",
                  "Driven by innovation, we build interactive and intelligent software that pushes boundaries and shapes what's next.",
                ].map((text, i) => (
                  <Reveal key={i} delay={0.08 * i}>
                    <div className="flex gap-5">
                      <span className="mt-1 font-mono text-xs text-[#B6AD90]">
                        0{i + 1}
                      </span>
                      <p className="text-base leading-relaxed text-[#ede9e5]/75 md:text-lg">
                        {text}
                      </p>
                    </div>
                    {i < 2 && <div className="mt-6 h-px bg-white/10" />}
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </div>

        <SmoothBackgroundWrapper>
          {/* PORTFOLIO */}
          <section id="work" className="scroll-mt-24 px-6 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow>Portfolio</Eyebrow>
                  <h2 className="mt-4 max-w-xl text-2xl font-normal uppercase leading-snug tracking-wide md:text-3xl">
                    Our work speaks for itself
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-[#ede9e5]/60">
                  Each and every one of the software below is crafted with love from Rivridis Studio.
                </p>
              </Reveal>

              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {portfolio.map((p, i) => (
                  <motion.a
                    key={p.title}
                    href={p.href}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
                    whileHover={{ y: -8 }}
                    className="group flex min-h-[340px] flex-col rounded-3xl border border-white/10 bg-[#0C1016]/85 p-7 shadow-xl backdrop-blur transition-shadow hover:shadow-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#889cb8]/20 text-[#e2d5a6]">
                        <p.icon className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-[#ede9e5]/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#e2d5a6]" />
                    </div>
                    <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.22em] text-[#889cb8]">
                      {p.tag}
                    </p>
                    <h3 className="mt-2 text-base font-normal uppercase tracking-[0.12em]">{p.title}</h3>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#ede9e5]/65">
                      {p.desc}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e2d5a6] transition-colors group-hover:text-[#006eff]">
                      View page
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          {/* TECHNOLOGY — same card DNA as portfolio */}
          <section className="px-6 py-20 md:py-24">
            <div className="mx-auto max-w-6xl">
              <Reveal className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow>Technology</Eyebrow>
                  <h2 className="mt-4 text-2xl font-normal uppercase tracking-wide md:text-3xl">
                    The stack behind our software
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-[#ede9e5]/60">
                  The same toolkit behind every card above, chosen for speed,
                  reliability, and creative control.
                </p>
              </Reveal>

              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {stack.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                    whileHover={{ y: -8 }}
                    className="group relative flex flex-col items-center rounded-3xl border border-white/10 bg-[#0C1016]/85 px-4 pb-6 pt-7 text-center shadow-xl backdrop-blur transition-shadow hover:shadow-2xl"
                  >
                    <span className="absolute left-5 top-4 font-mono text-[10px] tracking-widest text-[#ede9e5]/30">
                      0{i + 1}
                    </span>
                    <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-[#889cb8]/20 p-2.5 ring-1 ring-white/10 transition-colors group-hover:ring-[#e2d5a6]/40">
                      <img
                        src={s.src}
                        alt={s.name}
                        className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </span>
                    <p className="mt-4 text-xs font-normal uppercase tracking-[0.14em] text-[#ede9e5]">
                      {s.name}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#889cb8]">
                      {s.note}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Reveal delay={0.1} className="mt-6">
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {[
                    { icon: Cpu, label: "Built for performance" },
                    { icon: Gamepad2, label: "Shipped for play" },
                    { icon: Sparkles, label: "Designed with care" },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0C1016]/60 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[#ede9e5]/60"
                    >
                      <Icon className="h-3.5 w-3.5 text-[#e2d5a6]" />
                      {label}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* COLLABORATION — dark CTA card, same language as portfolio cards */}
          <section className="px-6 pb-24 pt-4 md:pb-32">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <div className="relative overflow-hidden rounded-[2rem] bg-[#0C1016] px-6 py-14 text-center shadow-2xl ring-1 ring-white/10 md:px-12 md:py-20">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(136,156,184,0.35),transparent_70%)]" />
                  <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#e2d5a6]/60 to-transparent" />
                  <div className="relative">
                    <div className="flex justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[#e2d5a6]">
                        <MessagesSquare className="h-3.5 w-3.5" />
                        Open to select projects
                      </span>
                    </div>
                    <div className="mt-5 flex justify-center">
                      <Eyebrow>Collaboration</Eyebrow>
                    </div>
                    <h2 className="mx-auto mt-4 max-w-xl text-2xl font-normal uppercase leading-snug tracking-wide text-[#ede9e5] md:text-3xl">
                      Let&apos;s build together
                    </h2>
                    <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-[#ede9e5]/60 md:text-base">
                      We occasionally collaborate on projects that inspire us — from
                      innovative apps to creative game ideas.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                      <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="group inline-flex items-center gap-2 rounded-full bg-[#e2d5a6] px-7 py-3.5 text-sm font-medium text-[#0C1016] shadow-xl transition-colors hover:bg-[#ede9e5]"
                      >
                        Have an idea? Let&apos;s talk
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </motion.a>
                      <a
                        href="#work"
                        className="inline-flex items-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-[#ede9e5] transition-colors hover:bg-white/5"
                      >
                        See our work
                      </a>
                    </div>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                      {[
                        { icon: Rocket, label: "Prototype to launch" },
                        { icon: Layers, label: "Design + code" },
                        { icon: Gamepad2, label: "Apps · Web · Games" },
                      ].map(({ icon: Icon, label }) => (
                        <span
                          key={label}
                          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#ede9e5]/45"
                        >
                          <Icon className="h-3.5 w-3.5 text-[#889cb8]" />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </SmoothBackgroundWrapper>

        <Footer />
      </div>
    </div>
  );
}
