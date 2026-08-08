import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;

    let frame: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 250);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const bars = 24;
  const filled = Math.round((progress / 100) * bars);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-4/5 max-w-sm text-center">
            <p className="eyebrow mb-4 text-cyan/80">
              INITIALIZING SECURE CONNECTION
            </p>
            <div className="font-mono text-xs text-ink/70 mb-3 tracking-widest">
              [{"█".repeat(filled)}
              {"░".repeat(bars - filled)}] {progress}%
            </div>
            <p className="font-mono text-[10px] text-secgreen/80 tracking-[0.35em]">
              {progress >= 100 ? "● SYSTEM ONLINE" : "ESTABLISHING HANDSHAKE..."}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
