/*
  CommonJS server entry for environments where top-level project is ESM.
  Run with: node server/index.cjs
*/
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const path = require('path');

dotenv.config();

const dataProvider = require('./dataProvider.cjs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve user images folder as static at /images
const imagesPath = path.join(__dirname, '..', 'My images');
app.use('/images', express.static(imagesPath));

function safeJson(res, data) {
  return res.json(data);
}

function friendlyError(res) {
  return res.status(500).json({
    error: true,
    message: "Sorry — I'm having trouble answering right now. Please try again later."
  });
}

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/okk_portfolio';
  try {
    await mongoose.connect(uri, { dbName: process.env.DB_NAME || 'okk_portfolio' });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err && err.message ? err.message : err);
  }
}

connectDB();

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@rudra.com' && password === 'admin123') {
    const token = jwt.sign({ _id: '1', email }, process.env.JWT_SECRET || 'secret');
    return safeJson(res, { token, user: { name: 'Rudra Admin' } });
  }
  return res.status(400).json({ message: 'Invalid Credentials' });
});

app.post('/api/contact', async (req, res) => {
  try {
    const data = req.body;
    await dataProvider.saveContact(data);
    return safeJson(res, { success: true, message: 'Message received' });
  } catch (err) {
    return friendlyError(res);
  }
});

app.get('/api/admin/stats', verifyToken, async (req, res) => {
  try {
    const messages = await dataProvider.countContacts();
    const projects = (await dataProvider.getProjects()).length;
    return safeJson(res, { visits: 12500, messages, projects, conversionRate: '3.2%' });
  } catch (err) {
    return friendlyError(res);
  }
});

app.get('/api/admin/messages', verifyToken, async (req, res) => {
  try {
    const messages = await dataProvider.findContacts(50);
    return safeJson(res, messages);
  } catch (err) {
    return friendlyError(res);
  }
});

app.get('/api/about/:mode?', async (req, res) => {
  try {
    const mode = req.params.mode || 'short';
    const doc = await dataProvider.getAbout(mode);
    if (!doc) return safeJson(res, { content: '', timeline: [], skills: [] });
    return safeJson(res, doc);
  } catch (err) {
    return friendlyError(res);
  }
});

app.get('/api/about/timeline', async (req, res) => {
  try {
    const doc = await dataProvider.getTimeline();
    return safeJson(res, doc || []);
  } catch (err) {
    return friendlyError(res);
  }
});

app.get('/api/services', async (req, res) => {
  try {
    const items = await dataProvider.getServices();
    return safeJson(res, items);
  } catch (err) {
    return friendlyError(res);
  }
});

app.get('/api/faqs', async (req, res) => {
  try {
    const items = await dataProvider.getFAQs();
    return safeJson(res, items);
  } catch (err) {
    return friendlyError(res);
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await dataProvider.getProjects();
    const grouped = { video: [], dev: [] };
    projects.forEach(p => grouped[p.mode] ? grouped[p.mode].push(p) : null);
    return safeJson(res, grouped);
  } catch (err) {
    return friendlyError(res);
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message = '' } = req.body || {};
    const normalized = String(message).toLowerCase();

    const intentMatchers = [
      { intent: 'about', keywords: ['about', 'who are you', 'who is', 'about you', 'tell me about'] },
      { intent: 'services', keywords: ['service', 'services', 'offer', 'what do you'] },
      { intent: 'projects', keywords: ['project', 'projects', 'portfolio', 'work', 'showcase'] },
      { intent: 'faq', keywords: ['faq', 'faqs', 'question', 'questions', 'help'] },
      { intent: 'contact', keywords: ['contact', 'hire', 'work with', 'get in touch'] }
    ];

    let matched = null;
    for (const m of intentMatchers) {
      for (const k of m.keywords) {
        if (normalized.includes(k)) {
          matched = m.intent;
          break;
        }
      }
      if (matched) break;
    }

    if (matched === 'about') {
      const doc = await dataProvider.getAbout('short');
      const reply = doc?.content || "I am an assistant that can tell you about the developer and their experience.";
      return safeJson(res, { reply, intent: 'about', confidence: 0.9 });
    }

    if (matched === 'services') {
      const items = await dataProvider.getServices();
      const summary = (items || []).slice(0,6).map(s => `• ${s.title}: ${s.summary || ''}`).join('\n') || 'I offer development and creative services.';
      return safeJson(res, { reply: summary, intent: 'services', confidence: 0.9 });
    }

    if (matched === 'projects') {
      const projects = await dataProvider.getProjects();
      const summary = (projects || []).slice(0,6).map(p => `• ${p.title} (${p.mode || 'dev'}) - ${p.description || ''}`).join('\n') || 'I have worked on several projects across video and development.';
      return safeJson(res, { reply: summary, intent: 'projects', confidence: 0.9 });
    }

    if (matched === 'faq') {
      const faqs = await dataProvider.getFAQs();
      const summary = (faqs || []).slice(0,5).map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n') || 'I can answer common questions about services, pricing, and timelines.';
      return safeJson(res, { reply: summary, intent: 'faq', confidence: 0.85 });
    }

    if (matched === 'contact') {
      return safeJson(res, { reply: 'You can contact via the contact form on the site or email me directly.', intent: 'contact', confidence: 0.9 });
    }

    return safeJson(res, {
      reply: "I didn't quite get that. Could you rephrase or ask about 'about', 'services', 'projects', or 'faqs'?",
      intent: 'fallback',
      confidence: 0.5
    });

  } catch (err) {
    return friendlyError(res);
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.message ? err.message : err);
  return friendlyError(res);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
