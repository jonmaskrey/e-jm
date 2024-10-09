import { observer } from "mobx-react-lite";
import { productStore } from "../stores/ProductStore";

const ProductList = observer(() => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    productStore.setQuery(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={productStore.query}
        onChange={handleSearch}
        placeholder="Search products..."
      />
      {productStore.error ? (
        <div>Error: {productStore.error.message}</div>
      ) : productStore.isLoading ? (
        <div>Loading...</div>
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