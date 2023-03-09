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
  NotFound
} from "./routes";
import "./App.css";
import Layout from "./components/layout/layout.component";

function App() {
 
  return (
    <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<ProductDetail />} />
            <Route path=":category" element={<Category />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="cart" element={<Cart />} />
            <Route path="auth" element={<Auth />} />
            <Route path="search/:query" element={<SearchPage />} />
          </Route>
            <Route element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
