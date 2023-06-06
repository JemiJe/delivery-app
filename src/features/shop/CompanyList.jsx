import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchCompanies, companySelected } from "./shopSlice";

import { CompanyBtn } from "./CompanyBtn";

export const CompanyList = () => {
  const dispatch = useDispatch();

  const companies = useSelector((state) => state.shop.companies);
  const selectedCompany = useSelector((state) => state.shop.selectedCompany);
  const currentViewCompany = useSelector(
    (state) => state.shop.currentCompanyView
  );
  const companiesStatus = useSelector((state) => state.shop.status.companies);
  const cart = useSelector((state) => state.shoppingCart.products);

  useEffect(() => {
    if (companiesStatus === "idle") {
      dispatch(fetchCompanies());
    }

    // after company list loaded, dispatch companySelected, otherwise would be error
    if (companiesStatus === "succeeded") {
      if (cart.length > 0) {
        const companyName = companies.find(
          (company) => company.id == cart[0].companyId
        ).companyName;
        dispatch(companySelected(companyName));
      }
    }
  }, [companiesStatus, dispatch]);

  const isSelectedCompany = (name) => {
    if (selectedCompany) return name === selectedCompany;
    return undefined;
  };

  const renderedCompanies = companies.map((company) => (
    <CompanyBtn
      key={company.id}
      data={company}
      isSelected={isSelectedCompany(company.companyName)}
      currentViewCompany={currentViewCompany}
    />
  ));

  return <ul>{renderedCompanies}</ul>;
};
