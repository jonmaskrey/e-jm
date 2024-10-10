import { observer } from "mobx-react-lite";
import { productStore } from "../../stores/ProductStore";
import useDebounce from "../../hooks/useDebounce";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader.component";
import "./ProductSearch.styles.css";

const ProductSearch = observer(() => {
  const [searchTerm, setSearchTerm] = useState(productStore.query);
  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  useEffect(() => {
    if (debouncedSearchTerm !== productStore.query) {
      productStore.setQuery(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    productStore.setQuery("");
  };

  return (
    <>
      <fieldset className="productSearch">
        <legend className="sr-only">Product search</legend>
        <div>
          <label className="sr-only" htmlFor="search">
            Search products:
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
          />
          {productStore.isLoading && <Loader />}
        </div>
        <div>
          <button onClick={handleClearSearch} disabled={searchTerm.length === 0}>Clear search</button>
        </div>
      </fieldset>
    </>
  );
});

export default ProductSearch;
