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
import { errorReducer } from "./error/error.reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducer = combineReducers({
  allProducts: productReducer,
  cartItems: cartReducer,
  favorites: favoritesReducer,
  user: userReducer,
  error: errorReducer,
});


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites", "user", "cartItems"],
};

const persistedReducer = persistReducer(persistConfig, reducer);


let middleWares;

if (process.env.NODE_ENV === "production") {
  middleWares = [thunk];
}

middleWares = [logger, thunk];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
