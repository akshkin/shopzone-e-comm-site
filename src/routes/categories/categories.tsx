import { useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import Product from "../../components/product/product.component";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import useSort from "../../hooks/useSort";
import { CategoryContainer } from "./categories.style";
import { selectProducts, productLoading, errorMessage, selectShow, setShow, getProductsByCategory, selectTotalProducts } from "../../features/productsSlice";
import { ErrorText } from "../auth/auth.style";
import { StyledLoader } from "../products/products.style";


type CategoryParams = {
  category: string;
}


function Category() {
  const { category } = useParams<keyof CategoryParams>() as CategoryParams;

  const products = useAppSelector(selectProducts)
  const loading = useAppSelector(productLoading)
  const error = useAppSelector(errorMessage)
  const totalProducts = useAppSelector(selectTotalProducts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProductsByCategory(category))
  }, [category,dispatch ])

  const sortProducts = useSort(); 

  if (products) sortProducts([...products]);

  
  return (
    <>
      {loading ? (
         <StyledLoader /> 
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <>
      <h2>{category?.toUpperCase()}</h2>
      <h4>Showing {totalProducts} products</h4>
      <CategoryContainer animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}}>
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
