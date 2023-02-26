import Product from "../../components/product/product.component";
import { ProductsContainer, StyledRiseLoader } from "./products.style";
import Sort from "../../components/sort/sort.component";
import { useDispatch, useSelector } from "react-redux";
import { ErrorText } from "../auth/auth.style";
import useSort from "../../hooks/useSort";
import {
  errorMessage,
  getSortBy,
  listProducts,
  productLoading,
  selectProducts,
} from "../../features/productsSlice";
import { useEffect } from "react";

function Products() {
  const products = useSelector(selectProducts);
  const loading = useSelector(productLoading);
  const error = useSelector(errorMessage);
  const sortBy = useSelector(getSortBy);
  const sortProducts = useSort(sortBy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productElements = products?.map((product) => (
    <Product key={product._id} product={product} />
  ));

  sortProducts([...products]);

  return (
    <>
      {loading ? (
        <StyledRiseLoader />
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
