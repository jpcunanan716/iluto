import React from 'react';

const RecipeModal = ({ recipe, onClose }) => {
    // Generate ingredients list
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-start justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-primary mb-4">{recipe.strMeal}</h2>
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {ingredients.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="mb-2"><span className="font-semibold">Category:</span> {recipe.strCategory}</p>
                        <p className="mb-4"><span className="font-semibold">Cuisine:</span> {recipe.strArea}</p>

                        <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
                        <p className="whitespace-pre-line">{recipe.strInstructions}</p>

                        {recipe.strYoutube && (
                            <a
                                href={recipe.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
                            >
                                Watch Video Tutorial
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;