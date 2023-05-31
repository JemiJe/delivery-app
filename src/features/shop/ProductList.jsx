import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "./shopSlice";

import { Product } from "./Product";

export const ProductList = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.shop.products);
  const productsStatus = useSelector((state) => state.shop.status.products);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts(products[0].id));
    }
  }, [productsStatus, dispatch]);

  const renderedProducts = products.map((product) => (
    <Product key={product.id} data={product} />
  ));

  return <>{renderedProducts}</>;
};
