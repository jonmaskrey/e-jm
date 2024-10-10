import { observer } from "mobx-react-lite";
import { productStore } from "../../stores/ProductStore";
import ProductSearch from "../ProductSearch/ProductSearch.component";

import ProductItem from "../ProductItem/ProductItem.component";
import "./ProductList.styles.css";

const ProductList = observer(() => {
  return (
    <>
      <ProductSearch />
      {productStore.error ? (
        <div>Error: {productStore.error.message}</div>
      ) : productStore.isLoading ? (
        <div>Loading...</div>
      ) : productStore.products.length === 0 ? (
        <div>No products found</div>
      ) : (
        <ul className="productList">
          {productStore.products.map((product) => (
            <ProductItem key={product.id} data={product} />
          ))}
        </ul>
      )}
    </>
  );
});

export default ProductList;
