import { configureStore } from "@reduxjs/toolkit";

import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/shoppingCart/cartSlice";

export default configureStore({
  reducer: {
    shop: shopReducer,
    shoppingCart: cartReducer,
  },
});
