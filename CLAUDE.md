# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

FASTLANDZ: Survival Chronicles — a gamified 7-day intermittent-fasting RPG (post-apocalyptic theme). React 19 + TypeScript + Vite SPA, deployed on Vercel. Tailwind is used for styling via class names (no config file in the repo).

## Commands

```bash
npm install
npm run dev        # Vite dev server on http://localhost:3000 (host 0.0.0.0)
npm run build      # production build -> dist/
npm run preview    # serve the production build
```

There is no test runner, linter, or formatter configured. `tsc` is available (`typescript` devDependency) for ad-hoc type checking: `npx tsc --noEmit`.

The `@` import alias maps to the repo root (`vite.config.ts`). Source files live at the repo root (not `src/`).

## Architecture

- **`App.tsx` is the single state owner.** It holds `user` (`UserProfile`), `session` (`FastSession`), the active tab, and all celebration/overlay flags, and passes state + callbacks down to `components/*`. Game rules live here: `handleMissionSuccess` (+100 XP, level = floor(xp/1000)+1, advances `currentDay` up to 7, streak bump if the day's habit was done, shows unlock celebration or `VictoryScreen` on day 7), `startFast`, `endFast`, `completeHabit` (+25 XP), `updateWater`, `saveLog`.
- **Persistence is localStorage only**, keys `fastlandz_user` and `fastlandz_session`, loaded once on mount and written back by `useEffect`s on change. "Reset" paths call `localStorage.clear()` + reload. There is no backend state; any schema change to `UserProfile`/`FastSession` in `types.ts` must stay backward-compatible with data already saved in users' browsers (note `completedFasts` is optional for this reason).
- **Content is data-driven**: `constants.tsx` exports `CHALLENGE_DAYS` (the 7 `DayConfig` entries — fast duration 12h→20h, habit, intel text, protocols). `currentDay` indexes into it (`CHALLENGE_DAYS[currentDay - 1]`). Change gameplay content there, not in components.
- **Fast timing/progression**: a day advances only when a fast ends successfully. `endFast` succeeds if the target time has passed *or* within a hidden grace period (15 min on day 1, 2 h on days 2–7). A mount-time effect also auto-completes a FASTING session whose `targetEndTime` passed while the app was closed. `DAY_PROGRESSION.md` documents an older version of this logic (no grace period) — trust `App.tsx`.
- **Screen flow**: `LandingPage` → `Onboarding` (creates profile) → main app via `Layout` tabs (`Dashboard`, `FastingTimer`, `Journal`, `WaterTracker`, etc.) → `VictoryScreen` after day 7. `ErrorBoundary` wraps the app; `AudioController` handles sound.
- **Serverless endpoint**: `api/subscribe.ts` (Vercel function) POSTs email signups to the MailerLite API. Needs `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID` set in the Vercel env (and `.env.local` for `vercel dev`). `.env.example` still lists Mailchimp variables — it is stale; the code uses MailerLite (see `MAILERLITE_SETUP.md`).
- **Deployment**: `vercel.json` rewrites all routes to `/index.html` (SPA) and sets immutable caching on `/assets/*`. See `DEPLOYMENT.md`.

## Docs in repo

Many root-level `*.md` files (`PROJECT_STATUS.md`, `NEXT_SESSION_TASKS*.md`, `SESSION_SUMMARY_DEC19.md`, `PHASE1_CHANGELOG.md`, `UX_IMPROVEMENTS_PLAN.md`, `AUTH_MONETIZATION.md`, etc.) are planning/session notes and may be out of date relative to the code.
