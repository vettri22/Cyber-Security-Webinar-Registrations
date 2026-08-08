import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EVENT_CONFIG } from "../config";
import CyberScene from "./CyberScene";

export default function Hero() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden pt-28 pb-10"
    >
      <CyberScene />
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />

      {/* Top bar: college branding + register CTA */}
      <div className="relative z-10 flex items-start justify-between px-5 sm:px-10">
        <div className="flex items-center gap-3">
          <img
            src={EVENT_CONFIG.collegeLogo}
            alt={`${EVENT_CONFIG.collegeName} logo`}
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-full bg-white/5 p-1"
          />
          <div>
            <p className="font-heading text-sm sm:text-base font-semibold text-ink leading-tight max-w-[10rem] sm:max-w-xs">
              {EVENT_CONFIG.collegeName}
            </p>
            <p className="font-mono text-[10px] text-secgreen tracking-widest mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-secgreen animate-pulseGlow" />
              SYSTEM ONLINE
            </p>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={() => scrollTo("#register")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0 rounded-full border border-cyan/60 bg-cyan/5 px-4 sm:px-6 py-2 sm:py-2.5 font-mono text-[11px] sm:text-xs tracking-widest text-cyan shadow-neon hover:bg-cyan/10 transition-colors"
        >
          REGISTER NOW
        </motion.button>
      </div>

      {/* Centerpiece */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 mt-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-6"
        >
          <div className="absolute inset-0 rounded-full bg-cyan/20 blur-2xl animate-pulseGlow" />
          <div className="relative rounded-full border border-cyan/40 p-1.5 shadow-neon">
            <img
              src={EVENT_CONFIG.clubLogo}
              alt={`${EVENT_CONFIG.clubName} logo`}
              className="h-24 w-24 sm:h-28 sm:w-28 object-contain rounded-full"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="eyebrow mb-3"
        >
          {EVENT_CONFIG.clubName}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-ink text-neon tracking-tight leading-tight max-w-4xl"
        >
          {EVENT_CONFIG.eventTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-mono text-cyan/90 tracking-[0.3em] text-xs sm:text-sm mt-4"
        >
          {EVENT_CONFIG.eventSubtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-5 max-w-md text-sm sm:text-base text-muted"
        >
          {EVENT_CONFIG.eventTagline}
        </motion.p>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollTo("#about")}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="relative z-10 mx-auto mt-6 flex flex-col items-center gap-1 text-muted hover:text-cyan transition-colors"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}
