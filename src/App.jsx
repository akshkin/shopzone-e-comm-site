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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, selectProducts } from "./features/productsSlice";

function App() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  function filteredProductsBySearch(searchTerm) {
    const filteredProducts = products.filter((product) => {
      const name =
        product.title.toLowerCase() || product.description.toLowerCase;
      return name.includes(searchTerm.toLowerCase());
    });
    setFilteredProducts(filteredProducts);
  }

  return (
    <div className="App">
      <Header filteredProductsBySearch={filteredProductsBySearch} />
      <main>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/:category" element={<Category />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route
            path="/search/:query"
            element={<SearchPage filteredProducts={filteredProducts} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
