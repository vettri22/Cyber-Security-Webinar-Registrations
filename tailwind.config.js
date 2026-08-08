/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#04070D",
        panel: "#0A101C",
        panel2: "#0D1526",
        cyan: {
          DEFAULT: "#00E5FF",
          dim: "#0A6E7C",
        },
        neonblue: "#3B82F6",
        violet: "#8B5CF6",
        secgreen: "#00FFA3",
        ink: "#D8E6F5",
        muted: "#5C7591",
        line: "#16233A",
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        heading: ["Rajdhani", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,229,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.06) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(0,229,255,0.15), transparent 60%)",
      },
      boxShadow: {
        neon: "0 0 20px rgba(0,229,255,0.35), 0 0 60px rgba(59,130,246,0.15)",
        "neon-violet": "0 0 20px rgba(139,92,246,0.35)",
        "neon-green": "0 0 16px rgba(0,255,163,0.4)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 1 },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drift: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "80px 80px" },
        },
      },
      animation: {
        scan: "scan 6s linear infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        floaty: "floaty 5s ease-in-out infinite",
        drift: "drift 12s linear infinite",
      },
    },
  },
  plugins: [],
};
