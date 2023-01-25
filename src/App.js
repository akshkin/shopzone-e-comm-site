import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.jsx";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Cart from "./routes/cart/cart";
import Products from "./routes/products/products";
import Favorites from "./routes/favorites/favorites";
import ProductDetail from "./routes/product-details/product-details";
import Category from "./routes/categories/categories";
import SignIn from "./components/sign-in/sign-in.component.jsx";
import SignUp from "./components/sign-up/sign-up.componenet.jsx";
import "./App.css";
import SearchPage from "./routes/searchPage/searchPage.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/:category" element={<Category />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search/:query" element={<SearchPage />} />
      </Routes>
      {/* <Footer />       */}
    </div>
  );
}

export default App;
