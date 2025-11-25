# 🤖 Local AI Chat Setup with Ollama

Your portfolio now uses **Ollama** - a local AI model that runs on your machine without any API keys!

## Quick Setup (5 minutes)

### Step 1: Download Ollama
👉 **Download**: https://ollama.ai

Choose your OS (Windows, Mac, Linux) and install.

### Step 2: Install the AI Model
After installing Ollama, open **Terminal/PowerShell** and run:

```bash
ollama pull mistral
```

This downloads the Mistral model (~4GB). First time will take a few minutes.

### Step 3: Run Ollama
Ollama runs as a background service. Start it:

```bash
ollama serve
```

Leave this terminal window open. You'll see:
```
binding 127.0.0.1:11434
```

✅ **That's it!** Ollama is now running on `localhost:11434`

### Step 4: Test the Chat
1. Refresh your portfolio website
2. Open the AI chat (bottom-right corner)
3. Ask: "What does Rudra do?"
4. The AI will respond with info from your portfolio!

---

## How It Works

- **No internet needed** ✅ (after first model download)
- **No API keys** ✅
- **Runs offline** ✅
- **Fast responses** ✅
- **Your data stays local** ✅

## Troubleshooting

### Chat says "Ollama isn't running"
- Make sure terminal window with `ollama serve` is open
- Check http://localhost:11434 in browser (should show Ollama response)

### Model is too slow
- Default: **Mistral** (fastest, 4GB)
- Alternative: `ollama pull neural-chat` (smaller, 3.8GB)
- Premium: `ollama pull llama2` (better quality, 4GB)

### Want faster responses?
Try this lighter model:
```bash
ollama pull neural-chat
```

Then update `geminiService.ts` line with:
```typescript
model: "neural-chat"  // instead of "mistral"
```

### Model keeps downloading
- First `ollama pull` can take 10+ minutes on slow internet
- Just wait, it's a one-time download
- After that, responses are instant

---

## Models Available

| Model | Size | Speed | Quality |
|-------|------|-------|---------|
| neural-chat | 3.8GB | ⚡⚡⚡ | ⭐⭐⭐ |
| mistral | 4GB | ⚡⚡⭐ | ⭐⭐⭐⭐ |
| llama2 | 4GB | ⚡ | ⭐⭐⭐⭐⭐ |

Use the command:
```bash
ollama pull [model-name]
```

---

## For Deployment (Production)

If deploying to a live server, you have options:

1. **Keep Local** - Server runs Ollama, same setup
2. **Switch to API** - Use a cloud service (Together AI, Replicate, etc.)
3. **Hybrid** - Local for dev, API for production

For now, local works great for demos!

---

**Questions?** Check Ollama docs: https://ollama.ai
