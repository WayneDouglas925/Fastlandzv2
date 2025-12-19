
import React from 'react';

interface VictoryScreenProps {
  onReset: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ onReset }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-[#050a05] text-white flex flex-col items-center justify-center p-6 font-mono overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10 animate-in fade-in zoom-in duration-1000">
        <div className="flex flex-col items-center gap-8">
           <div className="relative group">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-yellow-700 via-yellow-400 to-yellow-900 border-4 border-yellow-200/50 flex items-center justify-center shadow-[0_0_80px_rgba(234,179,8,0.4)] group-hover:scale-105 transition-transform duration-700">
                 <div className="text-center bg-[#3d2b1f] w-[90%] h-[90%] rounded-full flex flex-col items-center justify-center border-2 border-yellow-600/50">
                   <p className="text-[8px] font-black text-yellow-600 uppercase tracking-widest">Master</p>
                   <p className="text-4xl font-black text-yellow-500 drop-shadow-lg">LEGEND</p>
                   <p className="text-[8px] font-black text-yellow-600 uppercase tracking-widest">Survivor lvl 7</p>
                 </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-black font-black text-[10px] uppercase rounded-full shadow-lg">Apex Protocol Secured</div>
           </div>

           <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                EASY MODE: <br/>
                <span className="text-green-500 neon-glow">CONQUERED</span>
              </h1>
              <p className="text-lg font-bold uppercase tracking-widest text-green-300">Welcome to the Hunger Zone, Legend.</p>
           </div>

           <p className="text-slate-500 italic max-w-md mx-auto leading-relaxed border-x border-green-900/20 px-4">
             "Your metabolic engine is now self-sustaining. You have purged the sludge. The wasteland belongs to you."
           </p>

           <div className="w-full space-y-4 pt-8">
              <button onClick={onReset} className="w-full bg-green-500 text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xl transition-all shadow-[0_0_50px_rgba(34,197,94,0.4)] hover:scale-[1.02]">
                ENTER INTERMEDIATE MODE
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VictoryScreen;
