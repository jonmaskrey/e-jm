import { QueryClientProvider } from "@tanstack/react-query";
import ProductList from "./components/ProductList/ProductList.component";
import "./App.css";
import { queryClient } from "./queryClient";

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  );
}

export default App;
