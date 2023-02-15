import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "../../components/product/product.component";
import Sort from "../../components/sort/sort.component";
import { getSortBy } from "../../features/productsSlice";
import useSort from "../../hooks/useSort";
import { ProductsContainer } from "../products/products.style";
import { SearchTitle } from "./searchPage.styles";

function SearchPage({ filteredProducts }) {
  const { query } = useParams();
  const sortBy = useSelector(getSortBy);
  const sortProducts = useSort(sortBy);

  sortProducts(filteredProducts);

  return (
    <>
      <SearchTitle>
        Showing results for <span>{query}</span>
      </SearchTitle>
      {filteredProducts.length > 0 ? <Sort /> : null}
      <ProductsContainer>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p>No results found. Please try another search!</p>
        )}
      </ProductsContainer>
    </>
  );
}

export default SearchPage;
