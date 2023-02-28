import { Routes, Route } from "react-router-dom";
import {
  Home,
  Cart,
  Products,
  Favorites,
  ProductDetail,
  Category,
  Auth,
  SearchPage,
} from "./routes";
import { Header, Footer } from "./components";
import "./App.css";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { listProducts } from "./features/productsSlice";

function App() {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(listProducts());
  // }, []);

  
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/search/:query"
            element={<SearchPage />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
