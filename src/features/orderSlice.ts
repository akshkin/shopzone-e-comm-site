import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  OrderData,
  createOrder,
  createOrderUnlogged,
  getCLientId,
  getOrderDetails,
  getOrderDetailsUnlogged,
  updateOrder,
} from "../api";
import { CartItemType } from "./cartSlice";

interface InitialState extends Order {
  clientId: string;
}

const initialState: InitialState = {
  orderId: "",
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
  paymentMethod: "PayPal",
  clientId: "",
};

interface Order {
  orderId: string;
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
  paymentMethod: string;
}

export const createItemsOrder = createAsyncThunk(
  "/order/create",
  async (data: OrderData) => {
    try {
      const response = await createOrder(data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);
export const createItemsOrderUnlogged = createAsyncThunk(
  "/order/create-unlogged",
  async (data: OrderData) => {
    try {
      const response = await createOrderUnlogged(data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const getOrder = createAsyncThunk("/getOrder", async (id: string) => {
  try {
    const response = await getOrderDetails(id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const getOrderUnlogged = createAsyncThunk(
  "/getOrder-unlogged",
  async (id: string) => {
    try {
      const response = await getOrderDetailsUnlogged(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getClientId = createAsyncThunk("getClientId", async () => {
  try {
    const { data } = await getCLientId();
    return data.clientId;
  } catch (error) {
    console.log(error);
  }
});

export const makePayment = createAsyncThunk(
  "pay",
  async ({ id, details }: any) => {
    try {
      const { data } = await updateOrder({ id, details });
      return data;
    } catch (error) {
      console.log(error);
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
        state.orderId = action.payload._id;
      })
      .addCase(createItemsOrderUnlogged.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItemsOrderUnlogged.fulfilled, (state, action) => {
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
        state.orderId = action.payload._id;
      })

      .addCase(getClientId.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action);
        if (!action.payload) {
          state.error = "Something went wrong. Please try again later.";
        }
        state.clientId = action.payload;
      })
      .addCase(getOrder.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.orderItems;
        state.shippingAddress = action.payload.shippingAddress;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(getOrderUnlogged.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderUnlogged.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.orderItems;
        state.shippingAddress = action.payload.shippingAddress;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(makePayment.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderId = "";
      });
  },
});

export const selectShippingAddress = (state: RootState) =>
  state.order.shippingAddress;
export const selectTotalPrice = (state: RootState) => state.order.totalPrice;
export const selectOrderItems = (state: RootState) => state.order.cartItems;
export const orderLoading = (state: RootState) => state.order.loading;
export const selectOrderId = (state: RootState) => state.order.orderId;

export const selectClientId = (state: RootState) => state.order.clientId;
export const selectError = (state: RootState) => state.order.error;

export default cartSlice.reducer;
