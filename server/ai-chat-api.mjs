import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Enable CORS for all origins (or be more restrictive in production)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));
app.use(express.json());

// Try to dynamically import Google GenAI client if available and API key provided.
let genAIClient = null;
if (process.env.GOOGLE_API_KEY) {
  try {
    // attempt dynamic import of either package name variants
    try {
      genAIClient = await import('@google/generative-ai');
    } catch (e) {
      genAIClient = await import('@google/genai');
    }
  } catch (err) {
    console.warn('Google GenAI client not available — falling back to local responder');
    genAIClient = null;
  }
}

// In-memory session storage (use database in production)
const sessions = new Map();
const feedbackLog = [];

// System prompt for Ansh's AI assistant
const SYSTEM_PROMPT = `You are Ansh's AI Assistant, a professional and friendly AI. Ansh is a professional video editor and cinematic storyteller with expertise in video editing, visual effects, and content creation.

Key information about Ansh:
- Professional Video Editor & Cinematic Storyteller
- 5+ years of experience
- 200+ projects completed
- 100% client satisfaction
- Services: Video Editing, Motion Graphics, Color Grading, Visual Effects, Cinematic Direction
- Specialties: YouTube videos, reels, documentaries, corporate videos, commercials

When users ask about:
- Projects: Mention the portfolio of 200+ completed projects
- Services: Describe video editing, motion graphics, color grading, VFX
- Hiring: Direct them to contact page or suggest scheduling a call
- Skills: Highlight expertise in various video formats and editing software
- Small talk: Be friendly but guide toward services/projects

Be concise, professional, and helpful. Keep responses under 150 words. If asked something unrelated to Ansh's services, politely redirect to relevant topics.`;

// Helper to normalise incoming conversationHistory to Gemini format
function buildConversation(conversationHistory = []) {
  return conversationHistory.map(msg => ({ role: msg.role, parts: [{ text: msg.content }] }));
}

// POST /api/chat - Main chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId, conversationHistory } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: 'Message and sessionId required' });
    }

    // Initialize or get session
    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, {
        createdAt: new Date(),
        messageCount: 0,
        feedback: []
      });
    }

    const session = sessions.get(sessionId);
    session.messageCount += 1;

    // Build conversation for Gemini
    const conversationMessages = buildConversation(conversationHistory || []);

    // Add current message
    conversationMessages.push({ role: 'user', parts: [{ text: message }] });

    // Use the Generative AI client if available; otherwise use local rule-based responder
    let responseText = '';

    if (genAIClient && process.env.GOOGLE_API_KEY) {
      try {
        // Attempt a generic call depending on client shape
        const client = genAIClient.default || genAIClient;
        if (client && client.GenerativeServiceClient) {
          // @google/generative-ai style clients may require a different shape; attempt safe usage
          // Note: project-specific setup may be required. Here we'll attempt a minimal call if available.
          // If this fails, we'll fall back to local responder.
          const modelName = 'gemini-1.5';
          // Some packages expose simple createTextCompletion-style method
          if (client.createTextCompletion) {
            const resp = await client.createTextCompletion({
              model: modelName,
              prompt: `${SYSTEM_PROMPT}\n\nConversation:\n${conversationMessages.map(m => `${m.role}: ${m.parts.map(p => p.text).join(' ')}`).join('\n') }\nUser: ${message}`,
              max_output_tokens: 300
            });
            responseText = resp?.candidates?.[0]?.output || resp?.data?.[0]?.content || '';
          } else if (client.generateText) {
            const resp = await client.generateText({ model: modelName, input: `${SYSTEM_PROMPT}\n\n${message}` });
            responseText = resp?.output?.[0]?.content || '';
          } else {
            responseText = '';
          }
        } else {
          responseText = '';
        }
      } catch (err) {
        console.warn('GenAI client call failed, falling back to local responder', err?.message || err);
        responseText = null;
      }
    }

    // Local fallback responder (simple rule-based) if no cloud client or cloud call failed
    if (!responseText) {
      const lc = (str = '') => (str || '').toLowerCase();
      const msg = lc(message);
      // quick intent routing
      if (msg.includes('hire') || msg.includes('pricing') || msg.includes('contact')) {
        responseText = "Thanks — I'd love to help. Please use the Contact page to share project details and I'll get back to you.";
      } else if (msg.includes('portfolio') || msg.includes('work') || msg.includes('projects')) {
        responseText = "You can view my portfolio on the Projects page — I have 200+ completed projects across edits and web work.";
      } else if (msg.includes('youtube') || msg.includes('long form')) {
        responseText = "I specialize in YouTube editing: pacing, b-roll overlays, audio cleanup, and color grading. Typical turnaround 3-5 days for long form.";
      } else if (msg.includes('reel') || msg.includes('shorts') || msg.includes('tiktok')) {
        responseText = "I create high-retention reels and shorts with fast cuts, motion text, and color grading. Turnaround 24-48 hours for short-form work.";
      } else {
        // generic friendly reply using the system prompt tone
        responseText = "Hi — I'm Ansh (Rudra). I can help with video editing, motion graphics, color grading, and web projects. How can I help today?";
      }
    }

    // Log message for analytics
    session.lastMessage = {
      timestamp: new Date(),
      userMessage: message,
      aiResponse: responseText
    };

    res.json({
      response: responseText,
      sessionId: sessionId,
      messageCount: session.messageCount
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      details: process.env.NODE_ENV === 'development' ? (error?.message || String(error)) : undefined
    });
  }
});

// POST /api/feedback - User feedback on responses
app.post('/api/feedback', (req, res) => {
  try {
    const { messageId, type, sessionId } = req.body;

    if (!messageId || !type || !sessionId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const feedback = {
      messageId,
      type, // 'helpful' or 'unhelpful'
      sessionId,
      timestamp: new Date()
    };

    feedbackLog.push(feedback);

    // Update session feedback
    if (sessions.has(sessionId)) {
      const session = sessions.get(sessionId);
      session.feedback.push(feedback);
    }

    res.json({ success: true, message: 'Feedback recorded' });
  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({ error: 'Failed to record feedback' });
  }
});

// GET /api/sessions/:sessionId - Get session info
app.get('/api/sessions/:sessionId', (req, res) => {
  const { sessionId } = req.params;

  if (!sessions.has(sessionId)) {
    return res.status(404).json({ error: 'Session not found' });
  }

  const session = sessions.get(sessionId);
  res.json({
    sessionId,
    messageCount: session.messageCount,
    createdAt: session.createdAt,
    lastMessage: session.lastMessage,
    feedbackCount: session.feedback.length
  });
});

// GET /api/analytics - Admin analytics endpoint (add auth in production)
app.get('/api/analytics', (req, res) => {
  const totalSessions = sessions.size;
  const totalMessages = Array.from(sessions.values()).reduce((sum, s) => sum + s.messageCount, 0);
  const totalFeedback = feedbackLog.length;
  const helpfulCount = feedbackLog.filter(f => f.type === 'helpful').length;
  const unhelpfulCount = feedbackLog.filter(f => f.type === 'unhelpful').length;

  res.json({
    totalSessions,
    totalMessages,
    averageMessagesPerSession: (totalMessages / totalSessions || 0).toFixed(2),
    totalFeedback,
    helpfulPercentage: totalFeedback > 0 ? ((helpfulCount / totalFeedback) * 100).toFixed(1) : 0,
    feedback: {
      helpful: helpfulCount,
      unhelpful: unhelpfulCount
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.AI_PORT || process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AI Chat API running on port ${PORT}`);
  console.log('Endpoints:');
  console.log('  POST /api/chat - Send message');
  console.log('  POST /api/feedback - Submit feedback');
  console.log('  GET /api/sessions/:sessionId - Get session info');
  console.log('  GET /api/analytics - Get analytics');
  console.log('  GET /health - Health check');
});