import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export const NavBar = () => {
  const products = useSelector((state) => state.shoppingCart.products);

  return (
    <>
      <nav className="navbar">
        <Link to="/">Shop</Link>
        <span> | </span>
        <Link to="/shopping-cart">{`Shopping cart (${products.length})`}</Link>
      </nav>
    </>
  );
};
