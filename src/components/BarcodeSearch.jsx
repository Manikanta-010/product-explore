

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductByBarcode } from "../services/api";
import ProductCard from "./ProductCard";

const BarcodeSearch = () => {
  const [barcode, setBarcode] = useState("");
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["barcode", barcode],
    queryFn: () => getProductByBarcode(barcode),
    enabled: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (barcode.trim()) refetch();
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter barcode (e.g., 737628064502)"
          className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
          disabled={isFetching}
        >
          {isFetching ? "Searching..." : "Search"}
        </button>
      </form>
      {error && (
        <p className="mt-4 text-red-500 dark:text-red-400">Invalid or unknown barcode</p>
      )}
      {data?.data?.product && (
        <div className="mt-6">
          <ProductCard product={data.data.product} />
        </div>
      )}
    </div>
  );
};

export default BarcodeSearch;