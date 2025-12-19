# FASTLANDZ: Survival Chronicles

A gamified 7-day intermittent fasting RPG with a post-apocalyptic wasteland theme. Transform your fasting journey into an epic survival adventure with educational content, habit tracking, and progression mechanics.

## Features

- 7-day progressive fasting challenge (12h → 20h windows)
- Gamification: XP, levels, streaks, achievements
- Real-time fasting timer with visual countdown
- Daily habit tracking (water intake, meals, mood)
- Educational intel missions with biochemistry deep-dives
- Character creation with DiceBear avatars
- Persistent progress with localStorage
- Dark wasteland aesthetic with neon accents

## Tech Stack

- React 19.2.3 + TypeScript 5.8.2
- Vite 6.2.0 (build tool)
- Tailwind CSS (styling)
- localStorage (data persistence)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:3000`

## Deployment

### Deploy to Vercel (Recommended)

**Quick Deploy:**
```bash
npm install -g vercel
vercel
```

**Or via GitHub:**
1. Push code to GitHub
2. Import to Vercel at https://vercel.com/new
3. Auto-detected settings work out of the box

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full scaling roadmap.

## Project Structure

```
fastlands_v2/
├── App.tsx                 # Main app component & routing
├── index.tsx              # React entry point
├── index.html             # HTML template
├── types.ts               # TypeScript interfaces
├── constants.tsx          # Day configs & educational content
├── components/
│   ├── Dashboard.tsx      # Main mission interface
│   ├── FastingTimer.tsx   # Countdown timer
│   ├── Journal.tsx        # Daily logging
│   ├── LandingPage.tsx    # Marketing page
│   ├── Layout.tsx         # App shell
│   ├── Logo.tsx           # SVG logo component
│   ├── Onboarding.tsx     # Character creation
│   ├── VictoryScreen.tsx  # 7-day completion
│   └── WaterTracker.tsx   # Hydration tracker
├── vercel.json            # Vercel deployment config
└── vite.config.ts         # Vite build config
```

## Roadmap

- [ ] PWA implementation (manifest, service worker, offline support)
- [ ] Backend API with user authentication
- [ ] Multi-device sync with PostgreSQL
- [ ] Push notifications for fasting timers
- [ ] Social features (leaderboards, challenges)
- [ ] Premium features (custom schedules, advanced analytics)
- [ ] Native iOS/Android apps via Capacitor

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed timeline.

## Contributing

This is a personal project currently in beta. Feedback and bug reports welcome via GitHub issues.

## Health Disclaimer

This app is for educational and motivational purposes only. Consult a healthcare professional before starting any fasting regimen. Not recommended for individuals with eating disorders, diabetes, pregnancy, or other medical conditions.

## License

Private - All Rights Reserved

## Contact

For support or questions, open an issue on GitHub.

---

Built with React + Vite | Deployed on Vercel
