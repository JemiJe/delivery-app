import { useState } from "react";
import { useDispatch } from "react-redux";

import { productDeleted, productUpdated } from "../shoppingCart/cartSlice";

export const CartProduct = ({ data }) => {
  const dispatch = useDispatch();

  const productCompany = data.companyName ? data.companyName : "loading...";

  const [product, setProduct] = useState({
    ...data,
    amount: data.amount,
    priceSum: data.priceSum, //|| Number(data.productPrice)
  });

  function handleProduct(e) {
    setProduct({
      ...data,
      amount: Number(e.target.value),
      priceSum: Number(data.productPrice) * e.target.value,
    });
  }

  const deleteProduct = () => {
    dispatch(productDeleted(data));
  };
  const updateProduct = () => {
    dispatch(productUpdated(product));
  };

  return (
    <article className="cart-product">
      <div className="cart-product-image"></div>
      <h2>{data.productName}</h2>
      <span>{productCompany}</span>
      <div className="cart-product-details">
        <div className="cart-product-amount">
          <span>
            {"Price: "}
            {data.productPrice}
            {` (${product.priceSum})`}
          </span>
          <input
            value={product.amount}
            onChange={handleProduct}
            onBlur={updateProduct}
            type="number"
            name="amount"
            min={1}
          />
        </div>
      </div>
      <button className="cart-product-close" onClick={deleteProduct}>
        {"\u2715"}
      </button>
    </article>
  );
};
