import { observer } from "mobx-react-lite";
import { productStore } from "../../stores/ProductStore";
import Loader from "../Loader/Loader.component";
import "./ProductSearch.styles.css";

const ProductSearch = observer(() => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    productStore.setQuery(event.target.value);
  };

  const handleClearSearch = () => {
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
            value={productStore.query}
            onChange={handleSearch}
            placeholder="Search products..."
          />
          {productStore.isLoading && <Loader />}
        </div>
        <div>
          <button
            onClick={handleClearSearch}
            disabled={productStore.query.length === 0}
          >
            Clear search
          </button>
        </div>
      </fieldset>
    </>
  );
});

export default ProductSearch;
