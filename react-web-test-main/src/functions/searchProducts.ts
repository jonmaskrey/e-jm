import { queryClient } from "../queryClient";
import { addRetries } from "../functions/addRetries";
import { SearchProductsResult } from "../types/products";


const searchProducts = async (query: string): Promise<SearchProductsResult> => {
  const queryFn = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}&limit=0`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  };

  const queryResult = await queryClient.fetchQuery({
    queryKey: ["products", query],
    queryFn: addRetries(queryFn),
    staleTime: 300000,
  });

  return {
    products: queryResult.products || [],
    isLoading: false,
    error: null,
  };
};

export { searchProducts };