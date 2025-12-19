
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Onboarding from './components/Onboarding';
import LandingPage from './components/LandingPage';
import VictoryScreen from './components/VictoryScreen';
import Journal from './components/Journal';
import { UserProfile, FastSession, DailyLog } from './types';
import { CHALLENGE_DAYS } from './constants';
import { getSurvivalAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [session, setSession] = useState<FastSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [survivalAdvice, setSurvivalAdvice] = useState<string>("");
  const [showLanding, setShowLanding] = useState(true);
  const [selectedMapDay, setSelectedMapDay] = useState<number | null>(null);
  const [showVictory, setShowVictory] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('fastlandz_user');
    const savedSession = localStorage.getItem('fastlandz_session');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.hasOnboarded) {
        setShowLanding(false);
      }
    }
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('fastlandz_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (session) localStorage.setItem('fastlandz_session', JSON.stringify(session));
    else localStorage.removeItem('fastlandz_session');
  }, [session]);

  useEffect(() => {
    const fetchAdvice = async () => {
      if (user) {
        const advice = await getSurvivalAdvice(user.currentDay, user.warriorName);
        setSurvivalAdvice(advice);
      }
    };
    if (user) fetchAdvice();
  }, [user?.currentDay, user?.warriorName]);

  const handleOnboarding = (profile: UserProfile) => {
    setUser({ 
      ...profile, 
      completedObjectives: [], 
      waterRations: 0,
      dailyLogs: {} 
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
    if (new Date() >= new Date(session.targetEndTime)) {
      handleMissionSuccess();
    } else {
      alert("Mission Aborted. Return to perimeter.");
    }
    setSession(null);
  };

  const handleMissionSuccess = () => {
    if (!user) return;
    const isDay7 = user.currentDay === 7;
    setUser(prev => {
      if (!prev) return null;
      const nextDay = Math.min(7, prev.currentDay + (isDay7 ? 0 : 1));
      return {
        ...prev,
        xp: prev.xp + 100,
        level: Math.floor((prev.xp + 100) / 1000) + 1,
        currentDay: nextDay,
        streak: prev.completedHabits.includes(prev.currentDay.toString()) ? prev.streak + 1 : prev.streak,
        waterRations: 0 
      };
    });
    if (isDay7) setShowVictory(true);
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
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-green-500 font-mono">Archives</h2>
            <div className="bg-black/40 border-neon border p-8 rounded-3xl space-y-6">
               <h3 className="text-lg font-bold uppercase tracking-widest font-mono flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>Live Survival Brief</h3>
               <p className="text-xl leading-relaxed italic text-slate-200">"{survivalAdvice || "Syncing with satellites..."}"</p>
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
