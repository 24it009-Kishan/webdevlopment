  
const express = require('express');
const OpenAI = require('openai');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Initialize OpenAI only when API key is available
const client = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 10000,
      maxRetries: 0,
    })
  : null;

// Rate limit: 1 AI request per task title per minute
const WINDOW_MS = 60 * 1000;
const lastCall = new Map();

// Clean expired rate-limit entries
const cleanupTimer = setInterval(() => {
  const now = Date.now();

  for (const [key, timestamp] of lastCall.entries()) {
    if (now - timestamp > WINDOW_MS) {
      lastCall.delete(key);
    }
  }
}, WINDOW_MS);

cleanupTimer.unref();

// Generate AI task description
router.post('/generate-description', protect, async (req, res) => {
  const title = String(req.body?.title || '')
    .trim()
    .slice(0, 150);

  // Validate task title
  if (!title) {
    return res.status(400).json({
      description: '',
      message: 'Task title is required.',
    });
  }

  // Graceful fallback when API key is unavailable
  if (!client) {
    return res.status(200).json({
      description: '',
      fallback: true,
      message:
        'AI suggestion is unavailable right now. You can write the description manually.',
    });
  }

  // Rate limit
  const userId = req.user?.id || req.user?._id || req.ip;
  const key = `${userId}:${title.toLowerCase()}`;
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
    // Only the task title is sent to OpenAI
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 120,
      messages: [
        {
          role: 'system',
          content:
            'You write concise task descriptions (2-3 sentences, plain text).',
        },
        {
          role: 'user',
          content: `Write a short task description for: ${title}`,
        },
      ],
    });

    const description = completion.choices[0]?.message?.content?.trim();

    if (!description) {
      throw new Error('Empty AI response');
    }

    return res.json({
      description,
      fallback: false,
    });
  } catch (err) {
    console.error(
      'AI call failed:',
      err.status || err.code || err.message
    );

    return res.status(200).json({
      description: '',
      fallback: true,
      message:
        'AI suggestion is unavailable right now. You can write the description manually.',
    });
  }
});

module.exports = router;
