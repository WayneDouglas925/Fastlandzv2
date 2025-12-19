# Mailchimp Email Capture Setup Guide

## Overview

Email capture has been added to the Landing Page footer. When users submit their email, it's sent to your Mailchimp audience list via a Vercel serverless function.

---

## Step 1: Get Mailchimp Credentials

### 1.1 Get Your API Key

1. Log in to https://mailchimp.com
2. Click your profile icon (bottom left) → **Account & Billing**
3. Go to **Settings** → **Extras** → **API keys**
4. Click **Create A Key**
5. Copy the API key (looks like: `abc123def456-us21`)

### 1.2 Get Your Audience List ID

1. In Mailchimp, go to **Audience** → **All contacts**
2. Click **Settings** dropdown → **Audience name and defaults**
3. Scroll down to **Audience ID**
4. Copy it (looks like: `1a2b3c4d5e`)

### 1.3 Get Your Server Prefix

The server prefix is in your API key after the dash.

**Example:**
- API Key: `abc123def456-us21`
- Server Prefix: `us21`

Common prefixes: `us1`, `us2`, `us3`...`us21`, etc.

---

## Step 2: Add Environment Variables

### For Local Development:

Create `.env.local` in your project root:

```bash
MAILCHIMP_API_KEY=abc123def456-us21
MAILCHIMP_LIST_ID=1a2b3c4d5e
MAILCHIMP_SERVER_PREFIX=us21
```

### For Vercel Production:

1. Go to https://vercel.com/dashboard
2. Select your project: `Fastlandzv2`
3. Go to **Settings** → **Environment Variables**
4. Add three variables:

| Name | Value | Environment |
|------|-------|-------------|
| `MAILCHIMP_API_KEY` | `abc123def456-us21` | Production, Preview |
| `MAILCHIMP_LIST_ID` | `1a2b3c4d5e` | Production, Preview |
| `MAILCHIMP_SERVER_PREFIX` | `us21` | Production, Preview |

5. Click **Save**
6. **Redeploy** your app for changes to take effect

---

## Step 3: Test Email Capture

### Local Testing:

```bash
npm run dev
```

1. Visit `http://localhost:3000`
2. Scroll to bottom of landing page
3. Enter email in "GET UPDATES" form
4. Click "SUBSCRIBE"
5. Should see: "✓ TRANSMISSION RECEIVED. Check your inbox."

### Production Testing:

1. Visit your live Vercel URL
2. Submit email
3. Check Mailchimp:
   - Go to **Audience** → **All contacts**
   - Your test email should appear with tag `FASTLANDZ`

---

## Step 4: Verify in Mailchimp

After someone subscribes:

1. Go to **Audience** → **All contacts**
2. You should see:
   - Email address
   - Tag: `FASTLANDZ`
   - Source field: `Landing Page`
   - Status: `Subscribed`

---

## Step 5: Create Welcome Email (Optional)

### Automated Welcome Email:

1. In Mailchimp, go to **Automations**
2. Click **Create** → **Welcome new subscribers**
3. Select your FASTLANDZ audience
4. Design email:
   - Subject: "Welcome to FASTLANDZ - Mission Brief Inside"
   - Body: Thank you message + link to app + survival tips

**Suggested Email Content:**
```
Subject: 🌵 Mission Brief: Welcome to FASTLANDZ

Greetings, Survivor.

You've been accepted into the FASTLANDZ 7-Day Challenge.

Your mission, should you choose to accept it:
- Master intermittent fasting (12h → 20h progression)
- Unlock metabolic flexibility
- Reclaim your energy and focus

🚀 START DAY 1: https://fastlandzv2.vercel.app

Expect daily intel drops:
- Science-backed fasting protocols
- Metabolic milestone explanations
- Community survival tips

Stay sharp,
- The FASTLANDZ Team

---
Unsubscribe anytime. Your data is secure.
```

---

## Step 6: Customize Subscription Behavior

### Double Opt-In (Recommended for Compliance):

In `api/subscribe.ts` line 39, change:
```typescript
status: 'subscribed', // Immediate subscription
```

To:
```typescript
status: 'pending', // Requires email confirmation
```

**Why use double opt-in?**
- GDPR/CAN-SPAM compliant
- Reduces spam signups
- Builds higher-quality list

**Downside:**
- Users must confirm via email
- Some users won't complete confirmation

### Add Custom Tags:

Modify line 40-41 in `api/subscribe.ts`:
```typescript
tags: ['FASTLANDZ', 'Landing Page', '2025-Q1'], // Custom segmentation
```

### Capture Additional Data:

Add more merge fields (requires creating them in Mailchimp first):
```typescript
merge_fields: {
  SOURCE: 'Landing Page',
  SIGNUP_DATE: new Date().toISOString(),
  // Add more fields as needed
},
```

---

## Troubleshooting

### Error: "Server configuration error"

**Problem:** Environment variables not set in Vercel.

**Solution:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add all three Mailchimp variables
3. Redeploy your app

### Error: "Member Exists"

**Problem:** Email already in your Mailchimp list.

**Solution:** This is handled gracefully - user sees "Already subscribed!" message.

### Error: "Invalid Resource"

**Problem:** Wrong List ID or Server Prefix.

**Solution:**
1. Double-check List ID in Mailchimp
2. Verify server prefix matches your API key
3. Update environment variables

### Error: 401 Unauthorized

**Problem:** Invalid API key.

**Solution:**
1. Generate new API key in Mailchimp
2. Update `MAILCHIMP_API_KEY` in Vercel
3. Redeploy

### Emails Not Appearing in Mailchimp

**Checklist:**
1. Check **All contacts** (not just subscribed)
2. Verify status (might be "Pending" if double opt-in)
3. Check spam/junk folder for confirmation email
4. Look in **Tags** for `FASTLANDZ` tag

---

## Analytics & Tracking

### View Signup Stats:

1. Go to **Audience** → **Signup forms**
2. Click **View report** on your embedded form
3. See conversion rates over time

### Track Source:

Filter by tag `FASTLANDZ` to see only landing page signups.

### Export List:

1. **Audience** → **All contacts**
2. Click **Export audience**
3. Download CSV of all emails

---

## Privacy & Compliance

### Required Elements (Already Included):

✅ Unsubscribe link (Mailchimp adds automatically)
✅ Privacy disclaimer: "No spam. Unsubscribe anytime."
✅ Data security: Emails stored securely in Mailchimp

### GDPR Compliance:

If targeting EU users, add to landing page:
```html
<label className="flex items-center gap-2 text-xs text-slate-500">
  <input type="checkbox" required />
  I agree to receive marketing emails from FASTLANDZ
</label>
```

### CAN-SPAM Compliance:

✅ Unsubscribe option (auto-included)
✅ Physical address (add to Mailchimp account settings)
✅ No deceptive subject lines (in welcome email)

---

## Cost Breakdown

### Mailchimp Pricing:

| Contacts | Price/Month | Notes |
|----------|-------------|-------|
| 0-500 | **Free** | Perfect for launch |
| 501-1,000 | $13 | Includes automations |
| 1,001-2,500 | $20 | |
| 2,501-5,000 | $30 | |
| 10,000+ | $100+ | Enterprise pricing |

### When You Outgrow Free Tier:

**Alternatives:**
- ConvertKit ($9/month for 300 subscribers)
- Sendinblue (Free for unlimited contacts, 300 emails/day)
- Substack (Free, takes 10% of paid subscriptions)

---

## Next Steps

After email capture is working:

1. **Send Welcome Email** - Thank users for joining
2. **Create Email Sequence** - Day 1, Day 3, Day 7 check-ins
3. **Segment by Behavior** - Tag completers vs drop-offs
4. **A/B Test Copy** - Test different CTAs on landing page
5. **Track Conversions** - How many signups → app users

---

## Integration Checklist

- [ ] Get Mailchimp API credentials
- [ ] Add environment variables to Vercel
- [ ] Test subscription on production site
- [ ] Verify email appears in Mailchimp audience
- [ ] Create automated welcome email
- [ ] Set up email signature with unsubscribe link
- [ ] Add GDPR compliance checkbox (if EU users)
- [ ] Monitor signup rate in Mailchimp dashboard

---

**Questions?**
- Mailchimp Docs: https://mailchimp.com/developer/
- Support: https://mailchimp.com/help/

---

**Last Updated:** 2025-12-19
