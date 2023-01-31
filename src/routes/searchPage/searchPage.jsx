import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/product/product.component";
import Sort from "../../components/sort/sort.component";
import { Context } from "../../context/context";
import { ProductsContainer } from "../products/products.style";
import { SearchTitle } from "./searchPage.styles";

function SearchPage() {
  const { query } = useParams();
  const { filteredProducts, sortProducts } = useContext(Context);

  sortProducts(filteredProducts);

  return (
    <>
      <SearchTitle>
        Showing results for <span>{query}</span>
      </SearchTitle>
      <Sort />
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
