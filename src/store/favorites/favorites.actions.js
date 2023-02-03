import { FAVORITES_ACTION_TYPES } from "./favorites.types";

export const addToFavorites = (item) => (dispatch, getState) => {
  dispatch({
    type: FAVORITES_ACTION_TYPES.ADD_TO_FAVORITES,
    payload: item,
  });
  localStorage.setItem(
    "productFavorites",
    JSON.stringify(getState().favorites.favorites)
  );
};

export const removeFromFavorites = (id) => (dispatch, getState) => {
  dispatch({
    type: FAVORITES_ACTION_TYPES.REMOVE_FROM_FAVORITES,
    payload: id,
  });
  localStorage.setItem(
    "productFavorites",
    JSON.stringify(getState().favorites.favorites)
  );
};
