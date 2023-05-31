import React from "react";
import { useDispatch } from "react-redux";

import { fetchProducts } from "./shopSlice";

export const CompanyBtn = ({ data }) => {
  const dispatch = useDispatch();

  const loadCompaniesProducts = () => {
    dispatch(fetchProducts(data.id));
  };

  return (
    <li className="shop-company-btn" onClick={loadCompaniesProducts}>
      {data.companyName}
    </li>
  );
};
