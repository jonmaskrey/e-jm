import { QueryClient } from '@tanstack/react-query';
import { addRetries } from '../functions/addRetries';

interface Product {
  id: number;
  title: string;
}

interface SearchProductsResult {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

const searchProducts = async (query: string): Promise<SearchProductsResult> => {
  const queryFn = async () => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=0`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  };

  const queryClient = new QueryClient();
  const queryResult = await queryClient.fetchQuery({
    queryKey: ['products', query],
    retry: false,
    queryFn: addRetries(queryFn),
  });

  return {
    products: queryResult.products || [],
    isLoading: queryResult.isLoading,
    error: queryResult.error as Error | null,
  };
};

export { searchProducts };