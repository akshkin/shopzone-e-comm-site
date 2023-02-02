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
import { useState } from "react";
import { useSelector } from "react-redux";

function App() {
  const [filteredProducts, setFilteredProducts] = useState([]);
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
