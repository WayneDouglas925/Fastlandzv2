
import React, { useState } from 'react';
import { UserProfile, DailyLog, DayConfig } from '../types';
import { CHALLENGE_DAYS } from '../constants';

interface JournalProps {
  user: UserProfile;
  onSaveLog: (day: number, log: DailyLog) => void;
}

const Journal: React.FC<JournalProps> = ({ user, onSaveLog }) => {
  const [selectedDay, setSelectedDay] = useState(user.currentDay);
  const currentDayLog = user.dailyLogs[selectedDay] || {
    hunger: 5,
    mood: "",
    meals: "",
    lessons: "",
    timestamp: new Date().toISOString()
  };

  const [formData, setFormData] = useState<DailyLog>(currentDayLog);

  const handleSave = () => {
    onSaveLog(selectedDay, { ...formData, timestamp: new Date().toISOString() });
    alert(`TRANSMISSION ARCHIVED: Sector ${selectedDay} data stored.`);
  };

  const handleDayChange = (day: number) => {
    setSelectedDay(day);
    const log = user.dailyLogs[day] || {
      hunger: 5,
      mood: "",
      meals: "",
      lessons: "",
      timestamp: new Date().toISOString()
    };
    setFormData(log);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500 pb-20">
      <div className="space-y-1">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-green-500 font-mono">Dossier: Daily Logs</h2>
        <p className="text-slate-400 font-medium">Archive your biological and cognitive shifts.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {CHALLENGE_DAYS.map((day) => {
          const isCurrent = day.dayNumber === user.currentDay;
          const isDone = user.dailyLogs[day.dayNumber];
          const isFuture = day.dayNumber > user.currentDay;

          return (
            <button
              key={day.dayNumber}
              disabled={isFuture && day.dayNumber !== selectedDay}
              onClick={() => handleDayChange(day.dayNumber)}
              className={`px-6 py-3 rounded-xl border font-black uppercase font-mono text-xs tracking-widest shrink-0 transition-all ${
                selectedDay === day.dayNumber
                  ? 'bg-green-500 text-black border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                  : isDone 
                  ? 'bg-green-900/20 border-green-900/40 text-green-400'
                  : isFuture
                  ? 'bg-slate-900/30 border-slate-800 text-slate-700 opacity-50'
                  : 'bg-black/40 border-slate-800 text-slate-400 hover:border-green-500/30'
              }`}
            >
              Day {day.dayNumber} {isDone ? '✓' : ''}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-black/40 border border-green-900/30 p-8 rounded-[2rem] space-y-6">
            <h3 className="font-black uppercase tracking-widest text-sm font-mono text-green-500">Bio-Status Matrix</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono uppercase text-slate-500">
                  <span>Hunger Scarcity</span>
                  <span className="text-green-500">{formData.hunger}/10</span>
                </div>
                <input 
                  type="range" min="1" max="10" 
                  value={formData.hunger}
                  onChange={(e) => setFormData({...formData, hunger: parseInt(e.target.value)})}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-slate-500">Neuro-State (Mood)</label>
                <input 
                  type="text"
                  value={formData.mood}
                  onChange={(e) => setFormData({...formData, mood: e.target.value})}
                  placeholder="Calm, anxious, focused, sharp..."
                  className="w-full bg-black/60 border border-green-900/30 rounded-xl p-4 text-sm font-mono text-slate-200 focus:outline-none focus:border-green-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-green-900/30 p-8 rounded-[2rem] space-y-4">
            <h3 className="font-black uppercase tracking-widest text-sm font-mono text-green-500">Cognitive Intake (Lessons)</h3>
            <textarea 
              value={formData.lessons}
              onChange={(e) => setFormData({...formData, lessons: e.target.value})}
              placeholder="What have you learned about your body or mind today?"
              className="w-full h-40 bg-black/60 border border-green-900/30 rounded-xl p-4 text-sm font-mono text-slate-200 focus:outline-none focus:border-green-500 transition-all resize-none"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-black/40 border border-green-900/30 p-8 rounded-[2rem] space-y-4">
            <h3 className="font-black uppercase tracking-widest text-sm font-mono text-green-500">Fuel Allocation (Meals)</h3>
            <textarea 
              value={formData.meals}
              onChange={(e) => setFormData({...formData, meals: e.target.value})}
              placeholder="Record all intake during your feeding window..."
              className="w-full h-64 bg-black/60 border border-green-900/30 rounded-xl p-4 text-sm font-mono text-slate-200 focus:outline-none focus:border-green-500 transition-all resize-none"
            />
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-green-500 text-black py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xl transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:scale-[1.02]"
          >
            Archive Transmission
          </button>
        </div>
      </div>

      {user.dailyLogs[selectedDay] && (
        <div className="p-4 border border-green-500/10 rounded-xl bg-green-500/5 text-center">
           <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
             Last sync: {new Date(user.dailyLogs[selectedDay].timestamp).toLocaleString()}
           </p>
        </div>
      )}
    </div>
  );
};

export default Journal;
