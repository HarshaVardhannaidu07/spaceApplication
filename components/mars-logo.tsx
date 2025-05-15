export function MarsLogo() {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-mars-500 animate-pulse-slow shadow-lg shadow-mars-500/30 flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full border-2 border-white/20 animate-spin-slow"></div>
          <div
            className="absolute w-20 h-20 rounded-full border border-white/10 animate-spin-slow"
            style={{ animationDirection: "reverse" }}
          ></div>
          <div className="text-white font-bold text-xl">M</div>
        </div>
      </div>
      <div className="ml-4">
        <h2 className="text-2xl font-bold text-space-900">ARES</h2>
        <p className="text-xs text-space-600 uppercase tracking-widest">Mars Exploration Division</p>
      </div>
    </div>
  )
}
