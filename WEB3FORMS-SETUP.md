# Web3Forms Setup Guide for OrdoSaxum Newsletter

## Quick Setup (2 minutes)

### Step 1: Get Your Access Key
1. Visit: **https://web3forms.com**
2. Enter your email: **info@ordosaxum.ca**
3. Click "Create Access Key"
4. Check your email and copy the access key they send you

### Step 2: Update the Website
1. Open `index.html`
2. Find this line (around line 575):
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
3. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key from Web3Forms
4. Save the file

### Step 3: Test & Deploy
1. Push changes to GitHub:
   ```bash
   git add index.html
   git commit -m "Configure Web3Forms access key"
   git push
   ```
2. Test the form on your live site
3. You'll receive newsletter submissions at info@ordosaxum.ca

## How It Works

- User fills out the form and clicks "Join"
- Form data is sent directly to Web3Forms API
- Web3Forms forwards the email to info@ordosaxum.ca
- User sees success message and modal closes
- No email client needed - fully automatic!

## What You'll Receive

Each submission will include:
- **Subject:** New Newsletter Subscription - OrdoSaxum
- **User Type:** (Homeowner/Designer/Architect/etc.)
- **Email Address:** Subscriber's email
- **Consent:** Yes (confirmed they agreed to terms)

## Free Tier Limits

- 250 submissions per month (free)
- No credit card required
- Spam filtering included
- Email notifications

## Troubleshooting

**Form not working?**
- Make sure you replaced `YOUR_ACCESS_KEY_HERE` with your actual key
- Check browser console for errors (F12)
- Verify you're using the correct email address

**Need more submissions?**
- Upgrade to Web3Forms Pro for unlimited submissions
- Or switch to EmailJS or another service

## Alternative: EmailJS Setup

If you prefer EmailJS instead:
1. Visit https://emailjs.com
2. Create account and set up email service
3. Let me know and I'll switch the integration

---

**Questions?** Just ask and I'll help configure everything!
