import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ProductList from "./components/ProductList/ProductList.component";
import "./App.css";

function App() {

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  );
}

export default App;
