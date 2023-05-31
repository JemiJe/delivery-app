import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Credentials } from "./Credentials";
import { CartProductsList } from "./CartProductsList";

import { globalVars } from "../../app/globalVars";

export const ShoppingCartPage = () => {
  const products = useSelector((state) => state.shoppingCart.products);

  // handling and amount of each products in CartProductsList -> CartProduct is updated in cartSlice using productUpdated
  // it updates products in cartSlice
  // handling credentials
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  function handleCredentials(e) {
    setCredential({
      ...credential,
      [e.target.name]: e.target.value,
    });
  }

  const updateProduct = ({ updatedProduct }) => {
    orderCart = orderCart.map((product) => {
      if (product.productId === updatedProduct.productId) {
        product = { ...product, ...updatedProduct };
      }
    });
    console.dir(orderCart);
  };

  const calcTotal = () => {
    return products.reduce((total, { priceSum }) => {
      return total + priceSum;
    }, 0);
  };

  const sendOrder = () => {
    const order = {
      ...credential,
      cart: [...products],
      total: calcTotal(),
    };
    console.dir(order);

    fetch(globalVars.POST_ORDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(order),
    });
  };

  return (
    <main className="cart-main">
      <Credentials credential={credential} handleCallback={handleCredentials} />
      <CartProductsList products={products} callbacks={{ updateProduct }} />
      <section className="cart-submit-section">
        <span className="cart-total">{`Total: $${calcTotal()}`}</span>
        <button onClick={sendOrder}>Submit</button>
      </section>
    </main>
  );
};
