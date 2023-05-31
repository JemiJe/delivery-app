import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchCompanies } from "./shopSlice";

import { CompanyBtn } from "./CompanyBtn";

export const CompanyList = () => {
  const dispatch = useDispatch();

  const companies = useSelector((state) => state.shop.companies);
  const companiesStatus = useSelector((state) => state.shop.status.companies);

  useEffect(() => {
    if (companiesStatus === "idle") {
      dispatch(fetchCompanies());
    }
  }, [companiesStatus, dispatch]);

  const renderedCompanies = companies.map((company) => (
    <CompanyBtn key={company.id} data={company} />
  ));

  return <ul>{renderedCompanies}</ul>;
};
