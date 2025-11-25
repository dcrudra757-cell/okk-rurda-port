# 🤖 AI Chat Setup - Online Version (For All Visitors)

Your portfolio now uses **Hugging Face Inference API** - a free online AI service that works for everyone!

## Quick Setup (2 minutes)

### Step 1: Create Free Hugging Face Account
👉 **Go to:** https://huggingface.co/settings/tokens

1. Click "New token"
2. Choose: **"Fine-grained token"**
3. Give it name: "Portfolio AI"
4. Check permission: **"Make calls to Inference Providers"**
5. Create token
6. **Copy the token** (starts with `hf_...`)

### Step 2: Add Token to `.env`
Open `.env` file and replace:

```env
VITE_HF_API_KEY=hf_YOUR_TOKEN_HERE
```

with your actual token:

```env
VITE_HF_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Restart Dev Server
Save `.env` and restart your dev server. That's it! ✅

---

## Testing the Chat

1. Open your portfolio website
2. Click the **AI chat icon** (bottom-right)
3. Ask: "What does Rudra do?"
4. AI will answer instantly! 🎉

### Try These Questions:
- "Tell me about your video editing services"
- "What web development projects have you done?"
- "What's your turnaround time for projects?"
- "Can you edit Reels?"
- "Do you do SEO work?"

---

## How It Works

### For You (Developer):
- ✅ Free tier: Unlimited messages
- ✅ No credit card needed
- ✅ Works online instantly
- ✅ Zero setup complexity

### For Visitors:
- ✅ Everyone can use the AI chat
- ✅ Works from anywhere
- ✅ Gets real answers about Rudra's services
- ✅ Fast responses

---

## Troubleshooting

### "AI is not configured yet!"
- Make sure you added token to `.env`
- Restart dev server (stop and run `npm run dev` again)
- Check token starts with `hf_`

### Chat is slow (10+ seconds)
- First request can be slow (model loading)
- Subsequent messages are faster
- Check your internet connection

### Token keeps showing as invalid
1. Go back to: https://huggingface.co/settings/tokens
2. Create a NEW token (delete old one if needed)
3. Copy entire token value
4. Replace in `.env` and restart

### "Make calls to Inference Providers" not showing?
- Create **"Fine-grained token"** not "Personal token"
- Make sure you have the specific permission selected

---

## What AI Model Is Being Used?

We're using **Zephyr-7B** - a small but smart model:
- ✅ Fast responses (5-10 seconds)
- ✅ Good quality answers
- ✅ Perfect for portfolio chat
- ✅ Knows about Rudra's services (from system prompt)

---

## For Production / Deployment

When deploying to live server:

1. **Keep the token secret** - Don't commit `.env` to GitHub
2. **Use environment variables** on your server
3. **Optional:** Set up a backend proxy (Node.js → Hugging Face) for extra security

For now, this setup works great for demos and testing!

---

## Free Tier Limits

Hugging Face free tier gives you:
- ✅ Generous inference quota
- ✅ No credit card required
- ✅ Enough for portfolio + visitors

If you hit limits, upgrade to **Pro** ($9/month) for higher quotas.

---

## Getting Your Token - Visual Guide

1. Go to https://huggingface.co/settings/tokens
2. Click **"New token"** button (top right)
3. Select **"Fine-grained token"**
4. Fill form:
   - Token name: "Portfolio AI"
   - Check: ☑️ "Make calls to Inference Providers"
5. Click "Create token"
6. Copy the long token string (starts with `hf_`)
7. Paste in `.env` file as shown above
8. Done! ✨

---

**Questions?** 
- HF Docs: https://huggingface.co/docs
- Free Token: https://huggingface.co/settings/tokens
