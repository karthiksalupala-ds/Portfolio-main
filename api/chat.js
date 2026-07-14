// api/chat.js — Vercel Serverless Function
// This runs on the SERVER. The OpenAI API key never reaches the browser.

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY; // The user will place their OpenRouter key here
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://karthik-portfolio-henna.vercel.app', // Optional, for OpenRouter rankings
        'X-Title': 'Karthik Portfolio Chatbot', // Optional, for OpenRouter rankings
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-lite-preview-02-05:free', // Fast, high-quality, free model!
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'OpenRouter error' });
    }

    const data = await response.json();
    return res.status(200).json({ reply: data.choices?.[0]?.message?.content?.trim() || '' });
  } catch (error) {
    console.error('OpenAI proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
