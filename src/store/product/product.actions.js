import { PRODUCT_TYPES } from "./product.types";
import { fetchProducts } from "../../api";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TYPES.PRODUCT_LIST_REQUEST });
    const { data } = await fetchProducts();

    dispatch({
      type: PRODUCT_TYPES.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TYPES.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.response,
    });
  }
};

export const setSortBy = (value) => (dispatch) => {
  dispatch({
    type: PRODUCT_TYPES.SORT_PRODUCTS,
    payload: value,
  });
};
