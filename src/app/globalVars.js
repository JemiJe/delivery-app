const baseAPIs = {
  // choose mockapi for rollback
  mockapi: "https://64739b8ad784bccb4a3cc3e4.mockapi.io/",
  cyclic: "https://tame-jade-dhole-toga.cyclic.app/api/",
};
// temporary fix cors problem
const corsProxyUrl = "https://corsproxy.io/?";

const baseAPIUrl = corsProxyUrl + baseAPIs.cyclic;
const companyPlaceholder = [
  { id: "1", companyName: "Company placeholder" },
  { id: "2", companyName: "Company2 placeholder2" },
];
const productPlaceholder = [
  {
    productName: "Prod placeholder",
    productDescription: "Some description.......",
    productPrice: "179.00",
    productImage: "productImage 1",
    id: "1",
    companyId: "3",
  },
  {
    productName: "Prod placeholder",
    productDescription: "Some description.......",
    productPrice: "179.00",
    productImage: "productImage 1",
    id: "2",
    companyId: "3",
  },
];

export const globalVars = {
  BASE_API_URL: baseAPIUrl,
  COMPANIES_URL: baseAPIUrl + "company",
  getProductsURL: (companyId) => {
    return globalVars.COMPANIES_URL + `/${companyId}/` + "product";
  },
  POST_ORDER_URL: baseAPIUrl + "order",
  COMPANIES_PLACEHOLDER: companyPlaceholder,
  PRODUCT_PLACEHOLDER: productPlaceholder,
};
