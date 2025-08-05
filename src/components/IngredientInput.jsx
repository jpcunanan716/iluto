import { Plus, Search } from 'lucide-react';
import IngredientTag from './IngredientTag';
import PropTypes from 'prop-types';

const IngredientInput = ({
    ingredients = [],
    currentIngredient,
    setCurrentIngredient,
    addIngredient,
    removeIngredient,
    findRecipes,
    loading,
}) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addIngredient();
        }
    };

    return (
        <section className="mb-12">
            <div className="p-8">
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
                                placeholder="Enter an ingredient or dish (e.g., chicken, tomatoes, pasta...)"
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
                                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-3 rounded-xl hover:from-orange-600 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50"
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
    );
};

IngredientInput.propTypes = {
    ingredients: PropTypes.array,
    currentIngredient: PropTypes.string,
    setCurrentIngredient: PropTypes.func.isRequired,
    addIngredient: PropTypes.func.isRequired,
    removeIngredient: PropTypes.func.isRequired,
    findRecipes: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default IngredientInput;