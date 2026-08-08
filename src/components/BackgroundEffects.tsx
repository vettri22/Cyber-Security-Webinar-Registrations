export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base void */}
      <div className="absolute inset-0 bg-void" />

      {/* Perspective grid */}
      <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />

      {/* Ambient glows */}
      <div className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full bg-cyan/10 blur-[140px]" />
      <div className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-violet/10 blur-[140px]" />
      <div className="absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-neonblue/10 blur-[140px]" />

      {/* Scanline sweep */}
      <div className="absolute inset-x-0 top-0 h-full overflow-hidden opacity-[0.15]">
        <div className="h-40 w-full bg-gradient-to-b from-transparent via-cyan/70 to-transparent animate-scan" />
      </div>
    </div>
  );
}
