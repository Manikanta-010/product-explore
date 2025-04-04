

import React, { useState } from "react";
import { debounce } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { searchProductsByName } from "../services/api";
import ProductCard from "./ProductCard";
import SkeletonLoader from "./SkeletonLoader";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => searchProductsByName(searchTerm),
    enabled: !!searchTerm,
  });

  const handleSearch = debounce((value) => setSearchTerm(value), 500);

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search products by name..."
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {Array(3)
            .fill()
            .map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
        </div>
      )}
      {error && (
        <p className="mt-4 text-red-500 dark:text-red-400">
          Failed to search products. Please try again.
        </p>
      )}
      {data?.data?.products && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {data.data.products.map((product) => (
            <ProductCard key={product.code} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;