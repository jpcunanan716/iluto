import React from 'react';

const SearchAndFilter = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedArea,
    setSelectedArea,
    categories,
    areas,
    onSearch
}) => {
    return (
        <div className="bg-primary p-6 rounded-lg mb-8">
            <h2 className="text-xl text-black font-bold mb-4 text-center">Find Your Perfect Recipe</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search recipes..."
                    className="flex-1 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-dark text-gray-800"
                    onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                />
                <button
                    onClick={onSearch}
                    className="px-6 py-2 bg-white text-primary font-semibold rounded hover:bg-gray-100 transition"
                >
                    Search
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="category" className="block mb-2 font-medium">Category</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.strCategory} value={category.strCategory}>
                                {category.strCategory}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="area" className="block mb-2 font-medium">Cuisine</label>
                    <select
                        id="area"
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                        className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                    >
                        <option value="">All Cuisines</option>
                        {areas.map((area) => (
                            <option key={area.strArea} value={area.strArea}>
                                {area.strArea}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchAndFilter;