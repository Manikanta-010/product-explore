import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory } from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import BarcodeSearch from "../components/BarcodeSearch";
import SkeletonLoader from "../components/SkeletonLoader";

const Home = () => {
  const [filters, setFilters] = useState({
    categories: [],
    sugarRange: [0, 100],
    sortBy: "",
  });
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filters.categories, page],
    queryFn: async () => {
      const categoriesToFetch = filters.categories.length > 0 ? filters.categories : ["snacks"];
      const categoryPromises = categoriesToFetch.map((category) =>
        fetchProductsByCategory(category, page)
      );
      const results = await Promise.all(categoryPromises);
      return { products: results.flatMap((res) => res.data.products || []) }; // Changed from data.data.products
    },
    keepPreviousData: true,
  });
  
  useEffect(() => {
    if (data?.products) { // Changed from data?.data?.products
      const validProducts = data.products.filter(
        (product) => product && typeof product === "object" && product.code
      );
      setAllProducts((prev) => [...prev, ...validProducts]);
    }
  }, [data]);
  
  const sortProducts = (products) => {
    if (!products || !Array.isArray(products)) return [];
    let sorted = [...products];
    switch (filters.sortBy) {
      case "name-asc":
        sorted.sort((a, b) => (a.product_name || "").localeCompare(b.product_name || ""));
        break;
      case "name-desc":
        sorted.sort((a, b) => (b.product_name || "").localeCompare(a.product_name || ""));
        break;
      case "nutrition-asc":
        sorted.sort((a, b) =>
          (a.nutrition_grades || "z").localeCompare(b.nutrition_grades || "z")
        );
        break;
      case "nutrition-desc":
        sorted.sort((a, b) =>
          (b.nutrition_grades || "z").localeCompare(a.nutrition_grades || "z")
        );
        break;
      case "calories-asc":
        sorted.sort(
          (a, b) => (a.nutriments?.energy_kcal || 0) - (b.nutriments?.energy_kcal || 0)
        );
        break;
      case "calories-desc":
        sorted.sort(
          (a, b) => (b.nutriments?.energy_kcal || 0) - (a.nutriments?.energy_kcal || 0)
        );
        break;
      default:
        break;
    }
    return sorted;
  };

  const filteredProducts = sortProducts(allProducts).filter(
    (p) => p && (p.nutriments ? (p.nutriments.sugars || 0) <= filters.sugarRange[1] : true)
  );

  if (error) {
    return (
      <div className="p-6 text-red-500 dark:text-red-400 text-center">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center shadow-md p-4 rounded-lg bg-white dark:bg-gray-800">
        Food Product Explorer
      </h1>
      <SearchBar />
      <BarcodeSearch />
      <Filters onFilter={setFilters} />
      {isLoading && allProducts.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill()
            .map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.code} product={product} />
              ))
            ) : (
              <p className="text-gray-700 dark:text-gray-300 text-center col-span-full">
                No products found matching your filters.
              </p>
            )}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;