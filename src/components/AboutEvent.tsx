import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { EVENT_CONFIG } from "../config";

export default function AboutEvent() {
  const { heading, paragraphs, strapline } = EVENT_CONFIG.aboutEvent;

  return (
    <section id="about" className="relative py-24 px-5 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="glass relative rounded-3xl p-8 sm:p-12 overflow-hidden"
        >
          {/* decorative rotating ring */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-cyan/20" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-violet/20 animate-[spin_18s_linear_infinite]" />

          <p className="eyebrow mb-3 flex items-center gap-2">
            <ShieldCheck size={14} /> {heading}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-6">
            Know the threat. Own your defense.
          </h2>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-ink/85 max-w-3xl">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <p className="mt-8 font-mono text-xs tracking-[0.35em] text-secgreen">
            {strapline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
