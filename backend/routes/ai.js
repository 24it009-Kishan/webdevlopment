const express = require('express');
const OpenAI = require('openai');
// adjust the path/name to match your existing auth middleware
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// API key is read ONLY on the server
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 10000, // fail fast if the AI service hangs
  maxRetries: 0,
});

// simple in-memory rate limit: 1 AI request per task title per minute
const WINDOW_MS = 60 * 1000;
const lastCall = new Map();
setInterval(() => {
  const now = Date.now();
  for (const [k, t] of lastCall) if (now - t > WINDOW_MS) lastCall.delete(k);
}, WINDOW_MS).unref();

router.post('/generate-description', protect, async (req, res) => {
  const title = String(req.body.title || '').trim().slice(0, 150);
  if (!title) {
    return res.status(400).json({ description: '', message: 'Task title is required.' });
  }

  // ---- rate limit ----
  const key = `${req.user?.id || req.user?._id || req.ip}:${title.toLowerCase()}`;
  const now = Date.now();
  const last = lastCall.get(key);
  if (last && now - last < WINDOW_MS) {
    const wait = Math.ceil((WINDOW_MS - (now - last)) / 1000);
    return res.status(429).json({
      description: '',
      rateLimited: true,
      retryAfter: wait,
      message: `Please wait ${wait}s before generating again for this task.`,
    });
  }
  lastCall.set(key, now);

  try {
    // only the task TITLE is sent to the external API (data minimisation)
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 120,
      messages: [
        { role: 'system', content: 'You write concise task descriptions (2-3 sentences, plain text).' },
        { role: 'user', content: `Write a short task description for: ${title}` },
      ],
    });
    const description = completion.choices[0]?.message?.content?.trim();
    if (!description) throw new Error('Empty AI response');
    res.json({ description, fallback: false });
  } catch (err) {
    // graceful degradation: never break task creation
    console.error('AI call failed:', err.status || err.code || err.message);
    res.status(200).json({
      description: '',
      fallback: true,
      message: 'AI suggestion is unavailable right now. You can write the description manually.',
    });
  }
});

module.exports = router;

