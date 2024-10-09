import { observer } from "mobx-react-lite";
import { productStore } from "../stores/ProductStore";
import useThrottle from "../hooks/useThrottle";
import { useEffect, useState, useCallback } from "react";

const ProductList = observer(() => {
  const [searchTerm, setSearchTerm] = useState(productStore.query);
  const throttledSearchTerm = useThrottle(searchTerm, 800);

  useEffect(() => {
    if (throttledSearchTerm !== productStore.query) {
      productStore.setQuery(throttledSearchTerm);
    }
  }, [throttledSearchTerm]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    productStore.setQuery("");
  }, []);

  return (
    <>
      <fieldset>
        <legend>Product search</legend>
        <label htmlFor="search">Search products:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products..."
        />
        {productStore.isLoading && <div>Loading...</div>}
        <div>
          <button onClick={handleClearSearch}>Clear search</button>
        </div>
      </fieldset>

      {productStore.error ? (
        <div>Error: {productStore.error.message}</div>
      ) : (
        <ul>
          {productStore.products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </>
  );
});

export default ProductList;
