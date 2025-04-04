
import React from "react";

const SkeletonLoader = () => (
  <div className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 animate-pulse delay-75">
    <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
    <div className="mt-2">
      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-1"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-1"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
    </div>
  </div>
);

export default SkeletonLoader;