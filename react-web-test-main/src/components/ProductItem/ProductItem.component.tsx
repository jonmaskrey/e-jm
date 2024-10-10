import { Product } from "../../types/products";
import "./ProductItem.styles.css";

export default function ProductItem({ data }: { data: Product }) {
  return (
    <li className="productItem">
      {data.thumbnail && (
        <img src={data.thumbnail} alt={data.title} loading="lazy" />
      )}
      <div>
        <h2>
          <a href={`/product/${data.id}`}>{data.title}</a>
        </h2>
        {data.price && <p>£{data.price}</p>}
        {data.description && <p>{data.description}</p>}
      </div>
    </li>
  );
}
