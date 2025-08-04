import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
            onClick={onClick}
        >
            <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-primary mb-1">{recipe.strMeal}</h3>
                <p className="text-gray-600 text-sm"><span className="font-medium">Category:</span> {recipe.strCategory}</p>
                <p className="text-gray-600 text-sm"><span className="font-medium">Cuisine:</span> {recipe.strArea}</p>
            </div>
        </div>
    );
};

export default RecipeCard;