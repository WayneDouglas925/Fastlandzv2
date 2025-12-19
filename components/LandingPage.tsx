
import React from 'react';
import Logo from './Logo';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#050a05] text-white selection:bg-green-500 selection:text-black font-sans overflow-x-hidden">
      {/* CRT Overlay Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-20"></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050a05] z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1501535033-a59812bf79f9?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover grayscale opacity-20" 
            alt="Wasteland Background"
          />
        </div>

        <div className="relative z-20 max-w-4xl space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-6 flex flex-col items-center">
            <Logo size={120} className="mb-4" />
            <span className="inline-block px-4 py-1 border border-green-500 text-green-500 font-mono text-xs font-bold tracking-[0.3em] uppercase rounded-full">
              System Alert: Metabolic Crisis Detected
            </span>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter font-mono leading-none">
              RECLAIM YOUR <br />
              <span className="text-green-500 neon-glow">INTERNAL WASTELAND</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto">
              The world outside is a disaster. Your body shouldn't be. Master the ancient art of <span className="text-white border-b-2 border-green-500">Fastlandz Survival</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <button 
              onClick={onStart}
              className="group relative px-12 py-5 bg-green-500 text-black font-black uppercase tracking-[0.2em] font-mono text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(34,197,94,0.4)] overflow-hidden rounded-2xl"
            >
              <span className="relative z-10">ENTER THE FASTLANDZ →</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
            <a href="#intel" className="text-slate-500 hover:text-green-500 font-mono text-sm uppercase tracking-widest transition-colors">
              Read the Briefing
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 animate-bounce">
           <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
           </svg>
        </div>
      </section>

      {/* The Crisis (Why IF) */}
      <section id="intel" className="py-24 px-6 border-y border-green-900/20 bg-black/20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black italic font-mono uppercase tracking-tight">The Problem: <br/><span className="text-red-500/80">Constant Scavenging</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              In the old world, humans ate 24/7. Your "Metabolic Engine" never had time to cool down. This led to high inflammation, brain fog, and energy leaks. 
            </p>
            <div className="space-y-4">
               <FeatureRow icon="⚡" title="The Sugar Trap" desc="Your body is addicted to cheap, fast-burning glucose. It forgot how to burn its main reactor: Fat." />
               <FeatureRow icon="☣️" title="The Sludge Build-up" desc="Without a break, your cells never clean out the broken proteins. We call this cellular debris 'Metabolic Sludge'." />
            </div>
          </div>
          <div className="bg-green-900/5 border border-green-500/20 p-8 rounded-[2.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M13 2L3 14h9v8l10-12h-9l1 1-1-1z" />
                </svg>
             </div>
             <h3 className="text-2xl font-bold font-mono text-green-500 mb-6 uppercase">The Solution: Protocol 7</h3>
             <p className="text-slate-300 mb-6 italic leading-relaxed">
                "Intermittent Fasting isn't starvation. It's tactical resource management. By pausing intake, you force the system to switch to high-performance backup fuel."
             </p>
             <ul className="space-y-3">
                {['Boost Growth Hormone by 500%', 'Initiate Autophagy (Self-Cleaning)', 'Sharpen Mental Focus', 'Stabilize Survival Energy'].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-mono uppercase tracking-wide">
                      <span className="text-green-500 font-bold">✓</span> {item}
                   </li>
                ))}
             </ul>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16 space-y-4">
           <h2 className="text-4xl md:text-5xl font-black italic font-mono uppercase">The 7-Day <span className="text-green-500">Extraction</span></h2>
           <p className="text-slate-500 max-w-xl mx-auto">We take you from total novice to Metabolic Warrior in one week. No gear required. Just your resolve.</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           <JourneyStep day="1-2" title="The Adaptation" desc="Gentle 12-14 hour fasts. We stop the midnight scavenge and fix your hydration." />
           <JourneyStep day="3-4" title="The Threshold" desc="14-16 hours. Your liver drains its sugar battery. The real work begins." />
           <JourneyStep day="5-6" title="The Repair" desc="18-hour missions. Autophagy is active. Your engine is purging the sludge." />
           <JourneyStep day="7" title="The Legend" desc="The Apex Fast. 22 hours of pure mastery. You are now the master of your biology." />
        </div>
      </section>

      {/* FAQ / Education */}
      <section className="py-24 px-6 bg-green-500/5">
         <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-3xl font-black italic font-mono uppercase text-center">Survival Q&A</h2>
            <div className="space-y-8">
               <QuestionItem 
                 q="Will I lose muscle in the wasteland?" 
                 a="Negative. Fasting actually spikes Growth Hormone to protect your lean tissue while targeting stored fat for fuel." 
               />
               <QuestionItem 
                 q="Can I drink anything during the fast?" 
                 a="Water, black coffee, and herbal tea are your primary allies. Anything else might trigger the insulin alarm." 
               />
               <QuestionItem 
                 q="Is this safe for beginners?" 
                 a="Protocol 7 starts slow. We build your 'metabolic muscle' day by day. Listen to your bio-feedback; the system is flexible." 
               />
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <footer className="py-32 px-6 text-center border-t border-green-900/30">
         <div className="max-w-xl mx-auto space-y-10">
            <div className="space-y-4">
              <h2 className="text-5xl font-black italic font-mono uppercase leading-none">THE OASIS <br/> IS WAITING.</h2>
              <p className="text-slate-500 uppercase font-mono text-xs tracking-widest">Join 10,241 Survivors already in the field.</p>
            </div>
            <button 
              onClick={onStart}
              className="w-full bg-green-500 text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] font-mono text-2xl transition-all shadow-[0_0_60px_rgba(34,197,94,0.3)] hover:scale-105"
            >
              START DAY 1 →
            </button>
            <p className="text-slate-700 font-mono text-[10px] uppercase tracking-widest">
               End of Transmission // Est. 2024
            </p>
         </div>
      </footer>
    </div>
  );
};

const FeatureRow = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
  <div className="flex gap-4">
    <span className="text-2xl">{icon}</span>
    <div className="space-y-1">
      <h4 className="font-bold uppercase tracking-widest text-sm text-green-400 font-mono">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const JourneyStep = ({ day, title, desc }: { day: string; title: string; desc: string }) => (
  <div className="p-6 bg-black border border-green-900/30 rounded-3xl hover:border-green-500/50 transition-all group">
     <div className="text-[10px] font-mono text-green-500 mb-2 font-bold uppercase tracking-widest">Day {day}</div>
     <h4 className="text-xl font-bold mb-3 italic uppercase font-mono group-hover:text-green-400 transition-colors">{title}</h4>
     <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const QuestionItem = ({ q, a }: { q: string; a: string }) => (
  <div className="space-y-2">
     <h4 className="text-lg font-bold text-green-500 font-mono uppercase tracking-tight flex items-start gap-3">
        <span className="text-slate-700">Q.</span> {q}
     </h4>
     <p className="text-slate-400 pl-8 leading-relaxed italic">{a}</p>
  </div>
);

export default LandingPage;
