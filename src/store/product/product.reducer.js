import { PRODUCT_TYPES } from "./product.types";

export const productReducer = (
  state = { products: [], sortBy: "falling" },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_TYPES.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TYPES.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_TYPES.PRODUCT_LIST_FAIL:
      return { loading: false, error: payload };

    case PRODUCT_TYPES.SORT_PRODUCTS:
      return { ...state, sortBy: payload };
    default:
      return state;
  }
};
