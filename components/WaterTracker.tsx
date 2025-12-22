
import React from 'react';

interface WaterTrackerProps {
  currentCups: number;
  targetCups: number;
  onUpdate: (cups: number) => void;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ currentCups, targetCups, onUpdate }) => {
  const progress = Math.min(100, Math.round((currentCups / targetCups) * 100));

  return (
    <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/30 p-6 rounded-[2rem] space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.334-.398-1.817a1 1 0 00-1.487-.876 6.721 6.721 0 00-3.186 5.73c0 3.517 2.826 6.269 5.732 6.269 1.096 0 2.108-.324 2.956-.882.528-.347 1.018-.749 1.415-1.122.413-.389.758-.775 1.019-1.133a10.055 10.055 0 001.734-4.246 1.207 1.207 0 00-.466-1.075 1.202 1.202 0 00-1.114-.14c-.334.114-.66.235-.973.351-.384.143-.762.284-1.144.407-.156.05-.316.1-.476.143a1.573 1.573 0 01-1.039-.368 1.583 1.583 0 01-.593-1.042c-.015-.226.012-.447.079-.662.13-.41.348-.808.577-1.15.228-.34.467-.621.642-.82a1 1 0 00-.13-1.402z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-black uppercase tracking-widest text-base font-mono text-white">💧 Hydration Tracker</h3>
            <p className="text-xs text-blue-400 font-mono">Recommended during your fast</p>
          </div>
        </div>
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle cx="28" cy="28" r="22" fill="transparent" stroke="#1e293b" strokeWidth="4" />
            <circle cx="28" cy="28" r="22" fill="transparent" stroke="#60a5fa" strokeWidth="4" strokeDasharray="138.2" strokeDashoffset={138.2 - (138.2 * progress) / 100} strokeLinecap="round" />
          </svg>
          <span className="absolute text-xs font-black text-blue-400">{progress}%</span>
        </div>
      </div>

      {/* Progress Text */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-center">
        <p className="text-sm font-mono text-blue-300">
          <span className="text-2xl font-black text-blue-400">{currentCups}</span>
          <span className="text-slate-500"> / </span>
          <span className="text-lg font-bold text-slate-400">{targetCups} cups</span>
        </p>
        <p className="text-[10px] text-blue-400/60 font-mono uppercase tracking-wider mt-1">
          {currentCups >= targetCups ? '🎉 Hydration Goal Achieved!' : `${targetCups - currentCups} cups remaining`}
        </p>
      </div>

      {/* Water Cups Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {Array.from({ length: targetCups }).map((_, i) => (
          <button
            key={i}
            onClick={() => onUpdate(i + 1)}
            className={`aspect-square rounded-xl border-2 transition-all flex items-center justify-center transform hover:scale-110 ${
              i < currentCups
                ? 'bg-blue-500/30 border-blue-400 text-blue-300 shadow-[0_0_15px_rgba(96,165,250,0.4)] scale-105'
                : 'bg-slate-900/50 border-slate-700 text-slate-600 hover:border-blue-500/50 hover:bg-slate-800'
            }`}
            title={`Cup ${i + 1}`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.334-.398-1.817a1 1 0 00-1.487-.876 6.721 6.721 0 00-3.186 5.73c0 3.517 2.826 6.269 5.732 6.269 1.096 0 2.108-.324 2.956-.882.528-.347 1.018-.749 1.415-1.122.413-.389.758-.775 1.019-1.133a10.055 10.055 0 001.734-4.246 1.207 1.207 0 00-.466-1.075 1.202 1.202 0 00-1.114-.14c-.334.114-.66.235-.973.351-.384.143-.762.284-1.144.407-.156.05-.316.1-.476.143a1.573 1.573 0 01-1.039-.368 1.583 1.583 0 01-.593-1.042c-.015-.226.012-.447.079-.662.13-.41.348-.808.577-1.15.228-.34.467-.621.642-.82a1 1 0 00-.13-1.402z" clipRule="evenodd" />
            </svg>
          </button>
        ))}
      </div>

      {/* Celebration Message */}
      {currentCups >= targetCups && (
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/50 rounded-xl p-4 text-center animate-pulse">
          <p className="text-sm font-black text-blue-300 uppercase tracking-wider">
            ⚡ Hydration Complete! Your body is optimized for the fast.
          </p>
        </div>
      )}

      <p className="text-[10px] text-blue-400/70 font-mono italic text-center uppercase tracking-widest border-t border-blue-500/20 pt-4">
        Hydration improves mental clarity and reduces false hunger signals during your fast.
      </p>
    </div>
  );
};

export default WaterTracker;
