import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    productAdded(state, action) {
      const { productId } = action.payload;

      const isExistingProduct = state.products.find(
        (product) => product.productId === productId
      );

      if (!isExistingProduct) {
        state.products.push({
          ...action.payload,
          amount: 1,
          priceSum: Number(action.payload.productPrice),
        });
      }
    },
    productDeleted(state, action) {
      const { productId } = action.payload;

      state.products = state.products.filter(
        (product) => product.productId !== productId
      );
    },
    productUpdated(state, action) {
      const updatedProduct = action.payload;

      let currentProduct = state.products.find(
        (product) => product.productId === updatedProduct.productId
      );

      if (currentProduct) {
        currentProduct.amount = updatedProduct.amount;
        currentProduct.priceSum = updatedProduct.priceSum;
      }
    },
    cartCleared(state, action) {
      state.products = [];
    },
  },
});

export const { productAdded, productDeleted, productUpdated, cartCleared } =
  cartSlice.actions;
export default cartSlice.reducer;
