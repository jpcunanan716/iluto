import React, { useState, useEffect } from 'react';
import { Header, Footer, RecipeModal, RecipeResults, IngredientInput } from './components';
import FeaturedDish from './components/FeaturedDish';
import callGroqAPI from './services/groqApi';


export default function RecipeFinderApp() {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [featuredDish, setFeaturedDish] = useState(null);
  const [loading, setLoading] = useState(false);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Load featured dish on component mount
  useEffect(() => {
    loadFeaturedDish();
  }, []);

  const loadFeaturedDish = async () => {
    setFeaturedLoading(true);
    try {
      const currentDate = new Date().toDateString();
      const prompt = `Create a featured recipe for ${currentDate}. Consider unique and easy to make asian-filipino cuisines. Return JSON format:
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

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
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
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Dish Section */}
        <FeaturedDish
          dish={featuredDish}
          loading={featuredLoading}
          onLoad={loadFeaturedDish}
          error={featuredDish ? null : 'Failed to load featured dish. Showing a delicious fallback recipe.'}
        />

        {/* Ingredient Input Section */}
        <IngredientInput
          ingredients={ingredients}
          currentIngredient={currentIngredient}
          setCurrentIngredient={setCurrentIngredient}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          findRecipes={findRecipes}
          loading={loading}
          handleKeyPress={handleKeyPress}
        />

        {/* Recipe Results */}
        <RecipeResults
          recipes={recipes}
          handleRecipeClick={handleRecipeClick}
          loading={loading}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </div>
  );
}