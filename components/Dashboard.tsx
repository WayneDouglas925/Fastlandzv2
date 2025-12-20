
import React, { useState, useEffect } from 'react';
import { UserProfile, DayConfig, FastSession, DailyLog } from '../types';
import FastingTimer from './FastingTimer';
import WaterTracker from './WaterTracker';

interface DashboardProps {
  user: UserProfile;
  dayConfig: DayConfig;
  session: FastSession | null;
  onStartFast: () => void;
  onEndFast: () => void;
  onCompleteHabit: () => void;
  onToggleObjective: (id: string) => void;
  onUpdateWater: (cups: number) => void;
  onSaveLog: (log: DailyLog) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  dayConfig, 
  session, 
  onStartFast, 
  onEndFast, 
  onCompleteHabit,
  onToggleObjective,
  onUpdateWater,
  onSaveLog
}) => {
  const currentLog = user.dailyLogs[dayConfig.dayNumber] || { hunger: 5, mood: "", meals: "", lessons: "", timestamp: new Date().toISOString() };
  const [logMood, setLogMood] = useState(currentLog.mood);
  const [hungerLevel, setHungerLevel] = useState(currentLog.hunger);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    setLogMood(currentLog.mood);
    setHungerLevel(currentLog.hunger);
  }, [dayConfig.dayNumber, user.dailyLogs]);

  const isFasting = session?.status === 'FASTING';
  const habitCompleted = user.completedHabits.includes(dayConfig.dayNumber.toString());
  const fastCompleted = (user.completedFasts || []).includes(dayConfig.dayNumber.toString());

  const handleHabitComplete = () => {
    if (!habitCompleted && fastCompleted) {
      onCompleteHabit();
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handleQuickSave = () => {
    onSaveLog({ ...currentLog, hunger: hungerLevel, mood: logMood });
    alert("QUICK LOG SYNCED: Daily status updated.");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>
          <div className="relative z-10 text-center animate-in zoom-in fade-in duration-500">
            <h2 className="text-6xl md:text-8xl font-black italic uppercase font-mono text-green-500 neon-glow">
              MISSION <br/> SECURED
            </h2>
            <p className="text-xl font-mono text-white mt-4 tracking-[0.5em] animate-pulse">
              +25 XP EVOLUTION
            </p>
          </div>
        </div>
      )}

      {/* Header Status */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em] font-mono">Mission Status: {isFasting ? 'Active' : 'Standby'}</p>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white font-mono leading-none">
            DAY {dayConfig.dayNumber}: <br/>
            <span className="text-green-500 neon-glow">{dayConfig.title}</span>
          </h2>
          <p className="text-slate-400 font-medium uppercase text-xs tracking-widest">{dayConfig.subtitle}</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
           <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase font-mono text-green-500 tracking-wider">Streak: {user.streak} Days</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Briefing & Protocols */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Mission Briefing Card */}
          <div className="bg-black/40 border border-green-900/30 p-8 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="font-black uppercase tracking-[0.2em] text-sm font-mono text-white">Mission Briefing</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed italic border-l-4 border-green-500/50 pl-6 py-1 mb-8">
               "{dayConfig.objective}"
            </p>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-2">Sector Protocols</p>
              {dayConfig.protocols.map((protocol) => {
                const isDone = user.completedObjectives.includes(protocol.id);
                return (
                  <button 
                    key={protocol.id}
                    onClick={() => onToggleObjective(protocol.id)}
                    className={`w-full flex items-start gap-4 p-5 rounded-2xl border transition-all text-left ${isDone ? 'bg-green-500/10 border-green-500/50' : 'bg-black/60 border-green-900/20 hover:border-green-500/30'}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 shrink-0 mt-1 flex items-center justify-center ${isDone ? 'bg-green-500 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'border-slate-800'}`}>
                      {isDone && <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
                    </div>
                    <div>
                      <h4 className={`font-black uppercase tracking-widest text-xs sm:text-sm ${isDone ? 'text-green-400' : 'text-slate-200'}`}>{protocol.label}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{protocol.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <WaterTracker
            currentCups={user.waterRations}
            targetCups={8}
            onUpdate={onUpdateWater}
          />

          {!isFasting && (
            <div className="bg-black/40 border border-green-900/30 p-8 rounded-[2rem] space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black uppercase tracking-[0.2em] text-sm font-mono text-white">Sync Chronometer</h3>
                <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                   <span className="text-[9px] font-bold text-slate-500 uppercase font-mono">Engine Idle</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-green-900/10 text-center">
                  <p className="text-[9px] text-slate-600 font-mono uppercase mb-1">Target Window</p>
                  <p className="text-2xl font-black text-white">{dayConfig.fastDuration} HR</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-green-900/10 text-center">
                  <p className="text-[9px] text-slate-600 font-mono uppercase mb-1">Mode</p>
                  <p className="text-2xl font-black text-green-500 italic uppercase">Survivor</p>
                </div>
              </div>

              <button 
                onClick={onStartFast}
                className="w-full bg-green-500 hover:bg-green-400 text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xl transition-all shadow-[0_0_40px_rgba(34,197,94,0.4)] flex items-center justify-center gap-3 group"
              >
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                Start Engine
              </button>
            </div>
          )}

          {isFasting && (
            <FastingTimer session={session} onStart={onStartFast} onEnd={onEndFast} />
          )}

        </div>

        {/* Right Column: Intel & Log */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Wasteland Intel */}
          <div className="bg-black/40 border border-green-900/30 rounded-[2rem] overflow-hidden flex flex-col h-fit">
            <div className="p-6 bg-green-900/10 border-b border-green-900/30 flex items-center justify-between">
              <h3 className="font-black uppercase tracking-[0.2em] text-xs font-mono text-green-500 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Wasteland Intel
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden relative group">
                <img src={`https://picsum.photos/seed/wasteland${dayConfig.dayNumber}/800/450`} className="w-full h-full object-cover grayscale opacity-50 transition-all group-hover:grayscale-0 group-hover:opacity-80" alt="Intel visual" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-black text-white italic font-mono uppercase leading-tight">{dayConfig.intelTitle}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-mono italic">
                  "{dayConfig.intelContent}"
                </p>
                <div className="pt-4 border-t border-green-900/20">
                   <p className="text-[10px] font-bold text-green-500 uppercase font-mono tracking-widest mb-1">Impact Analysis</p>
                   <p className="text-xs text-slate-500 italic">{dayConfig.physiologicalEffect}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Log */}
          <div className="bg-black/40 border border-green-900/30 p-8 rounded-[2.5rem] space-y-6">
             <div className="flex items-center gap-3">
               <h3 className="font-black uppercase tracking-[0.2em] text-sm font-mono text-white">Quick Log</h3>
             </div>

             <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono uppercase text-slate-500">
                    <span>Hunger</span>
                    <span className="text-green-500">{hungerLevel}/10</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" 
                    value={hungerLevel}
                    onChange={(e) => setHungerLevel(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase text-slate-500">Bio-Observation (Mood)</label>
                  <input 
                    type="text"
                    value={logMood}
                    onChange={(e) => setLogMood(e.target.value)}
                    placeholder="Describe mood..."
                    className="w-full bg-black/60 border border-green-900/30 rounded-xl p-3 text-sm font-mono text-slate-200 focus:outline-none focus:border-green-500 transition-all"
                  />
                </div>

                <button 
                  onClick={handleQuickSave}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-400 py-3 rounded-xl font-black uppercase font-mono text-[10px] tracking-widest transition-all"
                >
                  Quick Sync
                </button>
             </div>
          </div>

          <div className="bg-green-500/5 border-l-4 border-green-500 p-6 rounded-r-[2rem]">
             <span className="text-[10px] font-black uppercase text-green-500 tracking-widest font-mono">Survival Tip</span>
             <p className="text-sm text-slate-300 leading-relaxed italic mt-2">"{dayConfig.bonusTip}"</p>
          </div>

        </div>
      </div>

      <div className="pt-8 border-t border-green-900/30 flex flex-col items-center gap-4">
         {!fastCompleted && (
           <div className="text-center space-y-2">
             <div className="flex items-center gap-2 justify-center">
               <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
               </svg>
               <p className="text-sm font-mono text-yellow-500 uppercase tracking-wider">
                 Complete your {dayConfig.fastDuration}-hour fast to unlock mission rewards
               </p>
             </div>
           </div>
         )}
         <button
           onClick={handleHabitComplete}
           disabled={habitCompleted || !fastCompleted}
           className={`px-12 py-4 rounded-full font-black uppercase font-mono tracking-[0.3em] transition-all ${
             habitCompleted
               ? 'bg-green-900/20 text-green-900 cursor-not-allowed border border-green-900/30'
               : !fastCompleted
               ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-800/30'
               : 'bg-green-500 text-black shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:scale-105 active:scale-95'
           }`}
         >
           {habitCompleted ? 'Mission Protocol Secured' : `Complete Day ${dayConfig.dayNumber} Mission`}
         </button>
      </div>
    </div>
  );
};

export default Dashboard;
