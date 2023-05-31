import { CompanyList } from "./CompanyList";
import { ProductList } from "./ProductList";

export const ShopPage = () => {
  return (
    <main className="shop-main">
      <div className="shop-companies">
        <CompanyList />
      </div>
      <div className="shop-products">
        <ProductList />
      </div>
    </main>
  );
};
