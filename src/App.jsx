import { Routes, Route } from "react-router-dom";
import {
  Home,
  Cart,
  Products,
  Favorites,
  ProductDetail,
  Category,
  SearchPage,
} from "./routes";
import { Header, Footer, SignIn, SignUp } from "./components";
import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./store/product/product.actions";

function App() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  const allProducts = useSelector((state) => state.allProducts);

  function filteredProductsBySearch(searchTerm) {
    const filteredProducts = allProducts.products.filter((product) => {
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
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
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
