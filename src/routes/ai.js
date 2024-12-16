const express = require('express');
const router = express.Router();

router.post('/format', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API request failed');
    }

    const data = await response.json();
    res.json({ success: true, formattedText: data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;