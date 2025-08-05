import { Eye, Clock, Users, ChefHat, Star } from "lucide-react";
import PropTypes from 'prop-types';

const RecipeCard = ({ recipe, isFeatured = false, onClick }) => {
    // Safely handle missing ingredients array
    const ingredients = Array.isArray(recipe?.ingredients) ? recipe.ingredients : [];

    return (
        <div
            className={`bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer group ${isFeatured ? 'ring-2 ring-orange-400 shadow-2xl' : ''}`}
            onClick={() => onClick && onClick(recipe)}
        >
            {isFeatured && (
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span className="font-semibold">Today's Featured Dish</span>
                </div>
            )}
            <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800 flex-1">{recipe?.name || 'Unnamed Recipe'}</h3>
                    {!isFeatured && (
                        <div className="ml-2 p-2 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-4 h-4 text-blue-500" />
                        </div>
                    )}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{recipe?.description || 'No description available'}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe?.cookTime || 'Time not specified'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe?.servings || 'Servings not specified'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ChefHat className="w-4 h-4" />
                        <span>{recipe?.difficulty || 'Difficulty not specified'}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Ingredients:</h4>
                    <div className="flex flex-wrap gap-2">
                        {ingredients.slice(0, 4).map((ingredient, index) => (
                            <span key={index} className="bg-orange-100 text-orange-800 px-6 py-1 rounded-full text-xs">
                                {ingredient}
                            </span>
                        ))}
                        {ingredients.length > 4 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                +{ingredients.length - 4} more
                            </span>
                        )}
                        {ingredients.length === 0 && (
                            <span className="text-gray-500 text-xs">No ingredients listed</span>
                        )}
                    </div>
                </div>

                {!isFeatured && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium">
                            <Eye className="w-4 h-4" />
                            View Full Recipe
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        cookTime: PropTypes.string,
        servings: PropTypes.string,
        difficulty: PropTypes.string,
        ingredients: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    isFeatured: PropTypes.bool,
    onClick: PropTypes.func,
};

RecipeCard.defaultProps = {
    isFeatured: false,
    onClick: () => { },
};

export default RecipeCard;