
import React from 'react';

interface WaterTrackerProps {
  currentCups: number;
  targetCups: number;
  onUpdate: (cups: number) => void;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ currentCups, targetCups, onUpdate }) => {
  const progress = Math.min(100, Math.round((currentCups / targetCups) * 100));

  return (
    <div className="bg-black/40 border border-green-900/30 p-6 rounded-[2rem] space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h3 className="font-black uppercase tracking-widest text-sm font-mono text-white">Water Rations</h3>
            <p className="text-[10px] text-blue-400/60 font-mono uppercase">{currentCups} / {targetCups} Cups</p>
          </div>
        </div>
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle cx="24" cy="24" r="20" fill="transparent" stroke="#1e293b" strokeWidth="3" />
            <circle cx="24" cy="24" r="20" fill="transparent" stroke="#60a5fa" strokeWidth="3" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * progress) / 100} strokeLinecap="round" />
          </svg>
          <span className="absolute text-[10px] font-black text-blue-400">{progress}%</span>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {Array.from({ length: targetCups }).map((_, i) => (
          <button
            key={i}
            onClick={() => onUpdate(i + 1)}
            className={`aspect-square rounded-xl border transition-all flex items-center justify-center ${
              i < currentCups 
                ? 'bg-blue-500/20 border-blue-400 text-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.3)]' 
                : 'bg-slate-900/50 border-slate-800 text-slate-700 hover:border-slate-600'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.334-.398-1.817a1 1 0 00-1.487-.876 6.721 6.721 0 00-3.186 5.73c0 3.517 2.826 6.269 5.732 6.269 1.096 0 2.108-.324 2.956-.882.528-.347 1.018-.749 1.415-1.122.413-.389.758-.775 1.019-1.133a10.055 10.055 0 001.734-4.246 1.207 1.207 0 00-.466-1.075 1.202 1.202 0 00-1.114-.14c-.334.114-.66.235-.973.351-.384.143-.762.284-1.144.407-.156.05-.316.1-.476.143a1.573 1.573 0 01-1.039-.368 1.583 1.583 0 01-.593-1.042c-.015-.226.012-.447.079-.662.13-.41.348-.808.577-1.15.228-.34.467-.621.642-.82a1 1 0 00-.13-1.402z" clipRule="evenodd" />
            </svg>
          </button>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 font-mono italic text-center uppercase tracking-widest">Hydration improves tactical focus and blunts fake hunger signals.</p>
    </div>
  );
};

export default WaterTracker;
