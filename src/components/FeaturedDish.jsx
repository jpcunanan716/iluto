import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import callGroqAPI from '../services/groqAPI';
import LoadingSpinner from '../ui/LoadingSpinner';

const FeaturedDish = () => {
    const [featuredDish, setFeaturedDish] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadFeaturedDish = async () => {
        setLoading(true);
        setError(null);
        try {
            const currentDate = new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });

            const prompt = `Create a featured recipe for ${currentDate}. 
      Requirements:
      - Must be valid JSON format
      - Include name, description, cookTime, servings, difficulty
      - List 5-8 ingredients
      - Provide 4-6 clear instructions
      - Focus on seasonal ingredients
      - Difficulty should be Easy or Medium`;

            const dish = await callGroqAPI(prompt, true);

            // Validate the response structure
            if (!dish || !dish.name || !dish.ingredients) {
                throw new Error('Invalid recipe format received');
            }

            setFeaturedDish(dish);
        } catch (err) {
            console.error('Error loading featured dish:', err);
            setError('Failed to load featured dish. Showing a delicious fallback recipe.');
            setFeaturedDish(callGroqAPI.getFallbackFeaturedDish());
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeaturedDish();
    }, []);

    if (loading) {
        return (
            <div className="p-6 text-center flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                {featuredDish && <RecipeCard recipe={featuredDish} isFeatured={true} />}
            </div>
        );
    }

    return (
        <section className="mb-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Today's Featured Dish</h2>
                <p className="text-gray-600">Discover something delicious to try today</p>
            </div>
            <div className="max-w-4xl mx-auto">
                <RecipeCard recipe={featuredDish} isFeatured={true} />
            </div>
        </section>
    );
};

export default FeaturedDish;