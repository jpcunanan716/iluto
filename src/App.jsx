import React, { useState, useEffect } from 'react';
import { ChefHat, Plus, X, Sparkles, Clock, Users, Star, Calendar, Search } from 'lucide-react';

// Groq API Integration - Browser-safe configuration
const getAPIKey = () => {
  // For development - using environment variables
  return import.meta.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY;
};

const GROQ_API_KEY = getAPIKey();

const callGroqAPI = async (prompt, isFeaturedDish = false) => {
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
            content: `You are a professional chef with 20 years of experience. Focus on practical, delicious recipes that home cooks can easily follow. Always respond with valid JSON only, no additional text or formatting. ${isFeaturedDish ? 'Generate one special featured recipe' : 'Generate an array of 2-3 recipes'}.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response
    return JSON.parse(content);
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

    return [
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
      }
    ];
  }
};

const RecipeCard = ({ recipe, isFeatured = false }) => (
  <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ${isFeatured ? 'ring-2 ring-orange-400 shadow-2xl' : ''}`}>
    {isFeatured && (
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 flex items-center gap-2">
        <Star className="w-4 h-4" />
        <span className="font-semibold">Today's Featured Dish</span>
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
      <p className="text-gray-600 mb-4">{recipe.description}</p>

      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{recipe.cookTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{recipe.servings} servings</span>
        </div>
        <div className="flex items-center gap-1">
          <ChefHat className="w-4 h-4" />
          <span>{recipe.difficulty}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Ingredients:</h4>
        <div className="flex flex-wrap gap-2">
          {recipe.ingredients.map((ingredient, index) => (
            <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Instructions:</h4>
        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  </div>
);

const IngredientTag = ({ ingredient, onRemove }) => (
  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
    {ingredient}
    <button onClick={onRemove} className="text-blue-600 hover:text-blue-800">
      <X className="w-3 h-3" />
    </button>
  </span>
);

export default function RecipeFinderApp() {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [featuredDish, setFeaturedDish] = useState(null);
  const [loading, setLoading] = useState(false);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  // Load featured dish on component mount
  useEffect(() => {
    loadFeaturedDish();
  }, []);

  const loadFeaturedDish = async () => {
    setFeaturedLoading(true);
    try {
      const currentDate = new Date().toDateString();
      const prompt = `Create a featured recipe for ${currentDate}. Consider seasonal ingredients and popular cuisines. Return JSON format:
      {
        "name": "Recipe Name",
        "description": "Brief appetizing description",
        "cookTime": "X mins",
        "servings": "X",
        "difficulty": "Easy/Medium/Hard",
        "ingredients": ["ingredient1", "ingredient2", "ingredient3"],
        "instructions": ["step1", "step2", "step3", "step4"]
      }`;
      const dish = await callGroqAPI(prompt, true);
      setFeaturedDish(dish);
    } catch (error) {
      console.error('Error loading featured dish:', error);
    } finally {
      setFeaturedLoading(false);
    }
  };

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim().toLowerCase())) {
      setIngredients([...ingredients, currentIngredient.trim().toLowerCase()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove));
  };

  const findRecipes = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    try {
      const prompt = `Create recipes using these available ingredients: ${ingredients.join(', ')}. 
      Requirements:
      - Use most of the provided ingredients
      - Include cooking time and difficulty
      - Provide 4-6 clear instructions or more if necessary
      - Include serving size
      - Consider dietary restrictions
      - Include a variety of cuisines
      - Include a brief description for each recipe
      - Include cooking tips or variations
      - If no recipes found, return a message saying "No recipes found with the given ingredients."


      Return ONLY valid JSON in this exact format:
      [
        {
          "name": "Recipe Name",
          "description": "Brief description",
          "cookTime": "X mins",
          "servings": "X people",
          "difficulty": "Easy/Medium/Hard",
          "ingredients": ["ingredient1", "ingredient2"],
          "instructions": ["step1", "step2", "step3"]
        }
      ]
      `;
      const recipeSuggestions = await callGroqAPI(prompt, false);
      setRecipes(Array.isArray(recipeSuggestions) ? recipeSuggestions : [recipeSuggestions]);
    } catch (error) {
      console.error('Error finding recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-400 to-pink-500 p-3 rounded-2xl">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  AI Recipe Finder
                </h1>
                <p className="text-gray-600 text-sm">Powered by Groq AI</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Dish Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Today's Featured Dish</h2>
            <p className="text-gray-600">Discover something delicious to try today</p>
          </div>

          {featuredLoading ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading today's featured dish...</p>
            </div>
          ) : featuredDish && (
            <div className="max-w-4xl mx-auto">
              <RecipeCard recipe={featuredDish} isFeatured={true} />
            </div>
          )}
        </section>

        {/* Ingredient Input Section */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Find Recipes by Ingredients</h2>
              <p className="text-gray-600">Tell us what you have, and we'll suggest amazing recipes</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={currentIngredient}
                    onChange={(e) => setCurrentIngredient(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter an ingredient (e.g., chicken, tomatoes, pasta...)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                  />
                </div>
                <button
                  onClick={addIngredient}
                  className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all duration-200 flex items-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {ingredients.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Your Ingredients:</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ingredients.map((ingredient, index) => (
                      <IngredientTag
                        key={index}
                        ingredient={ingredient}
                        onRemove={() => removeIngredient(ingredient)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={findRecipes}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Finding Recipes...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Find Recipes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Recipe Results */}
        {recipes.length > 0 && (
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Suggestions</h2>
              <p className="text-gray-600">Based on your available ingredients</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {ingredients.length === 0 && recipes.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-orange-400 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Cook Something Amazing?</h3>
            <p className="text-gray-600">Add your ingredients above to get personalized recipe suggestions!</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ChefHat className="w-6 h-6" />
              <span className="text-xl font-bold">AI Recipe Finder</span>
            </div>
            <p className="text-gray-400">Powered by Groq AI • Making cooking easier, one recipe at a time</p>
          </div>
        </div>
      </footer>
    </div>
  );
}