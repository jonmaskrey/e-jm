import { Product } from "../../types/products";
import "./ProductItem.styles.css";

export default function ProductItem({ data }: { data: Product }) {
  return (
    <li className="productItem">
      <img src={data.thumbnail} alt={data.title} loading="lazy" />
      <div>
        <h2><a href={`product/${data.id}`}>{data.title}</a></h2>
        <p>{data.price}</p>
        <p>{data.description}</p>
      </div>
    </li>
  );
}
