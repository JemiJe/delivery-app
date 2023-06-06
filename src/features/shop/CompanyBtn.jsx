import React from "react";
import { useDispatch } from "react-redux";

import { fetchProducts, setAsViewingCompany } from "./shopSlice";

export const CompanyBtn = ({ data, isSelected, currentViewCompany }) => {
  const dispatch = useDispatch();

  const loadCompaniesProducts = () => {
    dispatch(fetchProducts(data.id));
    dispatch(setAsViewingCompany(data.companyName));
  };

  let extraClassSet = new Set();
  isSelected === undefined
    ? extraClassSet.add("")
    : isSelected
    ? extraClassSet.add(" btn-active")
    : extraClassSet.add(" btn-disabled");
  currentViewCompany === data.companyName
    ? extraClassSet.add(" btn-active")
    : null;
  extraClassSet = [...extraClassSet].join("");

  return (
    <li
      className={"shop-company-btn" + extraClassSet}
      onClick={loadCompaniesProducts}
    >
      {data.companyName}
    </li>
  );
};
