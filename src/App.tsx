import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import {
  Home,
  Cart,
  Products,
  Favorites,
  ProductDetail,
  Category,
  Auth,
  SearchPage,
  NotFound,
} from "./routes";
import { loader as productsLoader } from "./routes/products/products";
import { loader as productDetailLoader } from "./routes/product-details/product-details";
import { loader as filtersLoader } from "./routes/searchPage/searchPage";
import { loader as categoryLoader } from "./routes/categories/categories";
import "./App.css";
import Layout from "./components/layout/layout.component";
import ErrorComponent from "./components/error.component";
import ProtectedRoute from "./routes/protectedRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="products"
          element={<Products />}
          errorElement={<ErrorComponent />}
          loader={productsLoader}
        />
        <Route
          path="products/:productId"
          element={<ProductDetail />}
          loader={productDetailLoader}
          errorElement={<ErrorComponent />}
        />
        <Route
          path=":category"
          element={<Category />}
          loader={categoryLoader}
          errorElement={<ErrorComponent />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="favorites"
            element={<Favorites />}
            errorElement={<ErrorComponent />}
          />
        </Route>
        <Route path="cart" element={<Cart />} />
        <Route path="auth" element={<Auth />} />
        <Route
          path="search/:query"
          element={<SearchPage />}
          loader={filtersLoader}
          errorElement={<ErrorComponent />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
