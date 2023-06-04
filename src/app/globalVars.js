// temporary fix cors problem
const corsProxyUrl = "https://corsproxy.io/?";
const baseAPIs = {
  // choose mockapi for rollback
  mockapi: "https://64739b8ad784bccb4a3cc3e4.mockapi.io/",
  cyclic: "https://tame-jade-dhole-toga.cyclic.app/api/",
  // in case of cors errors
  cyclicCORS: corsProxyUrl + "https://tame-jade-dhole-toga.cyclic.app/api/",
};

const baseAPIUrl = baseAPIs.cyclic;

// placeholders
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
  CHECK_ORDERS_URL: baseAPIUrl + "orders",
  COMPANIES_PLACEHOLDER: companyPlaceholder,
  PRODUCT_PLACEHOLDER: productPlaceholder,
  GOOGLE_MAPS_APIKEY: "AIzaSyDPpQQJmSfcAK8jC80PQ_wCutY3SK161AI",
};
