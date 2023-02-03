import {
  compose,
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { productReducer } from "./product/product.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { favoritesReducer } from "./favorites/favorites.reducer";
import { userReducer } from "./user/user.reducer";

const reducer = combineReducers({
  allProducts: productReducer,
  cartItems: cartReducer,
  favorites: favoritesReducer,
  user: userReducer,
});

const favoritesFromStorage = localStorage.getItem("productFavorites")
  ? JSON.parse(localStorage.getItem("productFavorites"))
  : [];

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};

const initialState = {
  favorites: { favorites: favoritesFromStorage },
  user: { user: userFromStorage },
};

let middleWares;

if (process.env.NODE_ENV === "production") {
  middleWares = [thunk];
}

middleWares = [logger, thunk];

const composedEnhancers = compose(applyMiddleware(...middleWares));

const store = createStore(reducer, initialState, composedEnhancers);

export default store;
