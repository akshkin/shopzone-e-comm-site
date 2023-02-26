import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Outlet } from "react-router-dom";
import Product from "../../components/product/product.component";
import Sort from "../../components/sort/sort.component";
import {
  productLoading,
  selectProducts,
  errorMessage,
  getProductsByCategory,
} from "../../features/productsSlice";
import useSort from "../../hooks/useSort";
import { ErrorText } from "../auth/auth.style";
import { StyledRiseLoader } from "../products/products.style";
import { CategoryContainer } from "./categories.style";

function Category() {
  const { category } = useParams();
  const products = useSelector(selectProducts);
  const loading = useSelector(productLoading);
  const error = useSelector(errorMessage);
  const dispatch = useDispatch();
  const sortProducts = useSort();

  useEffect(() => {
    dispatch(getProductsByCategory(category));
  }, [category, dispatch]);

  if (products) sortProducts([...products]);

  return (
    <>
      {loading ? (
        <StyledRiseLoader />
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <>
          <h2>{category.toUpperCase()}</h2>
          <Sort />
          <CategoryContainer>
            {products &&
              products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
          </CategoryContainer>
          <Outlet />
        </>
      )}
    </>
  );
}

export default Category;
