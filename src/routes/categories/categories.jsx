import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Outlet } from "react-router-dom";
import Product from "../../components/product/product.component";
import Sort from "../../components/sort/sort.component";
import useSort from "../../hooks/useSort";
import { StyledRiseLoader } from "../products/products.style";
import { CategoryContainer } from "./categories.style";

function Category() {
  const { category } = useParams();
  const allProducts = useSelector((state) => state.allProducts);
  const { loading, sortBy, products } = allProducts;
  const [categoryProducts, setCategoryProducts] = useState([]);
  const sortProducts = useSort(sortBy, categoryProducts);

  sortProducts(categoryProducts);

  useEffect(() => {
    const categories = {
      mens: mensCategory,
      womens: womensCategory,
      jewelery: jeweleryCategory,
      electronics: electronicsCategory,
    };
    setCategoryProducts(categories[category]);
  }, [category, allProducts]);

  function filterProducts(category) {
    return products.filter((product) => product.category === category);
  }

  const mensCategory = filterProducts("men's clothing");
  const womensCategory = filterProducts("women's clothing");
  const jeweleryCategory = filterProducts("jewelery");
  const electronicsCategory = filterProducts("electronics");

  return (
    <>
      {loading && <StyledRiseLoader />}
      <h2>{category.toUpperCase()}</h2>
      <Sort />
      <CategoryContainer>
        {categoryProducts &&
          categoryProducts.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
      </CategoryContainer>
      <Outlet />
    </>
  );
}

export default Category;
