import { ShieldCheck } from "lucide-react";
import { EVENT_CONFIG } from "../config";

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-5 sm:px-10 py-10">
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2 text-cyan">
          <ShieldCheck size={18} />
          <span className="font-display text-sm tracking-widest">
            {EVENT_CONFIG.clubName}
          </span>
        </div>
        <p className="font-mono text-[11px] tracking-[0.35em] text-secgreen">
          SECURE • DEFEND • INNOVATE
        </p>

        {EVENT_CONFIG.socialLinks.length > 0 && (
          <div className="flex gap-4 mt-1">
            {EVENT_CONFIG.socialLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-muted hover:text-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <p className="font-mono text-[10px] text-muted mt-4">
          © 2026 Cyber Security Club
        </p>
      </div>
    </footer>
  );
}
