import { useEffect } from "react";
import Product from "../../components/product/product.component";
import { ProductsContainer } from "./products.style";
import Sort from "../../components/sort/sort.component";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../store/product/product.actions";
import { ErrorText } from "../../components/sign-in/sign-in.style";
import useSort from "../../hooks/useSort";

function Products() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const { loading, products, error, sortBy } = allProducts;
  const sortProducts = useSort(sortBy, products);

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  const productElements = products?.map((product) => (
    <Product key={product._id} product={product} />
  ));

  sortProducts(products);

  return (
    <>
      {loading ? (
        <h3>Loading</h3>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <>
          <Sort />
          <ProductsContainer className="products">
            {productElements}
          </ProductsContainer>
        </>
      )}
    </>
  );
}

export default Products;
