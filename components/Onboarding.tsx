
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [experience, setExperience] = useState<'rookie' | 'survivor' | 'legend'>('rookie');
  const [characterType, setCharacterType] = useState<'male' | 'female' | 'neutral'>('female');
  const [acceptRules, setAcceptRules] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleFinish = () => {
    if (name && acceptRules) {
      onComplete({
        warriorName: name,
        characterType: characterType,
        currentDay: 1,
        xp: experience === 'legend' ? 500 : experience === 'survivor' ? 250 : 0,
        level: experience === 'legend' ? 2 : 1,
        hasOnboarded: true,
        streak: 0,
        completedHabits: []
      });
    }
  };

  const nextStep = () => setStep(prev => prev + 1);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      nextStep();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050a05] text-white flex flex-col items-center justify-center p-6 font-mono overflow-hidden">
      {/* Background Grids & Scans */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#166534_1px,transparent_1px),linear-gradient(to_bottom,#166534_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-xl w-full relative z-10">
        {step === 1 && (
          <div className="space-y-12 text-center animate-in fade-in slide-in-from-bottom duration-700">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-green-500/30 bg-green-500/5 rounded text-[10px] uppercase font-bold tracking-widest text-green-500">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                Inbound Signal Detected
              </div>
              <h1 className="text-6xl sm:text-7xl font-black tracking-tighter uppercase italic neon-glow">
                JOIN THE <br /><span className="text-green-500">RESISTANCE</span>
              </h1>
              <p className="text-slate-400 text-lg font-medium max-w-md mx-auto leading-relaxed">
                The food industry has colonized your metabolism. It's time to take it back.
              </p>
            </div>
            
            <button 
              onClick={nextStep}
              className="w-full group relative overflow-hidden bg-green-500 hover:bg-green-400 text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-lg transition-all shadow-[0_0_40px_rgba(34,197,94,0.3)]"
            >
              Initiate Neural Link →
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="space-y-2">
              <h2 className="text-3xl font-black italic uppercase tracking-tight text-green-500">BIO-SCAN: EXPERIENCE</h2>
              <p className="text-slate-400 text-sm">Tell us your history with metabolic scarcity.</p>
            </div>

            <div className="grid gap-4">
              <ExperienceOption 
                active={experience === 'rookie'} 
                onClick={() => setExperience('rookie')}
                title="Rookie Scavenger"
                desc="I've never missed a meal by choice. Help me start."
              />
              <ExperienceOption 
                active={experience === 'survivor'} 
                onClick={() => setExperience('survivor')}
                title="Wasteland Survivor"
                desc="I skip breakfast occasionally. I know the hunger."
              />
              <ExperienceOption 
                active={experience === 'legend'} 
                onClick={() => setExperience('legend')}
                title="Metabolic Legend"
                desc="I've fasted for days. Put me in the Deep Zone."
              />
            </div>

            <button 
              onClick={startScan}
              disabled={isScanning}
              className="w-full bg-slate-900 border border-green-500/30 hover:border-green-500 text-green-500 py-4 rounded-xl font-black uppercase tracking-widest transition-all relative overflow-hidden"
            >
              {isScanning ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></span>
                  Analyzing Vitals...
                </span>
              ) : "Proceed to Archetype →"}
              {isScanning && <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-black italic uppercase tracking-tight text-green-500">SELECT ARCHETYPE</h2>
              <p className="text-slate-400 text-sm">Choose your visual profile for the mission.</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <ArchetypeCard 
                active={characterType === 'female'} 
                onClick={() => setCharacterType('female')}
                label="Vanguard"
                sub="Female Scout"
                img={`https://api.dicebear.com/7.x/avataaars/svg?seed=vanguard&gender=female&style=transparent&top=shavedSide`}
              />
              <ArchetypeCard 
                active={characterType === 'male'} 
                onClick={() => setCharacterType('male')}
                label="Sentinel"
                sub="Male Operator"
                img={`https://api.dicebear.com/7.x/avataaars/svg?seed=sentinel&gender=male&style=transparent&top=shortHair`}
              />
            </div>

            <button 
              onClick={nextStep}
              className="w-full bg-green-500 text-black py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(34,197,94,0.2)]"
            >
              Confirm Archetype →
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="space-y-2">
              <h2 className="text-3xl font-black italic uppercase tracking-tight text-green-500">THE 7-DAY DIRECTIVE</h2>
              <p className="text-slate-400 text-sm">A phased extraction of metabolic toxins.</p>
            </div>

            <div className="space-y-4 bg-black/40 border border-cyan-500/15 p-6 rounded-3xl">
              <DirectiveStep num="01-02" title="The Reset" color="bg-green-900/50" />
              <DirectiveStep num="03-04" title="The Adaptation" color="bg-green-700/50" />
              <DirectiveStep num="05-06" title="The Cleanse" color="bg-green-500/50" />
              <DirectiveStep num="07" title="The Apex Shift" color="bg-green-400/80" />
              
              <div className="pt-4 border-t border-cyan-500/20 mt-4">
                <p className="text-[10px] text-slate-500 uppercase leading-relaxed">
                  * Note: Each day introduces a new microhabit. Failure to complete a habit will halt your streak progression.
                </p>
              </div>
            </div>

            <button 
              onClick={nextStep}
              className="w-full bg-green-500 text-black py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(34,197,94,0.2)]"
            >
              Confirm Deployment →
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500 bg-black/60 border border-cyan-500/20 p-8 rounded-[2.5rem] shadow-2xl">
            <div className="text-center space-y-2">
               <h2 className="text-4xl font-black uppercase italic tracking-tighter text-green-500">Final Identity</h2>
               <p className="text-slate-500 text-xs tracking-widest uppercase">Seal your fate in the Fastlandz database.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-green-500 uppercase tracking-[0.3em]">Survivor Moniker</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Alias..."
                    className="w-full bg-black/50 border-2 border-green-900/50 rounded-2xl p-5 text-xl text-white focus:outline-none focus:border-green-500 transition-all font-black uppercase placeholder:text-slate-800"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                 <ToggleRow 
                   active={acceptRules} 
                   onClick={() => setAcceptRules(!acceptRules)}
                   label="I accept the metabolic risks."
                   sub="High hunger and focus spikes expected."
                 />
                 <ToggleRow 
                   active={true} 
                   onClick={() => {}}
                   label="Sync Neural Net (Local Only)"
                   sub="Data stays in your browser's core."
                 />
              </div>

              <button 
                onClick={handleFinish}
                disabled={!name || !acceptRules}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xl transition-all ${name && acceptRules ? 'bg-green-500 text-black shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:scale-[1.02]' : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}
              >
                BEGIN MISSION
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer System Status */}
      <footer className="fixed bottom-8 flex gap-8 text-[8px] uppercase tracking-[0.4em] text-slate-700 font-bold">
        <span>Status: Onboarding</span>
        <span>|</span>
        <span>Secure Connection: Active</span>
        <span>|</span>
        <span>Protocol: 007-Metabolic</span>
      </footer>
    </div>
  );
};

const ArchetypeCard = ({ active, onClick, label, sub, img }: { active: boolean; onClick: () => void; label: string; sub: string; img: string }) => (
  <button 
    onClick={onClick}
    className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 text-center ${active ? 'bg-green-500/10 border-green-500' : 'bg-black/40 border-cyan-500/15'}`}
  >
    <div className={`w-24 h-24 rounded-full border-2 overflow-hidden bg-slate-800/50 ${active ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-slate-800 grayscale'}`}>
      <img src={img} className="w-full h-full object-cover" alt={label} />
    </div>
    <div>
      <h4 className={`font-black uppercase tracking-widest text-sm ${active ? 'text-green-400' : 'text-slate-400'}`}>{label}</h4>
      <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">{sub}</p>
    </div>
  </button>
);

const ExperienceOption = ({ active, onClick, title, desc }: { active: boolean; onClick: () => void; title: string; desc: string }) => (
  <button 
    onClick={onClick}
    className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex items-start gap-4 ${active ? 'bg-green-500/10 border-green-500' : 'bg-black/20 border-cyan-500/15 hover:border-green-500/30'}`}
  >
    <div className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 ${active ? 'border-green-500' : 'border-slate-700'}`}>
      {active && <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>}
    </div>
    <div>
      <h4 className={`font-black uppercase tracking-widest text-sm ${active ? 'text-green-400' : 'text-slate-400'}`}>{title}</h4>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  </button>
);

const DirectiveStep = ({ num, title, color }: { num: string; title: string; color: string }) => (
  <div className="flex items-center gap-4">
    <div className={`w-12 h-1 bg-green-900 rounded-full overflow-hidden shrink-0`}>
      <div className={`h-full ${color} w-full animate-pulse`}></div>
    </div>
    <div className="flex-grow flex items-center justify-between">
      <span className="text-[10px] font-bold text-slate-600">Day {num}</span>
      <span className="text-xs font-black uppercase text-slate-300">{title}</span>
    </div>
  </div>
);

const ToggleRow = ({ active, onClick, label, sub }: { active: boolean; onClick: () => void; label: string; sub: string }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between p-4 bg-black/40 border border-cyan-500/15 rounded-2xl cursor-pointer hover:bg-black/60 transition-colors"
  >
    <div className="flex flex-col">
      <span className={`text-xs font-black uppercase ${active ? 'text-green-400' : 'text-slate-500'}`}>{label}</span>
      <span className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">{sub}</span>
    </div>
    <div className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-green-500' : 'bg-slate-800'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`}></div>
    </div>
  </div>
);

export default Onboarding;
