# FASTLANDZ Day Progression System

## How Day Progression Works

### Current Behavior (Analyzed from App.tsx)

#### Day Unlocking Logic:

**When does Day 2 unlock?**
- Day 2 (and subsequent days) unlock **only when the user successfully completes the previous day's fast**
- Located in `App.tsx:81-97` - `handleMissionSuccess()` function

**Success Criteria:**
```tsx
const endFast = () => {
  if (!session) return;
  if (new Date() >= new Date(session.targetEndTime)) {
    handleMissionSuccess();  // ✅ SUCCESS - advances to next day
  } else {
    alert("Mission Aborted. Return to perimeter.");  // ❌ FAIL - stays on same day
  }
  setSession(null);
};
```

**Key Points:**
1. User starts Day 1 fasting timer (12-hour fast)
2. User must wait until `targetEndTime` is reached
3. When user clicks "End Fast", the system checks:
   - ✅ If `current time >= targetEndTime` → Mission Success → `currentDay` increments from 1 → 2
   - ❌ If `current time < targetEndTime` → Mission Aborted → Stays on Day 1

**What happens on mission success:**
```tsx
setUser(prev => {
  const nextDay = Math.min(7, prev.currentDay + (isDay7 ? 0 : 1));
  return {
    ...prev,
    xp: prev.xp + 100,
    level: Math.floor((prev.xp + 100) / 1000) + 1,
    currentDay: nextDay,  // Advances to next day
    streak: prev.completedHabits.includes(prev.currentDay.toString()) ? prev.streak + 1 : prev.streak,
    waterRations: 0
  };
});
```

---

## Answering Your Questions

### Q1: Will Day 2 automatically pop up when they complete Day 1?

**Answer:** **YES, immediately after clicking "End Fast" (if they waited long enough).**

**Flow:**
1. User completes 12-hour fast for Day 1
2. Timer shows `00:00:00`
3. User clicks "End Fast" button
4. System checks: Has 12 hours passed? ✅ Yes
5. **IMMEDIATELY:** `currentDay` changes from 1 → 2
6. Dashboard updates to show Day 2 content
7. User sees new Day 2 mission, new fast duration (14 hours), new educational content

**No page reload needed** - React state update automatically re-renders the dashboard with Day 2 data.

---

### Q2: What happens if a user doesn't complete Day 1?

**Answer:** **They CANNOT access Day 2. They stay locked on Day 1.**

**Scenario A: User quits early (before time is up)**
- User starts 12-hour fast
- After 6 hours, user clicks "End Fast"
- System checks: Has 12 hours passed? ❌ No (only 6 hours)
- Alert: "Mission Aborted. Return to perimeter."
- **Result:** `currentDay` stays at 1, timer resets, user must try again

**Scenario B: User never starts the fast**
- User logs in, sees Day 1 dashboard
- User never clicks "Begin Fast"
- **Result:** Stays on Day 1 indefinitely until they start and complete the fast

**Scenario C: User starts fast but abandons app**
- User starts 12-hour fast, timer is running
- User closes browser/tab and doesn't return for 24 hours
- **Result when they return:**
  - Timer might show negative time or be expired
  - If they click "End Fast", it will check if time elapsed
  - If `targetEndTime` was in the past, they can complete it
  - **localStorage persists the session**, so timer state is maintained

---

## Map View Lock System

Located in `App.tsx:171`:

```tsx
const isLocked = day.dayNumber > user.currentDay;
```

**What users see in Map tab:**
- **Days 1-X (completed):** Green checkmark ✓, can click to view details
- **Current day:** Highlighted in green, can click to view
- **Future days (locked):** Grayed out, opacity 60%, can still click to preview but can't start

**Example:**
- User is on Day 3
- Map shows:
  - Day 1: ✓ (completed, green)
  - Day 2: ✓ (completed, green)
  - Day 3: 3 (current, bright green highlight)
  - Day 4: 4 (locked, grayed out)
  - Day 5: 5 (locked, grayed out)
  - Day 6: 6 (locked, grayed out)
  - Day 7: 7 (locked, grayed out)

---

## Potential Issues & Recommendations

### Issue 1: Timer Expiration Handling
**Problem:** If user starts fast but doesn't return for days, what happens?

**Current Behavior:**
- Timer keeps running in localStorage
- If user returns 3 days later, `targetEndTime` is in the past
- User can click "End Fast" and it will succeed

**Recommendation:**
- ✅ **Keep current behavior** - it's forgiving to users who forget to check in
- Alternative: Add "auto-complete" logic that checks on app load if fasting session ended

### Issue 2: No Grace Period for Early Completion
**Problem:** User must wait exactly until `targetEndTime` - no "close enough" buffer

**Current Behavior:**
- 12-hour fast starting at 8:00 AM → must wait until exactly 8:00 PM
- If user clicks at 7:58 PM (2 minutes early), mission fails

**Recommendation:**
- Consider adding 5-10 minute grace period:
  ```tsx
  const gracePeriod = 5 * 60 * 1000; // 5 minutes in ms
  if (new Date() >= new Date(session.targetEndTime).getTime() - gracePeriod) {
    handleMissionSuccess();
  }
  ```

### Issue 3: No Explanation for Locked Days
**Problem:** Users might not understand why Day 2+ are locked

**Recommendation:**
- Add tooltip or message: "Complete Day X to unlock"
- Show progress indicator: "Day 1: 12h fast required (0h completed)"

### Issue 4: Failed Attempts Don't Reset Timer
**Problem:** If user fails a fast, they have to manually start a new one

**Current Behavior:**
- User fails Day 1
- Alert appears: "Mission Aborted"
- Timer clears (`setSession(null)`)
- User must click "Begin Fast" again

**Recommendation:**
- ✅ **Current behavior is good** - forces user to consciously restart
- Alternative: Offer "Retry Mission" button instead of generic alert

---

## Suggested UX Improvements

### 1. Add "Time Until Unlock" for Locked Days
```tsx
// In Map view
{isLocked && (
  <span className="text-xs text-slate-500">
    Complete Day {day.dayNumber - 1} to unlock
  </span>
)}
```

### 2. Show Fast Completion Status
```tsx
// In Dashboard
{!session && (
  <div className="text-center">
    <p>You haven't started today's fast yet.</p>
    <p className="text-sm text-slate-500">
      Complete this {currentDayConfig.fastDuration}-hour fast to unlock Day {user.currentDay + 1}
    </p>
  </div>
)}
```

### 3. Congratulations Animation on Day Unlock
```tsx
// After successful fast completion
if (!isDay7) {
  // Show confetti or notification: "DAY 2 UNLOCKED!"
  setTimeout(() => setActiveTab('map'), 2000); // Auto-show map
}
```

### 4. Allow "Skip Day" (Optional - for testing)
**Only in development mode:**
```tsx
// Add to Dashboard (DEV ONLY)
{process.env.NODE_ENV === 'development' && (
  <button onClick={() => setUser(prev => ({ ...prev, currentDay: prev.currentDay + 1 }))}>
    [DEV] Skip to Next Day
  </button>
)}
```

---

## Summary

### Current System:
- ✅ **Sequential progression:** Must complete Day 1 to unlock Day 2
- ✅ **No shortcuts:** Can't skip days
- ✅ **Persistent state:** localStorage saves progress
- ✅ **Immediate unlock:** Next day appears as soon as fast completes
- ⚠️ **Strict timing:** Must wait full duration (no grace period)
- ⚠️ **No auto-complete:** Must manually click "End Fast"

### User Journey:
```
1. User starts Day 1 fast (12h)
   ↓
2. Timer counts down: 12:00:00 → 00:00:00
   ↓
3. User clicks "End Fast"
   ↓
4. System checks: Time elapsed? ✅
   ↓
5. Success! +100 XP, currentDay = 2
   ↓
6. Dashboard updates to Day 2 content
   ↓
7. User can now start Day 2 fast (14h)
   ↓
8. Repeat for Days 3-7
   ↓
9. Day 7 completion → Victory Screen
```

### Failure Scenario:
```
1. User starts Day 1 fast (12h)
   ↓
2. After 6 hours, user clicks "End Fast" early
   ↓
3. System checks: Time elapsed? ❌ (only 6h/12h)
   ↓
4. Alert: "Mission Aborted"
   ↓
5. Timer clears, user stays on Day 1
   ↓
6. User must start a new fast to try again
```

---

## Testing Checklist

To verify day progression works correctly:

- [ ] Complete Day 1 fast (wait 12 hours)
- [ ] Confirm Day 2 unlocks immediately
- [ ] Try ending fast early - confirm failure
- [ ] Check Map view - confirm Day 2 is unlocked, Day 3+ locked
- [ ] Start Day 2 fast, abandon app, return later
- [ ] Confirm timer state persists in localStorage
- [ ] Complete all 7 days - confirm Victory Screen appears
- [ ] Verify locked days can't be started (only previewed)

---

**Want me to implement any improvements to the day progression system?**
