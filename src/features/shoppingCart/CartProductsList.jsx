import { CartProduct } from "./CartProduct";

export const CartProductsList = ({ products }) => {
  // const dispatch = useDispatch();

  const renderedCartProducts = products.map((product) => (
    <CartProduct data={product} key={product.productId} />
  ));

  return (
    <section className="cart-products-list">{renderedCartProducts}</section>
  );
};

//<div key={product.productId}>{product.productName}</div>
