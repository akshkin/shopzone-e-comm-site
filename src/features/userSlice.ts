import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  OrderData,
  getAdress,
  saveAddress,
  signIn,
  signOut,
  signUp,
} from "../api";
import { RootState } from "../store";

const initialState: User = {
  loading: false,
  token: localStorage.getItem("user") || "",
  error: "" || undefined,
  shippingAddress: {
    address: "",
    postalCode: "",
    country: "",
    city: "",
  },
};

type User = {
  loading: boolean;
  token: string;
  error: string | undefined;
  shippingAddress?: {
    address: string;
    postalCode: string;
    country: string;
    city: string;
  };
};

type FormFields = {
  name?: string;
  email: string;
  password: string;
};

export const signInUser = createAsyncThunk(
  "user/signIn",
  async (formFields: FormFields) => {
    try {
      const { data } = await signIn(formFields);
      console.log(data.token);
      return data.token;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const signUpUser = createAsyncThunk(
  "user/signUp",
  async (formFields: FormFields) => {
    try {
      const { data } = await signUp(formFields);
      return data.token;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const saveInfo = createAsyncThunk(
  "user/save",
  async (shippingAddress: Pick<OrderData, "shippingAddress">) => {
    try {
      const { data } = await saveAddress(shippingAddress);
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export const getUserAddress = createAsyncThunk("user/get/address", async () => {
  try {
    const { data } = await getAdress();
    return data;
  } catch (error: any) {
    return error.response.data;
  }
});

export const signOutUser = createAsyncThunk("user/signOut", async () => {
  try {
    await signOut();
    console.log(localStorage.getItem("perisit"));
  } catch (error: any) {
    Promise.reject(error);
    return error.response.data;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        if (action.payload?.message) {
          state.error = action.payload.message;
          return;
        }
        state.error = "";
        state.token = action.payload;
        localStorage.setItem("user", JSON.stringify(state.token));
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.message) {
          state.error = action.payload.message;
          return;
        }
        state.error = "";
        state.token = action.payload;
        localStorage.setItem("user", JSON.stringify(state.token));
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.token = "";
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Could not sign out";
      })
      .addCase(saveInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.shippingAddress = action.payload;
      })
      .addCase(saveInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = "Could not save address";
      })
      .addCase(getUserAddress.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.shippingAddress = action.payload.shippingAddress;
      });
  },
});

export const getUser = (state: RootState) => state.user.token;
export const userLoading = (state: RootState) => state.user.loading;
export const selectUserAddress = (state: RootState) =>
  state.user.shippingAddress;
export const errorMessage = (state: RootState) => state.user.error;

export default userSlice.reducer;
