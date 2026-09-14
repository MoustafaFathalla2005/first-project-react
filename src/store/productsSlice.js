import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import products from "../data/products.js";

export const getProducts = createAsyncThunk("products/getAll", async () => {
  return products;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productsSlice.reducer;
