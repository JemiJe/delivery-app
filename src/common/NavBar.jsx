import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

function Status({ isStatus }) {
  if (isStatus)
    return (
      <span className="navbar-orders">
        {` | total orders: ${isStatus.totalOrders} |  ` +
          `total products: ${isStatus.totalProductsOrdered} | ` +
          `last one from: ${isStatus.lastFrom} | ` +
          `overall sum: ${isStatus.totalSum}`}
      </span>
    );
}

export const NavBar = () => {
  const products = useSelector((state) => state.shoppingCart.products);
  const ordersStatus = useSelector((state) => state.shop.shopOrdersStatus);

  return (
    <>
      <nav className="navbar">
        <Link to="/">Shop</Link>
        <span> | </span>
        <Link to="/shopping-cart">{`Shopping cart (${products.length})`}</Link>
        <Status isStatus={ordersStatus} />
      </nav>
    </>
  );
};
