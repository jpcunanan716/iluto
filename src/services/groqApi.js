// Groq API Integration - Browser-safe configuration
const getAPIKey = () => {
    // For development - using environment variables
    return import.meta.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY;
};

const GROQ_API_KEY = getAPIKey();

const callGroqAPI = async (prompt, isFeaturedDish = false, numberOfRecipes = 10) => {
    try {
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
                        content: `You are a chef with 20 years of experience with all types of cuisine from all around the world. 
                        Focus on practical, delicious recipes that asian-filipino home cooks can easily follow. 
                        Always respond with valid JSON only, no additional text or formatting. 
                        ${isFeaturedDish ?
                                'Generate one featured recipe in valid JSON format.' :
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
              ]`}`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                model: 'llama3-8b-8192',
                temperature: 0.7,
                max_tokens: 8192, // Increased significantly for more recipes
                stream: false
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Unexpected response structure from API');
        }

        const content = data.choices[0].message.content;
        console.log('Raw API response content:', content); // Debug log

        // Clean the content
        const cleanedContent = content.trim();

        // Try parsing as JSON
        try {
            const parsedData = JSON.parse(cleanedContent);

            // Validate that we got the expected number of recipes (for arrays)
            if (Array.isArray(parsedData) && !isFeaturedDish) {
                console.log(`Generated ${parsedData.length} recipes (requested ${numberOfRecipes})`);
                if (parsedData.length < numberOfRecipes) {
                    console.warn(`Only received ${parsedData.length} recipes instead of ${numberOfRecipes}`);
                }
            }

            return parsedData;
        } catch (jsonError) {
            console.error('JSON parse failed:', jsonError.message);

            // Try to extract JSON from markdown code blocks
            const jsonMatch = cleanedContent.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
            if (jsonMatch) {
                try {
                    return JSON.parse(jsonMatch[1].trim());
                } catch (markdownJsonError) {
                    console.error('Markdown JSON parse failed:', markdownJsonError.message);
                }
            }

            // Try to find JSON boundaries
            const jsonObjectMatch = cleanedContent.match(/(\{[\s\S]*\})/);
            const jsonArrayMatch = cleanedContent.match(/(\[[\s\S]*\])/);

            if (jsonObjectMatch) {
                try {
                    return JSON.parse(jsonObjectMatch[1]);
                } catch (objectParseError) {
                    console.error('Object JSON parse failed:', objectParseError.message);
                }
            }

            if (jsonArrayMatch) {
                try {
                    return JSON.parse(jsonArrayMatch[1]);
                } catch (arrayParseError) {
                    console.error('Array JSON parse failed:', arrayParseError.message);
                }
            }

            throw new Error(`Invalid JSON format in response. Content: ${cleanedContent.substring(0, 200)}...`);
        }
    } catch (error) {
        console.error('Groq API Error:', error);

        // Fallback to mock data if API fails
        if (isFeaturedDish) {
            return {
                name: "Mediterranean Quinoa Bowl",
                description: "A vibrant bowl packed with fresh vegetables, quinoa, feta cheese, and a zesty lemon-herb dressing.",
                cookTime: "25 mins",
                servings: "4",
                difficulty: "Easy",
                ingredients: ["quinoa", "cucumber", "tomatoes", "feta cheese", "olive oil", "lemon", "herbs"],
                instructions: [
                    "Cook quinoa according to package directions",
                    "Dice cucumber and tomatoes",
                    "Whisk together olive oil, lemon juice, and herbs",
                    "Combine all ingredients and toss with dressing"
                ]
            };
        }

        // Generate multiple fallback recipes based on numberOfRecipes
        const fallbackRecipes = [];
        const baseRecipes = [
            {
                name: "Simple Pasta Dish",
                description: "A quick and easy pasta recipe with available ingredients.",
                cookTime: "20 mins",
                servings: "2",
                difficulty: "Easy",
                ingredients: ["pasta", "olive oil", "garlic"],
                instructions: [
                    "Cook pasta according to package directions",
                    "Sauté garlic in olive oil",
                    "Toss pasta with garlic oil",
                    "Season with salt and pepper"
                ]
            },
            {
                name: "Filipino Adobo",
                description: "Classic Filipino braised pork in soy sauce and vinegar.",
                cookTime: "45 mins",
                servings: "4",
                difficulty: "Medium",
                ingredients: ["pork belly", "soy sauce", "vinegar", "garlic", "bay leaves"],
                instructions: [
                    "Marinate pork in soy sauce and vinegar",
                    "Brown the pork in a pot",
                    "Add marinade and simmer until tender",
                    "Serve with rice"
                ]
            },
            {
                name: "Vegetable Fried Rice",
                description: "Quick and nutritious fried rice with mixed vegetables.",
                cookTime: "15 mins",
                servings: "3",
                difficulty: "Easy",
                ingredients: ["cooked rice", "mixed vegetables", "soy sauce", "eggs", "oil"],
                instructions: [
                    "Heat oil in wok or large pan",
                    "Scramble eggs and set aside",
                    "Stir-fry vegetables",
                    "Add rice and eggs, season with soy sauce"
                ]
            }
        ];

        // Repeat recipes to meet the requested number
        for (let i = 0; i < numberOfRecipes; i++) {
            fallbackRecipes.push({
                ...baseRecipes[i % baseRecipes.length],
                name: `${baseRecipes[i % baseRecipes.length].name} ${Math.floor(i / baseRecipes.length) + 1}`
            });
        }

        return fallbackRecipes;
    }
};

export default callGroqAPI;