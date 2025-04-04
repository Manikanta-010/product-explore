

import React, { useState } from "react";

const Filters = ({ onFilter }) => {
  const [categories, setCategories] = useState([]);
  const [sugarRange, setSugarRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("");

  const handleApply = () => {
    onFilter({ categories, sugarRange, sortBy });
  };

  return (
    <div className="p-6 border rounded-lg mb-8 bg-white dark:bg-gray-800 shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Filters</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Categories
        </label>
        <select
          multiple
          onChange={(e) =>
            setCategories(Array.from(e.target.selectedOptions, (option) => option.value))
          }
          className="mt-1 w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="beverages">Beverages</option>
          <option value="dairy">Dairy</option>
          <option value="snacks">Snacks</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Sugar Range: 0 - {sugarRange[1]}g
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={sugarRange[1]}
          onChange={(e) => setSugarRange([0, e.target.value])}
          className="w-full mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Sort By
        </label>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="mt-1 w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">None</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="nutrition-asc">Nutrition Grade (A-E)</option>
          <option value="nutrition-desc">Nutrition Grade (E-A)</option>
          <option value="calories-asc">Calories (Low to High)</option>
          <option value="calories-desc">Calories (High to Low)</option>
        </select>
      </div>
      <button
        onClick={handleApply}
        className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;