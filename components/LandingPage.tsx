
import React, { useState } from 'react';
import Logo from './Logo';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Mailchimp form submission
      // You'll need to replace this URL with your actual Mailchimp form action URL
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="relative z-20 max-w-5xl space-y-12 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-6 flex flex-col items-center">
            <Logo size={120} className="mb-4" />
            <span className="inline-block px-4 py-1 border border-green-500 text-green-500 font-mono text-xs font-bold tracking-[0.3em] uppercase rounded-full">
              challengeyourself.tech presents
            </span>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter font-mono leading-none">
              ENTER THE <br />
              <span className="text-green-500 neon-glow">FASTLANDZ</span>
            </h1>
            <p className="text-3xl md:text-4xl text-white font-black uppercase tracking-wider font-mono">
              STOP EATING — START LIVING
            </p>
            <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto leading-relaxed">
              The modern food environment is a wasteland of sugar and constant snacking. 
              Reclaim your metabolic edge with the <span className="text-green-500 font-bold">7-Day Introductory Challenge</span>.
            </p>
          </div>

          {/* The Modern Trap */}
          <div className="bg-red-900/10 border border-red-500/30 rounded-3xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-black uppercase font-mono text-red-500 mb-6">The Modern Trap: Does Any of This Sound Familiar?</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-xl mt-1">⚠</span>
                <div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wide">Constant Insulin Spikes</h4>
                  <p className="text-slate-400 text-sm">Never giving your body a break</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-xl mt-1">⚠</span>
                <div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wide">Brain Fog & Afternoon Crashes</h4>
                  <p className="text-slate-400 text-sm">Energy rollercoaster all day</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-xl mt-1">⚠</span>
                <div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wide">Reliance on Sugar</h4>
                  <p className="text-slate-400 text-sm">Dependent on the next hit</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-xl mt-1">⚠</span>
                <div>
                  <h4 className="font-bold text-white text-sm uppercase tracking-wide">Confused About Diets</h4>
                  <p className="text-slate-400 text-sm">Overwhelmed by contradictory advice</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Reality */}
          <div className="max-w-3xl mx-auto space-y-6 text-slate-300 text-lg leading-relaxed">
            <p className="italic border-l-4 border-green-500 pl-6 py-2">
              We live in an environment of abundance, but our biology is built for scarcity. 
              When you eat all day, your body never switches into repair mode (Autophagy). 
              You become metabolically rigid—dependent on the next sugar hit to function.
            </p>
            <p className="font-bold text-white text-xl">
              Intermittent Fasting isn't a diet. It's a return to baseline. It's about teaching your body to burn its own fuel again.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-green-900/10 border border-green-500/30 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-black uppercase font-mono text-green-500 mb-8">Reset Your Engine: Benefits</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="text-3xl">🧠</div>
                <h4 className="font-black uppercase text-white text-sm tracking-wider">Mental Clarity</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ketones are a super-fuel for your brain. Experience focus without the jitters of caffeine or the crash of sugar.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">♻️</div>
                <h4 className="font-black uppercase text-white text-sm tracking-wider">Autophagy Activation</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Trigger your body's self-cleaning mechanism that recycles damaged cells and reduces inflammation.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">⚡</div>
                <h4 className="font-black uppercase text-white text-sm tracking-wider">Metabolic Freedom</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Train your body to access its own energy reserves. Stop being a slave to the snack drawer.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              No subscriptions. No complex meal plans. Just a <span className="text-green-500 font-bold">7-day challenge</span> to initiate you into the lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <button 
                onClick={onStart}
                className="group relative px-12 py-5 bg-green-500 text-black font-black uppercase tracking-[0.2em] font-mono text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(34,197,94,0.4)] overflow-hidden rounded-2xl"
              >
                <span className="relative z-10">START DAY 1 →</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
              <a href="#intel" className="text-slate-500 hover:text-green-500 font-mono text-sm uppercase tracking-widest transition-colors">
                Read the Briefing
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 animate-bounce">
           <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
           </svg>
        </div>
      </section>

      {/* The Crisis (Why IF) */}
      <section id="intel" className="py-24 px-6 border-y border-cyan-500/15 bg-black/20">
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
          <div className="bg-green-900/5 border border-cyan-500/20 p-8 rounded-[2.5rem] relative overflow-hidden">
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
      <footer className="py-32 px-6 text-center border-t border-cyan-500/20">
         <div className="max-w-xl mx-auto space-y-10">
            <div className="space-y-4">
              <h2 className="text-5xl font-black italic font-mono uppercase leading-none">THE OASIS <br/> IS WAITING.</h2>
              <p className="text-slate-500 uppercase font-mono text-xs tracking-widest">Join 10,241 Survivors already in the field.</p>
            </div>

            {/* Email Capture */}
            <div className="bg-green-900/10 border border-green-500/30 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-black uppercase font-mono text-green-500">
                GET UPDATES + BONUS SURVIVAL INTEL
              </h3>
              <p className="text-sm text-slate-400">
                Join the mission brief. Early access to new challenges, exclusive metabolic science, and community survival tips.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@wasteland.com"
                    required
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 bg-black/50 border border-cyan-500/20 rounded-lg text-white placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-green-500 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="px-6 py-3 bg-green-500 text-black font-bold uppercase font-mono text-xs tracking-widest rounded-lg hover:bg-green-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'SENDING...' : 'SUBSCRIBE'}
                  </button>
                </div>
                {submitStatus === 'success' && (
                  <p className="text-green-500 text-sm font-mono">
                    ✓ TRANSMISSION RECEIVED. Check your inbox.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm font-mono">
                    ✗ SIGNAL LOST. Please try again.
                  </p>
                )}
              </form>
              <p className="text-[10px] text-slate-600 font-mono">
                No spam. Unsubscribe anytime. Your data is secure.
              </p>
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
  <div className="p-6 bg-black border border-cyan-500/20 rounded-3xl hover:border-green-500/50 transition-all group">
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
