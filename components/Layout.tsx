
import React from 'react';
import { UserProfile } from '../types';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, activeTab, setActiveTab }) => {
  const avatarSeed = user.characterType === 'female' ? 'vanguard' : user.characterType === 'male' ? 'sentinel' : 'neutral';
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}&gender=${user.characterType === 'neutral' ? 'both' : user.characterType}`;

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto px-4 sm:px-6">
      <header className="py-6 flex justify-between items-center border-b border-green-900/30">
        <div className="flex items-center gap-3">
          <Logo size={40} />
          <h1 className="text-xl font-black tracking-tighter uppercase font-mono neon-glow">Fastlandz</h1>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] uppercase font-mono text-green-500 font-bold">XP Lvl {user.level}</span>
            <div className="w-24 h-1.5 bg-green-900/30 rounded-full overflow-hidden border border-green-900/50">
              <div 
                className="h-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all duration-500" 
                style={{ width: `${(user.xp % 100)}%` }}
              ></div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full border border-green-500/50 p-1 bg-slate-800/50 overflow-hidden">
             <img src={avatarUrl} alt="Avatar" className="w-full h-full grayscale hover:grayscale-0 transition-all cursor-pointer scale-110" />
          </div>
        </div>
      </header>

      <main className="flex-grow py-8 overflow-y-auto">
        {children}
      </main>

      <nav className="sticky bottom-4 mx-auto w-full max-w-md bg-black/80 backdrop-blur-xl border border-green-500/20 rounded-2xl p-2 flex justify-around items-center z-50 mb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" label="Home" />
        <NavItem active={activeTab === 'map'} onClick={() => setActiveTab('map')} icon="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7l5-2.5 5.553 2.776a1 1 0 01.447.894v10.764a1 1 0 01-1.447.894L14 17l-5 3z" label="Map" />
        <NavItem active={activeTab === 'journal'} onClick={() => setActiveTab('journal')} icon="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" label="Log" />
        <NavItem active={activeTab === 'intel'} onClick={() => setActiveTab('intel')} icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.75 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.75 0-3.332.477-4.5 1.253" label="Intel" />
        <NavItem active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" label="Stats" />
      </nav>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 transition-all ${active ? 'text-green-400' : 'text-slate-500 hover:text-slate-300'}`}
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
    </svg>
    <span className="text-[10px] font-bold uppercase tracking-wider font-mono">{label}</span>
  </button>
);

export default Layout;
