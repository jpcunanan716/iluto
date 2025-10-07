import { X, Clock, Users, ChefHat, Star, ExternalLink } from 'lucide-react';

const RecipeModal = ({ recipe, isOpen, onClose }) => {
    if (!isOpen || !recipe) return null;

    return (
        <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-300 shadow-2xl">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-800">{recipe.name}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                    {/* Recipe Info */}
                    <div className="mb-6">
                        <p className="text-gray-600 text-lg mb-4">{recipe.description}</p>

                        <div className="flex items-center gap-6 text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-orange-500" />
                                <span className="font-medium">Cook Time:</span>
                                <span>{recipe.cookTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-500" />
                                <span className="font-medium">Serves:</span>
                                <span>{recipe.servings}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ChefHat className="w-5 h-5 text-green-500" />
                                <span className="font-medium">Difficulty:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                    {recipe.difficulty}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Ingredients */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="bg-orange-100 p-2 rounded-lg">🥗</span>
                                Ingredients
                            </h3>
                            <div className="space-y-2">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                        <span className="text-gray-700 capitalize">{ingredient}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instructions */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="bg-blue-100 p-2 rounded-lg">👨‍🍳</span>
                                Instructions
                            </h3>
                            <div className="space-y-4">
                                {recipe.instructions.map((step, index) => (
                                    <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            {index + 1}
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4 justify-center">
                        {/* <button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-orange-500 hover:to-pink-600 transition-all duration-200 flex items-center gap-2 font-medium">
                            <Star className="w-4 h-4" />
                            Save Recipe
                        </button> */}
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-200 flex items-center gap-2 font-medium">
                            <ExternalLink className="w-4 h-4" />
                            Share Recipe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;