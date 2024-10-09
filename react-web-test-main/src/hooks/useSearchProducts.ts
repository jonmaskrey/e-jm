import { useQuery } from "@tanstack/react-query";
import { addRetries } from "../functions/addRetries";

interface Product {
  id: number;
  title: string;
}

interface SearchProductsResult {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

export const useSearchProducts = (query: string): SearchProductsResult => {
  const queryFn = async () => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=0`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['products', query],
    retry: false,
    queryFn: addRetries(queryFn),
  });

  return {
    products: data?.products || [],
    isLoading,
    error: error as Error | null,
  };
};