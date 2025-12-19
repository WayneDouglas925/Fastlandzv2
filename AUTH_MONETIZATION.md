# Authentication & Monetization Strategy for FASTLANDZ

## Authentication Options

### Option 1: Clerk (RECOMMENDED for Speed)

**Why Clerk:**
- Beautiful pre-built UI components
- Setup in <30 minutes
- Free tier: 10,000 monthly active users
- Social logins (Google, Apple, GitHub, Discord)
- Email/password with magic links
- Multi-factor authentication built-in
- Session management handled
- Webhooks for user events

**Implementation:**

```bash
npm install @clerk/clerk-react
```

**Setup (15 minutes):**

1. Sign up at https://clerk.com
2. Create application in dashboard
3. Get publishable key and secret key
4. Add to `.env.local`:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   ```

5. Wrap app in `index.tsx`:
   ```tsx
   import { ClerkProvider } from '@clerk/clerk-react'

   const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

   createRoot(document.getElementById('root')!).render(
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
       <App />
     </ClerkProvider>
   )
   ```

6. Add sign-in/sign-up buttons:
   ```tsx
   import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'

   function Header() {
     const { isSignedIn, user } = useUser()

     return (
       <div>
         {isSignedIn ? (
           <>
             <span>Welcome, {user.firstName}!</span>
             <UserButton />
           </>
         ) : (
           <>
             <SignInButton mode="modal" />
             <SignUpButton mode="modal" />
           </>
         )}
       </div>
     )
   }
   ```

**Pricing:**
- Free: 10,000 MAU
- Pro: $25/month for 10,000 MAU, then $0.02/MAU
- At 50k users: ~$105/month

**Pros:**
- Fastest implementation
- Beautiful UI out of the box
- Handles everything (MFA, magic links, social auth)
- Great developer experience

**Cons:**
- Vendor lock-in
- Can get expensive at scale (100k+ users)
- Less customization than self-hosted

---

### Option 2: Firebase Authentication

**Why Firebase:**
- Free tier: 10,000 SMS verifications/month
- Unlimited email/password auth
- Google-backed reliability
- Easy integration with Firebase Firestore (if you use it for DB)
- 50+ identity providers

**Implementation:**

```bash
npm install firebase
```

**Setup (30 minutes):**

1. Create Firebase project at https://console.firebase.google.com
2. Enable Authentication methods (Email/Password, Google, etc.)
3. Add config to `.env.local`:
   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   ```

4. Initialize Firebase:
   ```tsx
   // firebase.ts
   import { initializeApp } from 'firebase/app'
   import { getAuth } from 'firebase/auth'

   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
   }

   const app = initializeApp(firebaseConfig)
   export const auth = getAuth(app)
   ```

5. Create auth context:
   ```tsx
   import { createContext, useContext, useEffect, useState } from 'react'
   import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
   import { auth } from './firebase'

   const AuthContext = createContext()

   export function AuthProvider({ children }) {
     const [user, setUser] = useState(null)
     const [loading, setLoading] = useState(true)

     useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (user) => {
         setUser(user)
         setLoading(false)
       })
       return unsubscribe
     }, [])

     const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)
     const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password)

     return (
       <AuthContext.Provider value={{ user, signUp, signIn, loading }}>
         {children}
       </AuthContext.Provider>
     )
   }

   export const useAuth = () => useContext(AuthContext)
   ```

**Pricing:**
- Free: Unlimited email/password, 10k SMS/month
- Pay-as-you-go: $0.06/SMS verification
- At 50k users: Free (if only email/password)

**Pros:**
- Free for email/password auth
- Owned by Google (reliable)
- Easy to add Firestore database
- Great for startups

**Cons:**
- More code to write vs Clerk
- UI components not included
- Google Analytics dependency can be bloated

---

### Option 3: Supabase Auth

**Why Supabase:**
- Open source
- Free tier: 50,000 MAU
- Built-in PostgreSQL database
- Row-level security policies
- Magic links, social auth, phone auth

**Implementation:**

```bash
npm install @supabase/supabase-js
```

**Setup (30 minutes):**

1. Create project at https://supabase.com
2. Get API keys from dashboard
3. Add to `.env.local`:
   ```
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=...
   ```

4. Initialize Supabase:
   ```tsx
   import { createClient } from '@supabase/supabase-js'

   export const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   )
   ```

5. Auth functions:
   ```tsx
   // Sign up
   const { data, error } = await supabase.auth.signUp({
     email: 'user@email.com',
     password: 'password123',
   })

   // Sign in
   const { data, error } = await supabase.auth.signInWithPassword({
     email: 'user@email.com',
     password: 'password123',
   })

   // Sign out
   await supabase.auth.signOut()

   // Listen to auth state
   supabase.auth.onAuthStateChange((event, session) => {
     console.log(event, session)
   })
   ```

**Pricing:**
- Free: 50,000 MAU + 500MB database
- Pro: $25/month for 100,000 MAU + 8GB database
- At 50k users: Free

**Pros:**
- Best free tier (50k MAU)
- Database + auth in one
- Open source (can self-host)
- Great for scaling

**Cons:**
- More setup than Clerk
- Need to build your own UI
- Less hand-holding

---

### Option 4: NextAuth.js (Self-Hosted)

**Why NextAuth:**
- Free forever
- Full control
- No vendor lock-in
- Requires Next.js (not Vite)

**Setup:**
- Migrate to Next.js (big change)
- Or use Express.js backend with Passport.js

**Not Recommended for FASTLANDZ** because:
- You're using Vite, not Next.js
- More complex setup
- You'd need backend infrastructure

---

## Authentication Recommendation for FASTLANDZ

### For MVP (Launch This Week):
**Use Clerk**
- Fastest to implement (30 mins)
- Beautiful UI
- Free for first 10k users
- Can migrate later if needed

### For Long-Term (6+ months):
**Migrate to Supabase**
- When you hit 10k users
- Better pricing at scale
- Includes database (for syncing data)
- Still reasonable cost

### Migration Path:
1. Week 1: Launch with Clerk
2. Month 3: Add Supabase database alongside Clerk
3. Month 6: Migrate auth to Supabase (if you hit 10k users)

---

## Monetization: "Pay What You Want" Strategy

### Option 1: Pure Pay-What-You-Want (PWYW)

**How It Works:**
- All features are free
- After completing Day 7, show "Support the Developer" screen
- Suggested amounts: $3, $5, $10, Custom
- No forced payments
- Honor system

**Implementation with Stripe:**

```bash
npm install @stripe/stripe-js
```

**Setup:**

1. Create Stripe account at https://stripe.com
2. Create Payment Links in dashboard:
   - $3 one-time payment
   - $5 one-time payment
   - $10 one-time payment
   - Custom amount link

3. Add to Victory Screen:
   ```tsx
   function VictoryScreen() {
     return (
       <div>
         <h1>Congratulations! You completed the 7-day challenge!</h1>

         <div className="support-section">
           <h2>Enjoyed FASTLANDZ?</h2>
           <p>This app is free forever, but your support helps keep it running!</p>

           <div className="payment-options">
             <a href="https://buy.stripe.com/xxxxx" className="btn">
               ☕ Buy me a coffee - $3
             </a>
             <a href="https://buy.stripe.com/xxxxx" className="btn">
               🍕 Buy me lunch - $5
             </a>
             <a href="https://buy.stripe.com/xxxxx" className="btn">
               🚀 Support development - $10
             </a>
             <a href="https://buy.stripe.com/xxxxx" className="btn">
               💎 Custom amount
             </a>
           </div>

           <button onClick={skipToProfile}>No thanks, continue</button>
         </div>
       </div>
     )
   }
   ```

**Expected Revenue:**
- Completion rate: 40% (400 out of 1000 users finish Day 7)
- Payment rate: 5-15% (20-60 supporters per 1000 users)
- Average donation: $5-7
- **1000 users = $100-420 revenue**
- **10,000 users = $1k-4.2k revenue**

**Pros:**
- No paywall friction
- Good for building community
- Users feel generous after completing challenge
- Lower implementation complexity

**Cons:**
- Unpredictable revenue
- Lower conversion than paid model
- Relies on goodwill

---

### Option 2: Freemium with PWYW Upgrade

**How It Works:**
- Free tier: 7-day challenge (12h-20h fasting)
- Premium tier: Pay-what-you-want ($5 suggested minimum)
  - Unlock 14-day challenge
  - Unlock 30-day challenge
  - Custom fasting schedules
  - Advanced stats dashboard
  - Export data to CSV
  - Priority email support
  - Ad-free experience

**Implementation:**

```tsx
function PremiumGate() {
  const { user } = useAuth()
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    // Check if user has premium (from database)
    checkPremiumStatus(user.id).then(setIsPremium)
  }, [user])

  if (isPremium) return <PremiumFeatures />

  return (
    <div className="premium-gate">
      <h2>Unlock More Challenges</h2>
      <p>Want to continue your journey?</p>

      <div className="premium-features">
        <ul>
          <li>14-day Wasteland Warrior challenge</li>
          <li>30-day Vault Survivor challenge</li>
          <li>Custom fasting schedules</li>
          <li>Advanced analytics & insights</li>
          <li>Data export (CSV, JSON)</li>
          <li>Priority support</li>
        </ul>
      </div>

      <div className="payment-options">
        <h3>Pay what feels right:</h3>
        <button onClick={() => purchasePremium(3)}>$3</button>
        <button onClick={() => purchasePremium(5)}>$5 (Suggested)</button>
        <button onClick={() => purchasePremium(10)}>$10</button>
        <button onClick={() => purchasePremium('custom')}>Custom</button>
      </div>

      <p className="pwyw-note">
        This is a one-time payment. All premium features forever.
      </p>
    </div>
  )
}
```

**Backend (Stripe Webhook):**

```tsx
// Vercel serverless function: /api/stripe-webhook.ts
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature']
  const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.metadata.userId

    // Mark user as premium in database
    await supabase
      .from('users')
      .update({ is_premium: true, premium_since: new Date() })
      .eq('id', userId)
  }

  res.json({ received: true })
}
```

**Expected Revenue:**
- Completion rate: 40% (400 finish Day 7)
- Upgrade rate: 15-30% (60-120 upgrade)
- Average payment: $7
- **1000 users = $420-840 revenue**
- **10,000 users = $4.2k-8.4k revenue**

**Pros:**
- Higher conversion than pure PWYW
- Predictable revenue
- Incentivizes feature development
- Users still control price

**Cons:**
- Paywall friction
- Need to maintain premium features
- More complex implementation

---

### Option 3: Hybrid Model (RECOMMENDED)

**Free Tier:**
- 7-day challenge
- Basic timer and tracking
- Educational content
- Community features

**After Day 7 Completion:**
- Show "Thank You" screen
- Offer PWYW donation ($0-∞)
- If user pays $5+, unlock premium features
- If user pays $0-4, they can still donate later

**Premium Features (unlocked at $5+):**
- 14-day challenge
- 30-day challenge
- Custom schedules
- Advanced analytics
- Data export
- Remove "Support" prompts

**Implementation:**

```tsx
function PostChallengeFlow() {
  const [donated, setDonated] = useState(false)
  const [amount, setAmount] = useState(0)

  const handleDonation = async (selectedAmount) => {
    // Process Stripe payment
    const { sessionId } = await createCheckoutSession(selectedAmount)

    // Redirect to Stripe Checkout
    const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY)
    await stripe.redirectToCheckout({ sessionId })
  }

  return (
    <div>
      <h1>🎉 Challenge Complete!</h1>
      <p>You survived the wasteland!</p>

      <div className="support-section">
        <h2>Support FASTLANDZ?</h2>
        <p>This app is free, but donations help keep it alive.</p>
        <p>Donate $5+ to unlock premium challenges!</p>

        <div className="donation-buttons">
          <button onClick={() => handleDonation(0)}>
            Continue Free
          </button>
          <button onClick={() => handleDonation(3)}>
            $3 - Support
          </button>
          <button onClick={() => handleDonation(5)}>
            $5 - Unlock Premium
          </button>
          <button onClick={() => handleDonation(10)}>
            $10 - Premium + Extra Support
          </button>
          <button onClick={() => handleDonation('custom')}>
            Custom Amount
          </button>
        </div>
      </div>
    </div>
  )
}
```

**Expected Revenue:**
- Completion rate: 40% (400 finish)
- Donation rate: 25% (100 donate)
- Average donation: $6
- **1000 users = $600 revenue**
- **10,000 users = $6k revenue**

**Pros:**
- Best of both worlds
- No upfront paywall
- Rewards completers
- Fair value exchange

**Cons:**
- Slightly more complex logic
- Need to track payment tiers

---

## Stripe Integration (Complete Guide)

### Step 1: Create Stripe Account

1. Sign up at https://stripe.com
2. Complete business verification
3. Get API keys from dashboard

### Step 2: Install Stripe

```bash
npm install @stripe/stripe-js stripe
```

### Step 3: Create Checkout Session (Backend)

```tsx
// /api/create-checkout.ts (Vercel serverless function)
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  const { amount, userId } = req.body

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'FASTLANDZ Premium Support',
            description: 'One-time payment to unlock premium features',
          },
          unit_amount: amount * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.VITE_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.VITE_APP_URL}/dashboard`,
    metadata: { userId },
  })

  res.json({ sessionId: session.id })
}
```

### Step 4: Frontend Checkout Flow

```tsx
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

async function handlePremiumUpgrade(amount) {
  const { userId } = useAuth()

  // Create checkout session
  const response = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, userId }),
  })

  const { sessionId } = await response.json()

  // Redirect to Stripe Checkout
  const stripe = await stripePromise
  await stripe.redirectToCheckout({ sessionId })
}
```

### Step 5: Handle Webhook (Verify Payment)

```tsx
// /api/stripe-webhook.ts
import Stripe from 'stripe'
import { supabase } from './supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body
  },
}

export default async function handler(req, res) {
  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const userId = session.metadata.userId
    const amount = session.amount_total / 100

    // Mark user as premium if they paid $5+
    const isPremium = amount >= 5

    await supabase
      .from('users')
      .update({
        is_premium: isPremium,
        donation_amount: amount,
        donated_at: new Date(),
      })
      .eq('id', userId)
  }

  res.json({ received: true })
}
```

### Step 6: Environment Variables

Add to `.env.local`:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_APP_URL=http://localhost:3000
```

Add to Vercel Dashboard (Production):
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_APP_URL=https://fastlandzv2.vercel.app
```

---

## Pricing Strategy Recommendations

### For FASTLANDZ Launch:

**Suggested Donation Tiers:**
- **$3** - "Buy me a coffee" (casual support)
- **$5** - "Unlock Premium" (threshold for features)
- **$10** - "Super Supporter" (extra generosity)
- **$20** - "Wasteland Patron" (early adopter VIP)
- **Custom** - Let users decide

**Premium Features Worth $5:**
- 14-day challenge (extends game)
- 30-day challenge (hardcore mode)
- Custom fasting schedules (flexibility)
- Advanced analytics (progress graphs, trends)
- Data export (ownership of data)
- Remove donation prompts (cleaner UX)
- Priority email support (VIP treatment)
- Early access to new features

**What to Keep Free:**
- 7-day challenge (core experience)
- Fasting timer
- Daily logging
- Educational content (value-add)
- Community features (network effects)

---

## Implementation Timeline

### Week 1 (After Initial Launch):
- [ ] Add Clerk authentication
- [ ] Create user database schema (Supabase)
- [ ] Update localStorage to sync with database

### Week 2:
- [ ] Set up Stripe account
- [ ] Create Payment Links
- [ ] Add "Support" screen after Day 7
- [ ] Test donation flow

### Week 3:
- [ ] Implement webhook handling
- [ ] Create premium feature gating logic
- [ ] Build 14-day challenge content
- [ ] Add advanced analytics dashboard

### Week 4:
- [ ] Launch premium tier
- [ ] A/B test pricing ($3 vs $5 threshold)
- [ ] Monitor conversion rates
- [ ] Iterate based on feedback

---

## Revenue Projections

### Conservative Estimate:
- 1,000 users
- 40% completion rate (400 users)
- 10% donation rate (40 donors)
- $6 average donation
- **Monthly Revenue: $240**

### Moderate Estimate:
- 10,000 users
- 45% completion rate (4,500 users)
- 15% donation rate (675 donors)
- $7 average donation
- **Monthly Revenue: $4,725**

### Optimistic Estimate:
- 50,000 users
- 50% completion rate (25,000 users)
- 20% donation rate (5,000 donors)
- $8 average donation
- **Monthly Revenue: $40,000**

---

## Costs Breakdown

### At 10,000 Users:
- **Clerk Auth:** $25/month (Pro plan)
- **Supabase:** $25/month (Pro plan)
- **Vercel:** $20/month (Pro plan for better analytics)
- **Stripe Fees:** 2.9% + $0.30 per transaction (~$150/month at $5k revenue)
- **Total: $220/month**
- **Net Revenue: $4,505/month**

### At 50,000 Users:
- **Clerk:** $125/month (or migrate to Supabase for free)
- **Supabase:** $100/month (Team plan)
- **Vercel:** $150/month (scaling bandwidth)
- **Stripe Fees:** ~$1,200/month (at $40k revenue)
- **Total: $1,575/month**
- **Net Revenue: $38,425/month**

---

## Recommended Approach for FASTLANDZ

### Phase 1: Launch (This Week)
- **Auth:** None yet (localStorage only)
- **Monetization:** None yet
- **Goal:** Validate product-market fit

### Phase 2: Add Auth (Week 2-3)
- **Auth:** Clerk (fastest setup)
- **Monetization:** Still free
- **Goal:** Enable multi-device sync, build user base

### Phase 3: Add PWYW (Week 4-5)
- **Payment:** Stripe Payment Links
- **Model:** Hybrid PWYW (free forever, $5+ unlocks premium)
- **Goal:** Start generating revenue

### Phase 4: Scale (Month 2-6)
- **Auth:** Migrate to Supabase (at 10k users)
- **Monetization:** Optimize pricing based on data
- **Goal:** $5k-10k MRR

---

## Questions to Answer with Analytics

Once you add auth and payments, track:

1. **What % of users complete Day 7?**
   - Target: 40%+
   - If lower, improve onboarding/engagement

2. **What % of completers donate?**
   - Target: 15-20%
   - If lower, improve "thank you" messaging

3. **What's the average donation amount?**
   - Target: $6-8
   - If lower, adjust suggested amounts

4. **Which premium features drive upgrades?**
   - Survey users: "Why did you upgrade?"
   - Double down on popular features

5. **When do users drop off?**
   - Day 1? Onboarding is too long
   - Day 3-4? Mid-challenge motivation dip
   - Day 6? Almost-there burnout

---

## Next Steps

**Want me to implement any of this?**

1. **Set up Clerk auth** (30 mins)
2. **Set up Stripe Payment Links** (15 mins)
3. **Create "Support" screen** (1 hour)
4. **Build premium feature gating** (2 hours)
5. **Create database schema** (30 mins)

Let me know which you want to tackle first!
