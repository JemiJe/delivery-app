import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Credentials } from "./Credentials";
import { CartProductsList } from "./CartProductsList";

import { companyUnselected, getOrdersStatus } from "../shop/shopSlice";

import { globalVars } from "../../app/globalVars";

export const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shoppingCart.products);
  const productsAmount = useSelector(
    (state) => state.shoppingCart.products.length
  );

  if (productsAmount === 0) {
    dispatch(companyUnselected());
  }

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

  const calcTotal = () => {
    return products.reduce((total, { priceSum }) => {
      return total + priceSum;
    }, 0);
  };

  const getOrderFeedback = () => {
    setTimeout(() => {
      dispatch(getOrdersStatus());
    }, 500);
  };

  const sendOrder = () => {
    const order = {
      ...credential,
      date: new Date(),
      cart: [...products],
      total: calcTotal(),
    };

    fetch(globalVars.POST_ORDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(order),
    }).then(() => {
      alert("your order has been sent. check status in navbar");
      getOrderFeedback();
    });
  };

  //handle Map component
  const [selected, setSelected] = useState(null);
  const [positioning, setPositioning] = useState({
    center: { lat: 50.450001, lng: 30.523333 },
    zoom: 10,
  });

  return (
    <main className="cart-main">
      <Credentials
        props={{ selected, positioning }}
        credential={credential}
        callbacks={{
          handleCredentials,
          setSelected,
          setPositioning,
        }}
      />
      <CartProductsList products={products} />
      <section className="cart-submit-section">
        <span className="cart-total">{`Total: $${calcTotal()}`}</span>
        <button onClick={sendOrder}>Submit</button>
      </section>
    </main>
  );
};
