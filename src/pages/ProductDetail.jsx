
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductByBarcode } from "../services/api";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductByBarcode(id),
  });

  if (isLoading) {
    return <div className="p-6 text-gray-500 dark:text-gray-400">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 dark:text-red-400">
        Failed to load product details. Please try again later.
      </div>
    );
  }

  const product = data?.data?.product;
  if (!product) {
    return (
      <div className="p-6 text-gray-700 dark:text-gray-300">
        No product found for barcode: {id}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={product.image_url}
        alt={product.product_name || "Product Image"}
        className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
      />
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {product.product_name || "Unknown Product"}
      </h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">Ingredients:</strong>{" "}
          {product.ingredients_text || "N/A"}
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">Nutrition:</strong>{" "}
          {product.nutriments ? (
            <ul className="list-disc pl-6 space-y-2 border-l-2 border-gray-200 dark:border-gray-700">
              <li>Energy: {product.nutriments.energy_kcal || "N/A"} kcal</li>
              <li>Fat: {product.nutriments.fat || "N/A"}g</li>
              <li>Carbs: {product.nutriments.carbohydrates || "N/A"}g</li>
              <li>Proteins: {product.nutriments.proteins || "N/A"}g</li>
            </ul>
          ) : (
            "N/A"
          )}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">Labels:</strong>{" "}
          {product.labels || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;