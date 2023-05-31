import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { productAdded } from "../shoppingCart/cartSlice";
import { companySelected } from "./shopSlice";

export const Product = ({ data }) => {
  const productCompany = useSelector((state) => {
    const company = state.shop.companies.find(
      (company) => company.id == data.companyId
    );
    return company ? company.companyName : "loading...";
  });
  const dispatch = useDispatch();

  const addProductToCart = () => {
    dispatch(productAdded(data));
    dispatch(companySelected(productCompany));
  };

  // uncomment if there is valid image url
  const imageStyle = {
    // backgroundImage: `url('${data.productImage}')`,
  };

  return (
    <>
      <article className="product">
        <div className="product-image" style={imageStyle}></div>
        <h2>{data.productName}</h2>
        <span>{productCompany}</span>
        <div className="product-add">
          <button onClick={addProductToCart}>add to cart</button>
          <span>{`$${data.productPrice}`}</span>
        </div>
      </article>
    </>
  );
};
