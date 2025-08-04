import React from 'react';

const FeaturedRecipe = ({ recipe }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-center mb-6">Today's Featured Recipe</h2>
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                />
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-2">{recipe.strMeal}</h3>
                    <p className="mb-2"><span className="font-semibold">Category:</span> {recipe.strCategory}</p>
                    <p className="mb-4"><span className="font-semibold">Cuisine:</span> {recipe.strArea}</p>
                    <p className="text-gray-700 mb-4 line-clamp-3">{recipe.strInstructions}</p>
                    <a
                        href={recipe.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
                    >
                        Watch Video
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FeaturedRecipe;