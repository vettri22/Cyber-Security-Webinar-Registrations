import { motion } from "framer-motion";
import { ScanLine, UserRound } from "lucide-react";
import { EVENT_CONFIG } from "../config";

export default function GuestSpeaker() {
  const speaker = EVENT_CONFIG.guestSpeaker;
  const hasImage = Boolean(speaker.image);

  return (
    <section id="speaker" className="relative py-24 px-5 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow mb-3 text-center">GUEST SPEAKER</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink text-center mb-12">
          Meet the Speaker
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass relative rounded-3xl p-6 sm:p-10 grid md:grid-cols-[280px_1fr] gap-8 items-center overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-grid" />

          <div className="relative mx-auto">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-secgreen/50 bg-secgreen/10 px-3 py-1 font-mono text-[10px] tracking-widest text-secgreen z-10">
              FEATURED SPEAKER
            </span>

            <div className="relative h-56 w-56 rounded-2xl border border-cyan/40 shadow-neon overflow-hidden bg-panel2">
              {hasImage ? (
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
                  <UserRound size={48} />
                  <span className="font-mono text-[10px] tracking-widest">
                    PHOTO PENDING
                  </span>
                </div>
              )}

              {/* scanning animation overlay */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden opacity-40">
                <div className="h-16 w-full bg-gradient-to-b from-transparent via-cyan/70 to-transparent animate-scan" />
              </div>
              <div className="pointer-events-none absolute inset-0 border border-cyan/20 rounded-2xl" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 text-cyan">
              <ScanLine size={16} />
              <span className="font-mono text-[11px] tracking-widest">
                VERIFIED SPEAKER PROFILE
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-1">
              {speaker.name}
            </h3>
            <p className="font-mono text-xs text-muted mb-5 tracking-wide">
              {speaker.designation}
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-ink/85">
              {speaker.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
