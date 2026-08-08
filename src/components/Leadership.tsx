import { motion } from "framer-motion";
import { ShieldHalf, UserRound } from "lucide-react";
import { EVENT_CONFIG } from "../config";

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-24 px-5 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-3 text-center">THE PEOPLE BEHIND IT</p>
        <h2 className="font-display text-2xl sm:text-4xl font-black text-ink text-neon text-center mb-14">
          CLUB LEADERSHIP
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_CONFIG.leadership.map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6, rotateX: 2 }}
              className="glass rounded-2xl p-6 text-center flex flex-col items-center hover:shadow-neon transition-shadow"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cyan/40 bg-panel2 overflow-hidden">
                {leader.photo ? (
                  <img src={leader.photo} alt={leader.name} className="h-full w-full object-cover" />
                ) : (
                  <UserRound className="text-cyan/70" size={26} />
                )}
              </div>
              <h3 className="font-heading text-base sm:text-lg font-semibold text-ink">
                {leader.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted mt-1">{leader.designation}</p>
              <div className="mt-4 flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1">
                <ShieldHalf size={12} className="text-cyan" />
                <span className="font-mono text-[10px] tracking-widest text-cyan">
                  {leader.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
