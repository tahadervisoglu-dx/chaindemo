// Vercel serverless function for OpenAI API calls
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API key from environment variables (server-side only)
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    const { context, data, lang } = req.body;

    if (!context || !data || !lang) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const prompt = `
      Analyze the following supply chain data for the section: ${context}.
      Data: ${JSON.stringify(data)}
      
      Please provide a concise analysis in ${lang} including:
      1. Key Trends observed.
      2. Potential risks or bottlenecks.
      3. Actionable recommendations.
      
      Keep the tone professional and expert-level.
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert supply chain analyst providing professional insights and recommendations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const result = await response.json();
    const insight = result.choices[0]?.message?.content || "No insights generated.";

    return res.status(200).json({ insight });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return res.status(500).json({ error: 'Error generating insights. Please try again later.' });
  }
}