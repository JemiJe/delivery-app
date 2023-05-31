import React from "react";
import { useDispatch } from "react-redux";

import { productAdded } from "../shoppingCart/cartSlice";

export const Product = ({ data }) => {
  const dispatch = useDispatch();

  const addProductToCart = () => {
    dispatch(productAdded(data));
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
        <div className="product-add">
          <button onClick={addProductToCart}>add to cart</button>
          <span>{`$${data.productPrice}`}</span>
        </div>
      </article>
    </>
  );
};
