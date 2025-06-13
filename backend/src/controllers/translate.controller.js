// controllers/translate.controller.js
import  OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const translateMessage = async (req, res) => {
  const { message, targetLang = 'English' } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const prompt = `Translate the following message to ${targetLang}: "${message}"`;
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const translated = completion.data.choices[0].message.content.trim();
    res.json({ translated });
  } catch (error) {
    console.error('Translation error:', error.message);
    res.status(500).json({ error: 'Translation failed' });
  }
};
