# Welcome Email Template for MailerLite

**Purpose:** Automatically sent when someone subscribes via the landing page
**Timing:** Immediately after subscription
**Tone:** Motivational, tactical, empowering

---

## Email Subject Lines (A/B Test These)

**Option 1 (Direct):**
`Welcome to the FASTLANDZ, Survivor`

**Option 2 (Curiosity):**
`Your 7-Day Mission Briefing is Here`

**Option 3 (Benefit):**
`Ready to reclaim your metabolic freedom?`

**Recommended:** Option 1 - on-brand and clear

---

## Email Body (HTML Version)

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Arial', sans-serif; background-color: #050a05; color: #e2e8f0; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 32px; font-weight: 900; color: #22c55e; text-transform: uppercase; letter-spacing: -1px; }
        .content { background: #0a110a; border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 20px; padding: 30px; margin-bottom: 20px; }
        h1 { color: #22c55e; font-size: 28px; font-weight: 900; text-transform: uppercase; margin-top: 0; }
        p { line-height: 1.6; margin-bottom: 15px; color: #cbd5e1; }
        .highlight { background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; padding: 15px; margin: 20px 0; font-style: italic; }
        .cta { display: inline-block; background: #22c55e; color: #000; padding: 15px 40px; text-decoration: none; font-weight: 900; text-transform: uppercase; border-radius: 10px; margin: 20px 0; letter-spacing: 1px; }
        .cta:hover { background: #16a34a; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #64748b; }
        ul { padding-left: 20px; }
        li { margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">⚡ FASTLANDZ</div>
        </div>

        <div class="content">
            <h1>Welcome to the Mission, Survivor</h1>

            <p>You just took the first step toward reclaiming your metabolic freedom. Most people never make it this far.</p>

            <p>The modern food environment is designed to keep you dependent—constant snacking, sugar crashes, and brain fog. But you're about to break free.</p>

            <div class="highlight">
                "Intermittent fasting isn't a diet. It's a return to baseline. It's about teaching your body to burn its own fuel again."
            </div>

            <h2 style="color: #22c55e; font-size: 20px; margin-top: 30px;">🎯 Your 7-Day Challenge</h2>

            <p>This isn't about starvation. It's about tactical metabolic training:</p>

            <ul>
                <li><strong>Days 1-2:</strong> Gentle 12-14 hour fasts to build your foundation</li>
                <li><strong>Days 3-4:</strong> 14-16 hours to push past the beginner phase</li>
                <li><strong>Days 5-6:</strong> 18-hour fasts to activate deep autophagy</li>
                <li><strong>Day 7:</strong> The apex 24-hour fast—prove you control your biology</li>
            </ul>

            <p style="margin-top: 25px;"><strong>What you'll gain:</strong></p>
            <ul>
                <li>🧠 <strong>Mental clarity</strong> without caffeine crashes</li>
                <li>⚡ <strong>Stable energy</strong> throughout the day</li>
                <li>♻️ <strong>Autophagy activation</strong> (cellular self-cleaning)</li>
                <li>🔥 <strong>Metabolic flexibility</strong> (freedom from constant eating)</li>
            </ul>

            <a href="https://fastlandz.vercel.app" class="cta">START DAY 1 NOW →</a>

            <h2 style="color: #22c55e; font-size: 20px; margin-top: 40px;">📋 What to Expect</h2>

            <p>Each day includes:</p>
            <ul>
                <li>A timed fast with real-time progress tracking</li>
                <li>Educational content on the science behind fasting</li>
                <li>Daily habits to build sustainable routines</li>
                <li>Water tracking and quick logging tools</li>
            </ul>

            <p><strong>Pro Tips for Success:</strong></p>
            <ul>
                <li>Start your timer before bed for easy overnight fasting</li>
                <li>Hydrate aggressively—water, black coffee, and tea are your allies</li>
                <li>Read the "Intel" tab each day to understand what's happening in your body</li>
                <li>Don't overthink it—hunger comes in waves and passes quickly</li>
            </ul>

            <div class="highlight">
                <strong>Remember:</strong> The first 48 hours are the hardest. Your body is transitioning from sugar-dependent to metabolically flexible. Push through. It gets easier.
            </div>

            <h2 style="color: #22c55e; font-size: 20px; margin-top: 40px;">💬 We Want Your Feedback</h2>

            <p>You're part of our beta testing group. Your experience matters.</p>

            <p>As you progress through the challenge, please share:</p>
            <ul>
                <li>What's working well?</li>
                <li>What's confusing?</li>
                <li>Any bugs or issues?</li>
                <li>Would you recommend this to a friend?</li>
            </ul>

            <p><a href="YOUR_FEEDBACK_FORM_LINK_HERE" style="color: #22c55e; text-decoration: underline;">Submit feedback here →</a></p>

            <h2 style="color: #22c55e; font-size: 20px; margin-top: 40px;">🚀 Ready to Begin?</h2>

            <p>The wasteland awaits. Don't wait for motivation—it won't come. Action creates momentum.</p>

            <a href="https://fastlandz.vercel.app" class="cta">LAUNCH MISSION →</a>
        </div>

        <div class="footer">
            <p><strong>FASTLANDZ</strong> by ChallengeYourself.tech</p>
            <p>Your metabolic survival journey starts now.</p>
            <p style="margin-top: 20px; font-size: 11px;">
                You're receiving this because you signed up at fastlandz.vercel.app<br>
                <a href="{$unsubscribe}" style="color: #64748b;">Unsubscribe</a>
            </p>
        </div>
    </div>
</body>
</html>
```

---

## Plain Text Version (for non-HTML email clients)

```
WELCOME TO THE FASTLANDZ, SURVIVOR

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You just took the first step toward reclaiming your metabolic freedom. Most people never make it this far.

The modern food environment is designed to keep you dependent—constant snacking, sugar crashes, and brain fog. But you're about to break free.

"Intermittent fasting isn't a diet. It's a return to baseline. It's about teaching your body to burn its own fuel again."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 YOUR 7-DAY CHALLENGE

This isn't about starvation. It's about tactical metabolic training:

• Days 1-2: Gentle 12-14 hour fasts to build your foundation
• Days 3-4: 14-16 hours to push past the beginner phase
• Days 5-6: 18-hour fasts to activate deep autophagy
• Day 7: The apex 24-hour fast—prove you control your biology

WHAT YOU'LL GAIN:

• 🧠 Mental clarity without caffeine crashes
• ⚡ Stable energy throughout the day
• ♻️ Autophagy activation (cellular self-cleaning)
• 🔥 Metabolic flexibility (freedom from constant eating)

→ START DAY 1 NOW: https://fastlandz.vercel.app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 WHAT TO EXPECT

Each day includes:
• A timed fast with real-time progress tracking
• Educational content on the science behind fasting
• Daily habits to build sustainable routines
• Water tracking and quick logging tools

PRO TIPS FOR SUCCESS:

1. Start your timer before bed for easy overnight fasting
2. Hydrate aggressively—water, black coffee, and tea are your allies
3. Read the "Intel" tab each day to understand what's happening
4. Don't overthink it—hunger comes in waves and passes quickly

REMEMBER: The first 48 hours are the hardest. Your body is transitioning from sugar-dependent to metabolically flexible. Push through. It gets easier.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 WE WANT YOUR FEEDBACK

You're part of our beta testing group. Your experience matters.

Share your feedback here: [YOUR_FEEDBACK_FORM_LINK]

As you progress, tell us:
• What's working well?
• What's confusing?
• Any bugs or issues?
• Would you recommend this to a friend?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 READY TO BEGIN?

The wasteland awaits. Don't wait for motivation—it won't come. Action creates momentum.

→ LAUNCH MISSION: https://fastlandz.vercel.app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FASTLANDZ by ChallengeYourself.tech
Your metabolic survival journey starts now.

You're receiving this because you signed up at fastlandz.vercel.app
Unsubscribe: {$unsubscribe}
```

---

## MailerLite Setup Instructions

### 1. Create the Email Campaign

1. Log into MailerLite
2. Go to **Campaigns** → **Email campaigns**
3. Click **Create campaign**
4. Choose **Regular** campaign type
5. Name it: `Welcome Email - New Subscribers`

### 2. Design the Email

**Option A: Use HTML Editor**
- Click **Custom HTML** editor
- Paste the HTML version above
- Replace `YOUR_FEEDBACK_FORM_LINK_HERE` with actual form URL
- Replace `https://fastlandz.vercel.app` with your actual URL

**Option B: Use Rich Text Editor**
- Use the drag-and-drop editor
- Copy sections from plain text version
- Style with MailerLite's formatting tools
- Add buttons with CTA styling

### 3. Set Up Automation

1. Go to **Automations** → **Create workflow**
2. Choose **Welcome new subscribers**
3. Set trigger: **Subscriber joins a group** (your main list)
4. Add action: **Send email** → Select your welcome email
5. Set delay: **Immediately** (0 minutes)
6. Activate the workflow

### 4. Test Before Going Live

1. Add your own email to the subscriber list
2. Check that email arrives immediately
3. Verify all links work
4. Check formatting on desktop and mobile
5. Test unsubscribe link

---

## Email Performance Goals

**Target Metrics:**
- **Open Rate:** 40%+ (welcome emails typically 40-60%)
- **Click-through Rate:** 15%+ (CTA to start Day 1)
- **Unsubscribe Rate:** <2%

**A/B Test Ideas:**
- Different subject lines
- Shorter vs longer email
- Different CTA button text
- With/without images

---

## Follow-Up Email Sequence (Optional - For Later)

**Day 2:** "How's Your First Fast Going?"
**Day 4:** "You're Halfway There - Science Behind Day 3"
**Day 7:** "Final Push - The 24-Hour Challenge"
**Day 8:** "You Survived - What's Next?" (upsell premium)

---

## Notes

- Keep unsubscribe link visible (required by law)
- Include physical address if required by CAN-SPAM
- Test with different email clients
- Monitor spam reports
- Personalize with {$name} if collecting names

**Remember:** This is your first touchpoint with users. Make it count. Be helpful, motivational, and clear about what they signed up for.

Good luck! 🚀
