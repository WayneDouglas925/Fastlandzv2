
import React, { useState, useEffect } from 'react';
import { FastSession, FastingStatus } from '../types';

interface FastingTimerProps {
  session: FastSession | null;
  onStart: () => void;
  onEnd: () => void;
}

const FastingTimer: React.FC<FastingTimerProps> = ({ session, onStart, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let interval: any;
    if (session && session.status === 'FASTING') {
      const update = () => {
        const now = new Date().getTime();
        const start = new Date(session.startTime).getTime();
        const end = new Date(session.targetEndTime).getTime();
        const total = end - start;
        const remaining = end - now;
        
        const currentProgress = Math.min(100, Math.max(0, ((now - start) / total) * 100));
        
        setTimeLeft(Math.max(0, remaining));
        setProgress(currentProgress);

        // Auto-complete when timer reaches 0
        if (remaining <= 0 && currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onEnd(), 500); // Small delay for UX
        }
      };

      update();
      interval = setInterval(update, 1000);
    } else {
      setTimeLeft(0);
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [session, onEnd]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isFasting = session?.status === 'FASTING';
  const getBodyStatus = () => {
    if (progress < 25) return { label: 'Digesting Fuel', color: 'text-slate-500' };
    if (progress < 50) return { label: 'Ketosis Loading...', color: 'text-green-500' };
    if (progress < 75) return { label: 'Burning Glycogen', color: 'text-green-400' };
    return { label: 'Autophagy Active', color: 'text-green-300' };
  };

  const status = getBodyStatus();

  // Format times for display
  const formatDisplayTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDisplayDate = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black/60 border-2 border-cyan-500/20 rounded-[2.5rem] relative overflow-hidden animate-in zoom-in duration-500">
      {/* HUD Details */}
      <div className="absolute top-6 left-8 flex items-center gap-2">
         <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
         <span className="text-[9px] font-black uppercase font-mono text-green-500 tracking-widest">Live Protocol</span>
      </div>
      <div className="absolute top-6 right-8">
         <div className="px-2 py-0.5 bg-green-500/10 border border-cyan-500/20 rounded text-[8px] font-bold text-green-500 uppercase font-mono tracking-tighter">Zone: {status.label}</div>
      </div>

      <div className="relative w-72 h-72 flex items-center justify-center mt-6">
        {/* Glow behind ring */}
        <div className="absolute inset-8 rounded-full bg-green-500/5 blur-3xl"></div>
        
        {/* SVG Progress Ring */}
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="144"
            cy="144"
            r="125"
            fill="transparent"
            stroke="#166534"
            strokeWidth="10"
            className="opacity-10"
          />
          <circle
            cx="144"
            cy="144"
            r="125"
            fill="transparent"
            stroke="#22c55e"
            strokeWidth="10"
            strokeDasharray="785"
            strokeDashoffset={785 - (785 * progress) / 100}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]"
          />
        </svg>

        <div className="text-center z-10 space-y-2">
          <p className="text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest">Time Remaining</p>
          <p className="text-6xl font-black font-mono tracking-tighter tabular-nums text-white">
            {formatTime(timeLeft)}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 border border-cyan-500/30 rounded-full">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.334-.398-1.817a1 1 0 00-1.487-.876 6.721 6.721 0 00-3.186 5.73c0 3.517 2.826 6.269 5.732 6.269 1.096 0 2.108-.324 2.956-.882.528-.347 1.018-.749 1.415-1.122.413-.389.758-.775 1.019-1.133a10.055 10.055 0 001.734-4.246 1.207 1.207 0 00-.466-1.075 1.202 1.202 0 00-1.114-.14c-.334.114-.66.235-.973.351-.384.143-.762.284-1.144.407-.156.05-.316.1-.476.143a1.573 1.573 0 01-1.039-.368 1.583 1.583 0 01-.593-1.042c-.015-.226.012-.447.079-.662.13-.41.348-.808.577-1.15.228-.34.467-.621.642-.82a1 1 0 00-.13-1.402z" clipRule="evenodd" /></svg>
            <span className="text-[9px] font-black uppercase font-mono tracking-widest text-green-500">
               {status.label}
            </span>
          </div>
          <p className="text-[10px] font-bold font-mono text-slate-500 uppercase">{progress.toFixed(0)}% Complete</p>
        </div>
      </div>

      {/* Zone Progress Bar */}
      <div className="w-full max-w-xs mt-8 space-y-2">
         <div className="flex justify-between text-[8px] font-mono text-slate-600 uppercase font-bold tracking-widest">
            <span>Zone Progress</span>
            <span>{progress.toFixed(0)}%</span>
         </div>
         <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-cyan-500/15">
            <div 
              className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
         </div>
         <p className="text-[8px] font-mono text-slate-600 uppercase text-center animate-pulse">Approaching peak fat oxidation</p>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-2 w-full">
         <HudCard label="Start Time" value={session ? formatDisplayTime(session.startTime) : '--'} sub={session ? formatDisplayDate(session.startTime) : ''} />
         <HudCard label="Target End" value={session ? formatDisplayTime(session.targetEndTime) : '--'} sub={session ? formatDisplayDate(session.targetEndTime) : ''} />
         <HudCard label="Fast Type" value="Warrior" sub={`Day ${session?.dayNumber || 1}`} />
         <HudCard label="Status" value="Fasting" color="text-green-500" />
      </div>

      <div className="mt-6 w-full">
         <button
           onClick={onEnd}
           className={`w-full ${timeLeft <= 0 ? 'bg-green-500 text-black shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-105' : 'bg-black border border-red-900/30 text-red-900/60 hover:text-red-500 hover:border-red-500'} transition-all py-4 rounded-xl font-black uppercase font-mono text-sm tracking-widest`}
         >
           {timeLeft <= 0 ? '✓ Mission Complete' : 'Abort Mission Early'}
         </button>
      </div>
    </div>
  );
};

const HudCard = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) => (
  <div className="bg-slate-900/40 p-3 rounded-xl border border-green-900/10 flex flex-col items-center justify-center text-center">
     <p className="text-[8px] text-slate-600 font-mono uppercase font-bold mb-1">{label}</p>
     <p className={`text-[11px] font-black font-mono leading-none ${color || 'text-white'}`}>{value}</p>
     {sub && <p className="text-[7px] text-slate-600 font-mono uppercase mt-1">{sub}</p>}
  </div>
);

export default FastingTimer;
