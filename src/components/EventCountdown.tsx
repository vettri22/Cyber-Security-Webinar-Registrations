import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { EVENT_CONFIG } from "../config";
import { formatClock, getEventDateTime, getTimezoneAbbreviation } from "../lib/time";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

function computeTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    isLive: false,
  };
}

function CountdownCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="glass w-20 sm:w-28 rounded-2xl py-4 sm:py-6 flex flex-col items-center shadow-neon">
      <span className="font-display text-2xl sm:text-4xl font-black text-cyan text-neon tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-mono text-[9px] sm:text-[10px] tracking-widest text-muted">
        {label}
      </span>
    </div>
  );
}

export default function EventCountdown() {
  const target = useMemo(
    () =>
      getEventDateTime(
        EVENT_CONFIG.eventDate,
        EVENT_CONFIG.eventTime,
        EVENT_CONFIG.timezone
      ),
    []
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft(target));
  const [clock, setClock] = useState(() => formatClock(new Date(), EVENT_CONFIG.timezone));

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(computeTimeLeft(target));
      setClock(formatClock(new Date(), EVENT_CONFIG.timezone));
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const dateLabel = useMemo(() => {
    const [year, month, day] = EVENT_CONFIG.eventDate.split("-").map(Number);
    const d = new Date(Date.UTC(year, month - 1, day));
    return d
      .toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" })
      .toUpperCase();
  }, []);

  return (
    <section id="event" className="relative py-24 px-5 sm:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow mb-3">EVENT DATE</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl sm:text-5xl font-black text-ink text-neon mb-10 tracking-wide"
        >
          {dateLabel}
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-14">
          <div className="glass rounded-2xl px-6 py-4 flex items-center gap-3">
            <CalendarDays className="text-cyan" size={18} />
            <div className="text-left">
              <p className="font-mono text-[10px] text-muted tracking-widest">DATE</p>
              <p className="font-heading text-sm text-ink">{EVENT_CONFIG.eventDate.split("-").reverse().join("-")}</p>
            </div>
          </div>
          <div className="glass rounded-2xl px-6 py-4 flex items-center gap-3">
            <Clock className="text-cyan" size={18} />
            <div className="text-left">
              <p className="font-mono text-[10px] text-muted tracking-widest">TIME</p>
              <p className="font-heading text-sm text-ink">{EVENT_CONFIG.eventTimeDisplay}</p>
            </div>
          </div>
          <div className="glass rounded-2xl px-6 py-4 flex items-center gap-3">
            <MapPin className="text-cyan" size={18} />
            <div className="text-left">
              <p className="font-mono text-[10px] text-muted tracking-widest">VENUE</p>
              <p className="font-heading text-sm text-ink">{EVENT_CONFIG.venue}</p>
            </div>
          </div>
        </div>

        <p className="eyebrow mb-5">INAUGURATION COUNTDOWN</p>

        {timeLeft.isLive ? (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-secgreen text-lg tracking-widest flex items-center justify-center gap-2"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-secgreen animate-pulseGlow" />
            EVENT IS LIVE
          </motion.p>
        ) : (
          <div className="flex justify-center gap-3 sm:gap-5">
            <CountdownCard value={timeLeft.days} label="DAYS" />
            <CountdownCard value={timeLeft.hours} label="HOURS" />
            <CountdownCard value={timeLeft.minutes} label="MINUTES" />
            <CountdownCard value={timeLeft.seconds} label="SECONDS" />
          </div>
        )}

        <div className="mt-12 inline-flex flex-col items-center">
          <p className="font-mono text-[10px] text-muted tracking-widest mb-2">LIVE CLOCK</p>
          <p className="font-display text-2xl sm:text-3xl text-ink text-neon tabular-nums">
            {clock}
          </p>
          <p className="font-mono text-[10px] text-cyan tracking-widest mt-1">
            {getTimezoneAbbreviation(EVENT_CONFIG.timezone)}
          </p>
        </div>
      </div>
    </section>
  );
}
