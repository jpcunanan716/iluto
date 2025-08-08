const callGroqAPI = async (prompt, isFeaturedDish = false, numberOfRecipes = 10) => {
    try {
        const response = await fetch('/api/groq-proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                isFeaturedDish,
                numberOfRecipes
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success || !data.content) {
            throw new Error('Unexpected response structure from API');
        }

        const content = data.content;
        console.log('Raw API response content:', content); // Debug log

        const cleanedContent = content.trim();

        try {
            const parsedData = JSON.parse(cleanedContent);

            if (Array.isArray(parsedData) && !isFeaturedDish) {
                console.log(`Generated ${parsedData.length} recipes (requested ${numberOfRecipes})`);
                if (parsedData.length < numberOfRecipes) {
                    console.warn(`Only received ${parsedData.length} recipes instead of ${numberOfRecipes}`);
                }
            }

            return parsedData;
        } catch (jsonError) {
            console.error('JSON parse failed:', jsonError.message);

            const jsonMatch = cleanedContent.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
            if (jsonMatch) {
                try {
                    return JSON.parse(jsonMatch[1].trim());
                } catch (markdownJsonError) {
                    console.error('Markdown JSON parse failed:', markdownJsonError.message);
                }
            }

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

        // fallback logic
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