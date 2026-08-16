export function ScrollInertiaZone() {
  return (
    <section className="relative w-full aspect-square overflow-hidden border border-[#222] bg-[#0A0A0A] group" aria-labelledby="scroll-inertia-title">
      <div className="absolute top-0 left-0 p-6 pointer-events-none z-30 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent w-full"><h3 id="scroll-inertia-title" className="text-[11px] font-mono text-white/90 uppercase tracking-[0.2em] mb-3">07 — Scroll Inertia</h3><p className="text-[10px] font-mono text-white/40 max-w-[240px] uppercase leading-relaxed tracking-wider">Studies how native momentum scrolling can preserve context in a compact content field.</p></div>
      <div className="h-full overflow-y-auto px-6 pt-36 pb-20 flex flex-col gap-4" aria-label="Scrollable inertia study items">{[1, 2, 3, 4, 5, 6].map((item) => <div key={item} className="shrink-0 h-24 border border-white/10 rounded-xl relative overflow-hidden flex items-center justify-between p-6 bg-white/[0.02]"><img src="/kinetic-field.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" style={{ filter: `hue-rotate(${item * 60}deg) saturate(1.5)` }} /><div className="absolute inset-0 bg-black/60" /><span className="font-mono text-xs text-white/60 relative font-bold tracking-widest">ITEM 0{item}</span><span className="w-8 h-8 rounded-full border border-white/20 relative" aria-hidden="true" /></div>)}</div>
    </section>
  );
}
