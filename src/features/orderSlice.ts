import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { OrderData, createOrder } from "../api";
import { CartItemType } from "./cartSlice";

const initialState: Order = {
  loading: false,
  cartItems: [],
  error: null,
  totalPrice: 0,
  shippingAddress: {
    address: "",
    city: "",
    country: "",
    postalCode: "",
  },
  paymanetMethod: "PayPal",
};

type Order = {
  loading: boolean;
  cartItems: CartItemType[];
  error: null | string;
  totalPrice: number;
  shippingAddress: {
    address: string;
    postalCode: string;
    city: string;
    country: string;
  };
  paymanetMethod: string;
};

export const createItemsOrder = createAsyncThunk(
  "/order/create",
  async (data: OrderData) => {
    try {
      const response = await createOrder(data);
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createItemsOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItemsOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.cartItems = action.payload.orderItems;
        state.shippingAddress = action.payload.shippingAddress;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      });
  },
});

export const selectShippingAddress = (state: RootState) =>
  state.order.shippingAddress;
// export const selectTotalPrice = (state: RootState) =>
//   state.cartItems.totalPrice;
export const orderLoading = (state: RootState) => state.order.loading;

export default cartSlice.reducer;
