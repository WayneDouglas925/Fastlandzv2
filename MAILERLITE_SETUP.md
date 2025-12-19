# MailerLite Email Capture Setup Guide

## Overview

Email capture has been integrated with **MailerLite** (free tier: 1,000 subscribers). When users submit their email on the landing page, it's sent to your MailerLite group via a Vercel serverless function.

**Why MailerLite over Mailchimp?**
- ✅ **Free tier:** 1,000 subscribers (vs Mailchimp's 500)
- ✅ **12,000 emails/month** on free tier
- ✅ **Unlimited email templates**
- ✅ **Drag-and-drop editor**
- ✅ **No credit card required**
- ✅ **Better deliverability rates**

---

## Step 1: Get MailerLite Credentials

### 1.1 Create Account

1. Go to https://www.mailerlite.com
2. Click **Sign up free**
3. Enter email, create password
4. Verify email address

### 1.2 Get Your API Key

1. Log in to MailerLite
2. Click your profile icon (top right) → **Integrations**
3. Click **MailerLite API**
4. Click **Generate new token**
5. Name it: `FASTLANDZ Production`
6. Copy the API key (starts with `eyJ...`)

**Important:** Save this key immediately - you can't view it again!

### 1.3 Get Your Group ID

1. In MailerLite, go to **Subscribers** → **Groups**
2. Click **Create Group** (or select existing group)
3. Name it: `FASTLANDZ Subscribers`
4. Click on the group name
5. Look at the URL: `https://dashboard.mailerlite.com/subscribers/groups/123456789`
6. Copy the number at the end (that's your Group ID)

**Example:**
- URL: `https://dashboard.mailerlite.com/subscribers/groups/987654321`
- Group ID: `987654321`

---

## Step 2: Add Environment Variables

### For Local Development:

Create `.env.local` in your project root:

```bash
MAILERLITE_API_KEY=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
MAILERLITE_GROUP_ID=987654321
```

### For Vercel Production:

1. Go to https://vercel.com/dashboard
2. Select your project: `Fastlandzv2`
3. Go to **Settings** → **Environment Variables**
4. Add two variables:

| Name | Value | Environment |
|------|-------|-------------|
| `MAILERLITE_API_KEY` | `eyJhbGciOiJSUz...` | Production, Preview |
| `MAILERLITE_GROUP_ID` | `987654321` | Production, Preview |

5. Click **Save**
6. **Redeploy** your app:
   - Go to **Deployments** tab
   - Click ⋯ menu on latest deployment
   - Click **Redeploy**

---

## Step 3: Test Email Capture

### Local Testing:

```bash
npm run dev
```

1. Visit `http://localhost:3000`
2. Scroll to bottom of landing page
3. Find "GET UPDATES + BONUS SURVIVAL INTEL" section
4. Enter your test email
5. Click **SUBSCRIBE**
6. Should see: "✓ TRANSMISSION RECEIVED. Check your inbox."

### Production Testing:

1. Visit your live Vercel URL
2. Submit a test email
3. Check MailerLite:
   - Go to **Subscribers** → **Groups** → `FASTLANDZ Subscribers`
   - Your test email should appear

---

## Step 4: Verify in MailerLite

After someone subscribes:

1. Go to **Subscribers** → **Groups** → `FASTLANDZ Subscribers`
2. You should see:
   - Email address
   - Date subscribed
   - Source field: `Landing Page`
   - Status: `Active`

### View All Subscribers:

- **Subscribers** → **Active** - See all active emails
- Click on email to see details
- Export list as CSV anytime

---

## Step 5: Create Welcome Email (Optional but Recommended)

### Automated Welcome Email:

1. In MailerLite, go to **Automations**
2. Click **Create automation**
3. Select **Welcome new subscribers**
4. Choose trigger: **Subscriber joins group** → Select `FASTLANDZ Subscribers`
5. Add email step:
   - Click **+ Add step** → **Email**
   - Design your welcome email

### Suggested Email Template:

**Subject:** 🌵 Mission Brief: Welcome to FASTLANDZ

**Body:**
```
Greetings, Survivor.

You've been accepted into the FASTLANDZ 7-Day Challenge.

Your mission, should you choose to accept it:
✓ Master intermittent fasting (12h → 20h progression)
✓ Unlock metabolic flexibility
✓ Reclaim your energy and focus

🚀 START YOUR JOURNEY:
https://fastlandzv2.vercel.app

What to expect:
- Science-backed fasting protocols
- Daily educational intel
- Gamified progression system
- Community support

The wasteland is waiting. Will you survive?

- The FASTLANDZ Team

---
P.S. Check your spam folder and mark this as "Not Spam" to ensure you receive updates.

[Unsubscribe]
```

### Email Design Tips:

- Use MailerLite's drag-and-drop builder
- Add your logo (if you have one)
- Keep it simple and mobile-friendly
- Include clear CTA button: "START DAY 1"
- Add social media links (optional)

---

## Step 6: Customize Subscription Behavior

### Double Opt-In (Optional):

By default, subscribers are added immediately. For double opt-in:

1. Go to **Forms** → **Settings**
2. Enable **Double opt-in**
3. Users will receive confirmation email before being added

**Pros:**
- GDPR compliant
- Higher quality list
- Better deliverability

**Cons:**
- Fewer subscribers (some won't confirm)
- Extra friction

### Add Custom Fields:

To track more data:

1. Go to **Subscribers** → **Custom fields**
2. Create fields like:
   - `signup_date` (Date)
   - `completed_day_7` (Boolean)
   - `user_id` (Text)

3. Update `api/subscribe.ts` to include them:
```typescript
fields: {
  source: 'Landing Page',
  signup_date: new Date().toISOString(),
},
```

---

## Step 7: Email Campaigns (Future)

### Send Broadcast Emails:

1. Go to **Campaigns** → **Create campaign**
2. Choose **Email**
3. Select audience: `FASTLANDZ Subscribers` group
4. Design email
5. Schedule or send immediately

### Suggested Campaigns:

**Week 1:**
- Welcome email (automated)
- Day 3 check-in: "How's it going?"
- Day 7 completion celebration

**Ongoing:**
- Weekly metabolic science tips
- Success stories from users
- New feature announcements
- Premium upgrade offers (when ready)

---

## Free Tier Limits

### MailerLite Free Plan:

| Feature | Limit |
|---------|-------|
| Subscribers | 1,000 |
| Emails/month | 12,000 |
| Automation | ✅ Unlimited |
| Templates | ✅ Unlimited |
| Support | Email only |

### When You Outgrow Free Tier:

**Pricing:**
- 1,001-2,500 subscribers: $10/month
- 2,501-5,000 subscribers: $20/month
- 5,001-10,000 subscribers: $30/month

**Cheaper than Mailchimp** at every tier!

---

## Troubleshooting

### Error: "Server configuration error"

**Problem:** Environment variables not set in Vercel.

**Solution:**
1. Vercel Dashboard → Settings → Environment Variables
2. Add both `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID`
3. Redeploy app

### Error: "Already subscribed"

**Problem:** Email already in your MailerLite group.

**Solution:** This is handled gracefully - user sees success message.

### Error: 401 Unauthorized

**Problem:** Invalid API key.

**Solution:**
1. Generate new API key in MailerLite
2. Update `MAILERLITE_API_KEY` in Vercel
3. Redeploy

### Emails Not Appearing

**Checklist:**
1. Check **Subscribers** → **Groups** → `FASTLANDZ Subscribers`
2. Also check **All subscribers** (might be in different group)
3. Verify Group ID is correct
4. Check MailerLite activity log: **Subscribers** → **Activity**

### API Rate Limits

MailerLite free tier limits:
- **1,000 requests/hour**
- **100 requests/minute**

For most use cases, this is more than enough.

---

## Analytics & Tracking

### View Signup Stats:

1. **Subscribers** → **Groups** → `FASTLANDZ Subscribers`
2. See growth chart over time
3. Export subscriber list as CSV

### Track Email Performance:

1. **Campaigns** → Select campaign
2. View metrics:
   - Open rate (target: 20%+)
   - Click rate (target: 3%+)
   - Unsubscribe rate (target: <1%)

### Segment Your List:

Create segments based on:
- Signup date
- Engagement (opens/clicks)
- Custom fields (completed Day 7, etc.)

---

## Privacy & Compliance

### Required Elements (Already Included):

✅ Unsubscribe link (MailerLite adds automatically)
✅ Privacy disclaimer: "No spam. Unsubscribe anytime."
✅ Data security: SSL encryption, GDPR compliant

### GDPR Compliance:

MailerLite is GDPR compliant out of the box. For EU users, consider adding:

```html
<label className="flex items-center gap-2 text-xs text-slate-500">
  <input type="checkbox" required />
  I agree to receive marketing emails from FASTLANDZ
</label>
```

### CAN-SPAM Compliance:

✅ Unsubscribe option (auto-included)
✅ Physical address (add in MailerLite settings)
✅ Accurate "From" name
✅ Clear email subject lines

**Add Your Address:**
1. MailerLite → **Settings** → **Company details**
2. Add business address (required by law)

---

## Comparison: MailerLite vs Mailchimp

| Feature | MailerLite Free | Mailchimp Free |
|---------|-----------------|----------------|
| Subscribers | **1,000** | 500 |
| Emails/month | **12,000** | 1,000 |
| Automation | ✅ | ❌ (paid only) |
| Templates | Unlimited | Limited |
| Signup forms | ✅ | ✅ |
| A/B testing | ❌ | ❌ |
| Support | Email | Email |
| Ease of use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**Winner:** MailerLite for startups and small projects

---

## Best Practices

### Email Frequency:

**Don't spam!** Recommended schedule:
- Week 1: Welcome email (immediate)
- Week 1: Day 3 check-in (if no activity)
- Week 2: Day 7 reminder (if incomplete)
- Monthly: Newsletter with tips

### Subject Line Tips:

✅ Good:
- "Your Day 3 Mission Awaits"
- "New Feature: 14-Day Challenge Unlocked"
- "FASTLANDZ Science Drop: Autophagy Explained"

❌ Bad:
- "CLICK HERE NOW!!!"
- "You won't believe this..."
- "Re: Your order" (deceptive)

### Improve Open Rates:

- Personalize subject lines: "{{name}}, your mission..."
- Send on Tuesday-Thursday (best open rates)
- Avoid spam trigger words: "Free", "Act now", "$$$"
- Keep subject under 50 characters
- A/B test different subject lines

---

## Next Steps

After MailerLite is working:

1. **Send test email** to yourself
2. **Create welcome automation** (10 mins)
3. **Monitor signups** daily (first week)
4. **Engage subscribers** with weekly content
5. **Ask for feedback** via email surveys

### Email Sequence Ideas:

**Day 0 (Signup):**
- Welcome + link to start Day 1

**Day 3:**
- "How's the challenge going?"
- Link to intel/science content

**Day 7:**
- "Congrats on completing!" (if finished)
- "Need support?" (if not finished)

**Day 14:**
- "Ready for the 14-day challenge?" (premium upsell)

**Monthly:**
- Metabolic science newsletter
- Success stories
- Community highlights

---

## Integration Checklist

- [ ] Create MailerLite account (free)
- [ ] Generate API key
- [ ] Create "FASTLANDZ Subscribers" group
- [ ] Get Group ID from URL
- [ ] Add environment variables to Vercel
- [ ] Redeploy app
- [ ] Test subscription on live site
- [ ] Verify email appears in MailerLite
- [ ] Create automated welcome email
- [ ] Set up double opt-in (optional)
- [ ] Add company address for compliance
- [ ] Monitor signup rate weekly

---

## Support & Resources

**MailerLite Help:**
- Documentation: https://www.mailerlite.com/help
- API Docs: https://developers.mailerlite.com/docs
- Support: help@mailerlite.com

**Video Tutorials:**
- Getting Started: https://www.mailerlite.com/resources/video-tutorials
- Automation Workflows: https://academy.mailerlite.com

---

**You're all set!** MailerLite is a fantastic choice for starting out. Much better free tier than Mailchimp.

---

**Last Updated:** 2025-12-19
