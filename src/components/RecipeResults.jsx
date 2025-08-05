import React from "react";
import RecipeCard from "./RecipeCard";
import { Sparkles } from "lucide-react";
import PropTypes from "prop-types";

const RecipeResults = ({
    recipes = [],
    ingredients = [],
    handleRecipeClick = () => { } // Correct default function
}) => {
    if (recipes.length === 0) {
        if (ingredients.length === 0) {
            return (
                <div className="text-center py-12">
                    <div className="bg-gradient-to-r from-orange-400 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Cook Something Amazing?</h3>
                    <p className="text-gray-600">Add your ingredients above to get personalized recipe suggestions!</p>
                </div>
            );
        }
        return (
            <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No recipes found</h3>
                <p className="text-gray-600">Try different ingredients</p>
            </div>
        );
    }

    return (
        <section>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Suggestions</h2>
                <p className="text-gray-600">Based on your available ingredients</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe, index) => (
                    <RecipeCard
                        key={index}
                        recipe={recipe}
                        onClick={() => handleRecipeClick(recipe)} // Properly pass recipe
                    />
                ))}
            </div>
        </section>
    );
};

RecipeResults.propTypes = {
    recipes: PropTypes.array,
    ingredients: PropTypes.array,
    handleRecipeClick: PropTypes.func
};

RecipeResults.defaultProps = {
    recipes: [],
    ingredients: [],
    handleRecipeClick: () => { }
};

export default RecipeResults;