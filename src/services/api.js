import axios from "axios";

const API_BASE_URL = "/api";

export const fetchProductsByCategory = async (category, page = 1) => {
  try {
    // Use search endpoint for better pagination control
    const response = await axios.get(
      `${API_BASE_URL}/cgi/search.pl?tagtype=categories&tagid=${category}&page_size=50&page=${page}&json=true`
    );
    return response;
  } catch (error) {
    console.error(`Error fetching category ${category} on page ${page}:`, error.message);
    throw error;
  }
};

export const searchProductsByName = async (name) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/cgi/search.pl?search_terms=${name}&page_size=50&page=1&json=true`
    );
    return response;
  } catch (error) {
    console.error(`Error searching products by name ${name}:`, error.message);
    throw error;
  }
};

export const getProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v0/product/${barcode}.json`);
    return response;
  } catch (error) {
    console.error(`Error fetching product by barcode ${barcode}:`, error.message);
    throw error;
  }
};