import { makeAutoObservable, runInAction, reaction } from "mobx";
import { searchProducts } from "../functions/searchProducts";
import { Product } from "../types/products";

class ProductStore {
  query = "";
  products: Product[] = [];
  isLoading = false;
  error: Error | null = null;

  constructor() {
    makeAutoObservable(this);
    // Initial fetch
    this.fetchProducts();

    // Debounce the search query
    reaction(
      () => this.query,
      () => {
        this.fetchProducts();
      },
      { delay: 800 }
    );
  }

  setQuery(query: string) {
    this.query = query;
  }

  async fetchProducts() {
    this.isLoading = true;
    try {
      const { products, isLoading, error } = await searchProducts(this.query);
      runInAction(() => {
        this.products = products;
        this.isLoading = isLoading;
        this.error = error;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
        this.isLoading = false;
      });
    }
  }
}

export const productStore = new ProductStore();
