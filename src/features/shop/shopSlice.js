import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { globalVars } from "../../app/globalVars";

const initialState = {
  companies: globalVars.COMPANIES_PLACEHOLDER,
  products: globalVars.PRODUCT_PLACEHOLDER,
  selectedCompany: "",
  status: {
    companies: "idle",
    products: "idle",
  },
  error: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    companySelected(state, action) {
      state.selectedCompany = action.payload;
    },
    companyUnselected(state, action) {
      state.selectedCompany = "";
    },
  },
  extraReducers(builder) {
    builder
      // companies
      .addCase(fetchCompanies.pending, (state, action) => {
        state.status.companies = "loading";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        if (state.status.companies === "succeeded") return;
        state.status.companies = "succeeded";
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status.companies = "failed";
        state.error = action.error.message;
      })
      // products
      .addCase(fetchProducts.pending, (state, action) => {
        state.status.products = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (state.status.products === "succeeded") return;
        state.status.products = "succeeded";
        // console.dir(action.payload);
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status.products = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchCompanies = createAsyncThunk(
  "shop/fetchCompanies",
  async () => {
    const response = await fetch(globalVars.COMPANIES_URL);
    const companiesArr = await response.json();
    return companiesArr;
  }
);

export const fetchProducts = createAsyncThunk(
  "shop/fetchProducts",
  async (companyId) => {
    const productURL = globalVars.getProductsURL(companyId);
    const response = await fetch(productURL);
    const products = await response.json();
    return products;
  }
);

export const { companySelected, companyUnselected } = shopSlice.actions;
export default shopSlice.reducer;