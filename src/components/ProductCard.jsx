

import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-200">
    <img
      src={product.image_url}
      alt={product.product_name}
      className="w-full h-48 object-cover rounded-t-lg"
      loading="lazy"
    />
    <div className="mt-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {product.product_name || "Unknown Product"}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Category: {product.categories || "N/A"}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
        Ingredients: {product.ingredients_text || "N/A"}
      </p>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
        Nutrition Grade: {product.nutrition_grades?.toUpperCase() || "N/A"}
      </p>
      <Link
        to={`/product/${product.code}`}
        className="mt-2 inline-block text-blue-600 dark:text-blue-400 hover:underline"
      >
        View Details
      </Link>
    </div>
  </div>
);

export default ProductCard;