import { observer } from "mobx-react-lite";
import { action } from "mobx";
import { productStore } from "../../stores/ProductStore";
import Loader from "../Loader/Loader.component";
import "./ProductSearch.styles.css";

const ProductSearch = observer(() => {
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
            onChange={action((e) => {
              productStore.setQuery(e.target.value);
            })}
            placeholder="Search products..."
          />
          {productStore.isLoading && <Loader />}
        </div>
        <div>
          <button
            onClick={action(() => {
              productStore.setQuery("");
            })}
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
