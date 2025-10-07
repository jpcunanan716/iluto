// api/groq-proxy.js
export default async function handler(req, res) {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
        console.error('GROQ_API_KEY environment variable not set');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const { prompt, isFeaturedDish = false, numberOfRecipes = 10 } = req.body;

        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({ error: 'Valid prompt is required' });
        }

        const systemMessage = `You are a chef with 20 years of experience with all types of cuisine. 
        Focus on practical, delicious recipes that home cooks can easily follow. add a variety of cuisines with
        inclination to asian-filipino recipes and ingredients to keep the recipes interesting and diverse.
        Always respond with valid JSON only, no additional text or formatting. always generate at least 10 recipes per request. 
        ${isFeaturedDish ?
                'Generate one featured recipe in valid JSON format. Include a variety of cuisines with an inclination towards Asian-Filipino recipes' :
                `Generate exactly ${numberOfRecipes} recipes in a valid JSON array.`} Format:
              ${isFeaturedDish ? `
              {
                "name": "string",
                "description": "string",
                "cookTime": "string",
                "servings": "string",
                "difficulty": "string",
                "ingredients": ["string"],
                "instructions": ["string"]
              }` : `
              [
                {
                  "name": "string",
                  "description": "string",
                  "cookTime": "string",
                  "servings": "string",
                  "difficulty": "string",
                  "ingredients": ["string"],
                  "instructions": ["string"]
                }
              ]`}`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'system',
                        content: systemMessage
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.8,
                max_tokens: 32768,
                stream: false
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Groq API Error:', response.status, errorText);

            // Return user-friendly error messages
            if (response.status === 401) {
                return res.status(500).json({ error: 'API authentication failed' });
            } else if (response.status === 429) {
                return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
            } else {
                return res.status(500).json({ error: 'Recipe generation failed. Please try again.' });
            }
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('Unexpected Groq API response structure:', data);
            return res.status(500).json({ error: 'Invalid response from recipe service' });
        }

        return res.status(200).json({
            success: true,
            content: data.choices[0].message.content,
            usage: data.usage
        });

    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({
            error: 'Internal server error. Please try again later.'
        });
    }
}