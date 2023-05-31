import React from "react";
import { useDispatch } from "react-redux";

import { fetchProducts } from "./shopSlice";

export const CompanyBtn = ({ data, isSelected }) => {
  const dispatch = useDispatch();

  const loadCompaniesProducts = () => {
    dispatch(fetchProducts(data.id));
  };

  const extraClass =
    isSelected === undefined
      ? ""
      : isSelected
      ? " btn-active"
      : " btn-disabled";

  return (
    <li
      className={"shop-company-btn" + extraClass}
      onClick={loadCompaniesProducts}
    >
      {data.companyName}
    </li>
  );
};
