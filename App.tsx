
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Onboarding from './components/Onboarding';
import LandingPage from './components/LandingPage';
import VictoryScreen from './components/VictoryScreen';
import Journal from './components/Journal';
import { UserProfile, FastSession, DailyLog } from './types';
import { CHALLENGE_DAYS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [session, setSession] = useState<FastSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [selectedMapDay, setSelectedMapDay] = useState<number | null>(null);
  const [showVictory, setShowVictory] = useState(false);
  const [showDeepDive, setShowDeepDive] = useState(false);
  const [showUnlockCelebration, setShowUnlockCelebration] = useState(false);
  const [unlockedDay, setUnlockedDay] = useState<number | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('fastlandz_user');
      const savedSession = localStorage.getItem('fastlandz_session');

      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          if (parsedUser.hasOnboarded) {
            setShowLanding(false);
          }
        } catch (parseError) {
          console.error('Failed to parse user data:', parseError);
          localStorage.removeItem('fastlandz_user');
        }
      }

      if (savedSession) {
        try {
          setSession(JSON.parse(savedSession));
        } catch (parseError) {
          console.error('Failed to parse session data:', parseError);
          localStorage.removeItem('fastlandz_session');
        }
      }
    } catch (error) {
      console.error('Failed to access localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem('fastlandz_user', JSON.stringify(user));
      } catch (error) {
        console.error('Failed to save user data:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem('fastlandz_session', JSON.stringify(session));
      } else {
        localStorage.removeItem('fastlandz_session');
      }
    } catch (error) {
      console.error('Failed to save session data:', error);
    }
  }, [session]);

  const handleMissionSuccess = () => {
    if (!user) return;
    const isDay7 = user.currentDay === 7;
    const willUnlockNewDay = !isDay7;

    setUser(prev => {
      if (!prev) return null;
      const nextDay = Math.min(7, prev.currentDay + (isDay7 ? 0 : 1));
      const currentDayKey = prev.currentDay.toString();

      // Mark current day's fast as completed
      const completedFasts = prev.completedFasts || [];
      const updatedCompletedFasts = completedFasts.includes(currentDayKey)
        ? completedFasts
        : [...completedFasts, currentDayKey];

      // Increment streak if this day's habit was completed
      const newStreak = prev.completedHabits.includes(currentDayKey) ? prev.streak + 1 : prev.streak;

      return {
        ...prev,
        xp: prev.xp + 100,
        level: Math.floor((prev.xp + 100) / 1000) + 1,
        currentDay: nextDay,
        streak: newStreak,
        waterRations: 0,
        completedFasts: updatedCompletedFasts
      };
    });

    if (isDay7) {
      setShowVictory(true);
    } else if (willUnlockNewDay) {
      // Show unlock celebration for next day
      setUnlockedDay(user.currentDay + 1);
      setShowUnlockCelebration(true);
      setTimeout(() => setShowUnlockCelebration(false), 4000);
    }
  };

  // Check if timer completed while app was closed
  useEffect(() => {
    if (session && session.status === 'FASTING' && user) {
      const now = new Date().getTime();
      const end = new Date(session.targetEndTime).getTime();
      
      if (now >= end) {
        // Timer finished while closed - auto-complete
        handleMissionSuccess();
        setSession(null);
      }
    }
  }, [session?.id, user?.currentDay]);

  const handleOnboarding = (profile: UserProfile) => {
    setUser({
      ...profile,
      completedObjectives: [],
      waterRations: 0,
      dailyLogs: {},
      completedFasts: []
    });
    setShowLanding(false);
  };

  const startFast = () => {
    if (!user) return;
    const currentDayConfig = CHALLENGE_DAYS[user.currentDay - 1];
    const targetEnd = new Date(new Date().getTime() + currentDayConfig.fastDuration * 60 * 60 * 1000);

    setSession({
      id: Math.random().toString(36).substr(2, 9),
      startTime: new Date().toISOString(),
      targetEndTime: targetEnd.toISOString(),
      status: 'FASTING',
      dayNumber: user.currentDay
    });
  };

  const endFast = () => {
    if (!session) return;
    const now = new Date().getTime();
    const targetEnd = new Date(session.targetEndTime).getTime();
    const timeRemaining = targetEnd - now;

    // Dynamic grace periods based on day (hidden from user)
    const getGracePeriod = (dayNumber: number): number => {
      if (dayNumber === 1) return 15 * 60 * 1000; // 15 minutes for Day 1
      return 2 * 60 * 60 * 1000; // 2 hours for Days 2-7
    };

    const gracePeriod = getGracePeriod(session.dayNumber);

    // Success if past target time OR within grace period
    if (timeRemaining <= gracePeriod) {
      handleMissionSuccess();
    } else {
      const minutesEarly = Math.ceil(timeRemaining / 60000);
      alert(`Mission Aborted. Return to perimeter.\n\nYou need ${minutesEarly} more minutes to complete this fast.`);
    }
    setSession(null);
  };

  const toggleObjective = (id: string) => {
    setUser(prev => {
      if (!prev) return null;
      const exists = prev.completedObjectives.includes(id);
      return {
        ...prev,
        completedObjectives: exists ? prev.completedObjectives.filter(o => o !== id) : [...prev.completedObjectives, id]
      };
    });
  };

  const completeHabit = (dayNumber: number) => {
    setUser(prev => prev ? {
      ...prev,
      xp: prev.xp + 25,
      completedHabits: [...prev.completedHabits, dayNumber.toString()]
    } : null);
  };

  const updateWater = (cups: number) => {
    setUser(prev => prev ? { ...prev, waterRations: cups } : null);
  };

  const saveLog = (day: number, log: DailyLog) => {
    if (!user) return;
    setUser(prev => prev ? {
      ...prev,
      dailyLogs: { ...prev.dailyLogs, [day]: log }
    } : null);
  };

  if (loading) return null;
  if (showLanding && (!user || !user.hasOnboarded)) return <LandingPage onStart={() => setShowLanding(false)} />;
  if (!user || !user.hasOnboarded) return <Onboarding onComplete={handleOnboarding} />;
  if (showVictory) return <VictoryScreen onReset={() => { localStorage.clear(); window.location.reload(); }} />;

  const currentDayConfig = CHALLENGE_DAYS[user.currentDay - 1];
  const activeMapDay = selectedMapDay ? CHALLENGE_DAYS[selectedMapDay - 1] : currentDayConfig;

  return (
    <>
      {/* Unlock Celebration Overlay */}
      {showUnlockCelebration && unlockedDay && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="relative z-10 text-center animate-in zoom-in slide-in-from-bottom duration-700 px-6">
            <div className="mb-6 flex justify-center">
              <div className="w-32 h-32 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-6xl md:text-8xl font-black italic uppercase font-mono text-green-500 neon-glow mb-4">
              DAY {unlockedDay}<br/>UNLOCKED
            </h2>
            <p className="text-xl md:text-2xl font-mono text-white tracking-[0.3em] uppercase">
              NEW SECTOR ACCESSIBLE
            </p>
            <p className="text-lg font-mono text-slate-400 mt-4 animate-pulse">
              +100 XP AWARDED
            </p>
          </div>
        </div>
      )}

      <Layout
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {activeTab === 'dashboard' && (
          <Dashboard 
            user={user} dayConfig={currentDayConfig} session={session}
            onStartFast={startFast} onEndFast={endFast} 
            onCompleteHabit={() => completeHabit(user.currentDay)}
            onToggleObjective={toggleObjective}
            onUpdateWater={updateWater}
            onSaveLog={(log) => saveLog(user.currentDay, log)}
          />
        )}

        {activeTab === 'journal' && (
          <Journal 
            user={user}
            onSaveLog={saveLog}
          />
        )}
        
        {activeTab === 'map' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-green-500 font-mono">Mission Map</h2>
            <div className="grid md:grid-cols-[1.2fr,1fr] gap-8">
              <div className="relative space-y-4">
                 <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-green-900/20 z-0"></div>
                 {CHALLENGE_DAYS.map((day, idx) => {
                   const isLocked = day.dayNumber > user.currentDay;
                   const isSelected = (selectedMapDay || user.currentDay) === day.dayNumber;
                   const isDone = day.dayNumber < user.currentDay;
                   return (
                     <button key={idx} onClick={() => setSelectedMapDay(day.dayNumber)} className={`w-full relative z-10 flex items-center gap-6 p-4 rounded-2xl border transition-all text-left ${isSelected ? 'bg-green-500/20 border-green-500 ring-2 ring-green-500/20' : isLocked ? 'bg-slate-900/30 border-slate-800 opacity-60' : 'bg-green-900/5 border-green-900/20'}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black font-mono text-xl shrink-0 ${isSelected ? 'bg-green-500 text-black' : isDone ? 'bg-green-900 text-green-400' : 'bg-slate-800 text-slate-500'}`}>{isDone ? '✓' : day.dayNumber}</div>
                        <div className="flex-grow">
                           <h4 className={`font-bold uppercase tracking-widest text-sm ${isSelected ? 'text-green-400' : ''}`}>{day.title}</h4>
                           <span className="text-[9px] font-mono text-slate-500">{day.fastDuration}H PROTOCOL</span>
                        </div>
                     </button>
                   );
                 })}
              </div>
              <div className="sticky top-24 h-fit bg-black/40 border border-green-500/30 rounded-3xl p-6 space-y-4">
                <h3 className="text-xl font-black uppercase font-mono italic text-green-500">Day {activeMapDay.dayNumber} Preview</h3>

                {activeMapDay.dayNumber > user.currentDay && (
                  <div className="p-4 bg-red-900/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <p className="text-[10px] font-black text-red-500 uppercase">SECTOR LOCKED</p>
                    </div>
                    <p className="text-xs text-slate-400">
                      Complete Day {user.currentDay} to unlock Day {activeMapDay.dayNumber}
                    </p>
                  </div>
                )}

                <div className="p-4 bg-slate-900/50 rounded-xl border border-green-900/20">
                  <p className="text-[10px] font-black text-green-500 uppercase mb-1">Mission</p>
                  <p className="text-sm text-slate-200">{activeMapDay.habit}</p>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-green-900/20">
                  <p className="text-[10px] font-black text-green-500 uppercase mb-1">Objective</p>
                  <p className="text-xs text-slate-400">{activeMapDay.objective}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'intel' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500 pb-20">
            <div className="space-y-2">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-green-500 font-mono">Intel Archives</h2>
              <p className="text-slate-500 font-medium">Educational content for metabolic survival training.</p>
            </div>
            
            <div className="bg-black/40 border border-green-500/30 rounded-3xl p-8 space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold uppercase tracking-widest font-mono text-green-500">
                     Day {currentDayConfig.dayNumber}: {currentDayConfig.title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                     {currentDayConfig.fastDuration}H Protocol
                  </span>
               </div>
               
               <div className="p-6 bg-green-900/10 border border-green-500/20 rounded-2xl">
                  <h4 className="text-lg font-black uppercase font-mono text-green-400 mb-3">
                     {currentDayConfig.intelTitle}
                  </h4>
                  <p className="text-slate-300 leading-relaxed italic text-lg">
                     "{currentDayConfig.intelContent}"
                  </p>
               </div>
               
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-900/50 border border-green-900/20 rounded-2xl">
                     <span className="text-[10px] font-black uppercase text-green-500 tracking-widest block mb-2">
                        Physiological Impact
                     </span>
                     <p className="text-sm text-slate-400 italic leading-relaxed">
                        {currentDayConfig.physiologicalEffect}
                     </p>
                  </div>
                  
                  <div className="p-6 bg-slate-900/50 border border-green-900/20 rounded-2xl">
                     <span className="text-[10px] font-black uppercase text-green-500 tracking-widest block mb-2">
                        Survival Tip
                     </span>
                     <p className="text-sm text-slate-400 italic leading-relaxed">
                        "{currentDayConfig.bonusTip}"
                     </p>
                  </div>
               </div>
               
               <div className="p-6 bg-green-500/5 border-l-4 border-green-500 rounded-r-2xl">
                  <span className="text-[10px] font-black uppercase text-green-500 tracking-widest block mb-2">
                     Mission Objective
                  </span>
                  <p className="text-slate-300 italic leading-relaxed">
                     {currentDayConfig.objective}
                  </p>
               </div>
               
               <div className="p-6 bg-black/60 border border-green-900/20 rounded-2xl">
                  <span className="text-[10px] font-black uppercase text-green-500 tracking-widest block mb-3">
                     Field Advice
                  </span>
                  <p className="text-slate-300 italic text-lg leading-relaxed">
                     "{currentDayConfig.survivalAdvice}"
                  </p>
               </div>

               {/* Deep Dive Educational Section */}
               <div className="border-t border-green-900/30 pt-6">
                  <button
                     onClick={() => setShowDeepDive(!showDeepDive)}
                     className="w-full flex items-center justify-between p-6 bg-green-500/5 hover:bg-green-500/10 border-2 border-green-500/30 hover:border-green-500/50 rounded-2xl transition-all group"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                           <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                           </svg>
                        </div>
                        <div className="text-left">
                           <h4 className="text-xl font-black uppercase font-mono text-green-500 tracking-wide">
                              📚 Deep Dive: Full Educational Brief
                           </h4>
                           <p className="text-xs text-slate-500 font-mono uppercase tracking-wider mt-1">
                              Advanced metabolic science & tactical strategies
                           </p>
                        </div>
                     </div>
                     <svg className={`w-6 h-6 text-green-500 transition-transform duration-300 ${showDeepDive ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                  </button>

                  {showDeepDive && (
                     <div className="mt-6 p-8 bg-slate-900/50 border border-green-500/20 rounded-2xl animate-in slide-in-from-top duration-500">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-green-900/30">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                           <span className="text-[10px] font-black uppercase text-green-500 tracking-[0.3em]">
                              Educational Content - For Informational Purposes Only
                           </span>
                        </div>
                        
                        <div className="prose prose-invert prose-green max-w-none">
                           {currentDayConfig.fullEducation.split('\n\n').map((paragraph, idx) => (
                              <p key={idx} className="text-slate-300 leading-relaxed mb-4 text-base">
                                 {paragraph}
                              </p>
                           ))}
                        </div>

                        <div className="mt-8 p-4 bg-yellow-900/10 border border-yellow-500/30 rounded-xl">
                           <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              <div>
                                 <h5 className="text-sm font-black uppercase text-yellow-500 mb-1">Medical Disclaimer</h5>
                                 <p className="text-xs text-slate-400 leading-relaxed">
                                    This content is for educational purposes only and does not constitute medical advice. 
                                    Consult a qualified healthcare provider before beginning any fasting protocol, especially if you have pre-existing medical conditions, 
                                    are pregnant, nursing, or taking medications. Fasting may not be appropriate for everyone.
                                 </p>
                              </div>
                           </div>
                        </div>

                        {currentDayConfig.milestoneHours.length > 0 && (
                           <div className="mt-6 p-6 bg-green-900/10 border border-green-500/20 rounded-xl">
                              <h5 className="text-sm font-black uppercase text-green-500 mb-3 tracking-wider">
                                 ⏱ Metabolic Milestones for Day {currentDayConfig.dayNumber}
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                 {currentDayConfig.milestoneHours.map((hour, idx) => (
                                    <div key={idx} className="px-3 py-1.5 bg-green-500/20 border border-green-500/40 rounded-lg">
                                       <span className="text-xs font-bold text-green-400 font-mono">{hour}H</span>
                                    </div>
                                 ))}
                              </div>
                              <p className="text-xs text-slate-500 mt-3 italic">
                                 Key physiological transitions occur at these hour marks during your fast.
                              </p>
                           </div>
                        )}
                     </div>
                  )}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
             <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full border-2 border-green-500 p-1 bg-slate-800 overflow-hidden relative">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.characterType}&gender=${user.characterType === 'neutral' ? 'both' : user.characterType}`} className="w-full h-full rounded-full grayscale scale-110" alt="Profile" />
                </div>
                <div>
                   <h2 className="text-3xl font-black uppercase font-mono italic tracking-tight">{user.warriorName}</h2>
                   <p className="text-slate-500 font-mono uppercase text-xs tracking-widest">Wasteland Survivor • Level {user.level}</p>
                </div>
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard label="Total XP" value={user.xp.toLocaleString()} />
                <StatCard label="Streak" value={`${user.streak}d`} />
                <StatCard label="Habits" value={user.completedHabits.length.toString()} />
                <StatCard label="Sector" value={user.currentDay.toString()} color="text-green-400" />
             </div>
             <button onClick={() => { if(confirm(" neural wipe?")) { localStorage.clear(); window.location.reload(); }}} className="w-full py-3 border border-red-900/30 text-red-500/50 uppercase font-mono text-[10px] tracking-widest rounded-lg">Reset Neural Net</button>
          </div>
        )}
      </Layout>
    </>
  );
};

const StatCard = ({ label, value, color }: { label: string; value: string; color?: string }) => (
  <div className="bg-black/40 border border-green-900/20 p-4 rounded-xl text-center">
    <p className="text-[10px] font-mono uppercase text-slate-500 mb-1">{label}</p>
    <p className={`text-xl font-black font-mono ${color || 'text-white'}`}>{value}</p>
  </div>
);

export default App;
