import { useState } from "react";
import { useSearchProducts } from "../hooks/useSearchProducts";

function ProductList() {
  const [query, setQuery] = useState('');
  const { products, isLoading, error } = useSearchProducts(query);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search products..."
      />
      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ProductList;