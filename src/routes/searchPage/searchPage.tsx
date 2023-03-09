import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/product/product.component";
import { productLoading, searchProducts, selectFilteredProducts } from "../../features/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ProductsContainer, StyledLoader } from "../products/products.style";
import { SearchTitle } from "./searchPage.styles";


type SearchParams = {
  query: string;
}

function SearchPage() {
  const { query } = useParams<keyof SearchParams>() as SearchParams;
  const dispatch = useAppDispatch()
  const loading = useAppSelector(productLoading)
  const filteredProducts = useAppSelector(selectFilteredProducts)

  useEffect(() => {
    dispatch(searchProducts(query))

  }, [query, dispatch])

  return (
    <>
      { loading? <StyledLoader /> :       (<><SearchTitle>
        Showing results for <span>{query}</span>
      </SearchTitle>
      <ProductsContainer>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p>No results found. Please try another search!</p>
        )}
      </ProductsContainer></>)}
    </>
  );
}

export default SearchPage;
