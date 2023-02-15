import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Outlet } from "react-router-dom";
import Product from "../../components/product/product.component";
import Sort from "../../components/sort/sort.component";
import {
  getSortBy,
  productLoading,
  selectProducts,
} from "../../features/productsSlice";
import useSort from "../../hooks/useSort";
import { StyledRiseLoader } from "../products/products.style";
import { CategoryContainer } from "./categories.style";

function Category() {
  const { category } = useParams();
  const products = useSelector(selectProducts);
  const loading = useSelector(productLoading);
  const sortBy = useSelector(getSortBy);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const sortProducts = useSort(sortBy);

  sortProducts(categoryProducts);

  useEffect(() => {
    const categories = {
      mens: mensCategory,
      womens: womensCategory,
      jewelery: jeweleryCategory,
      electronics: electronicsCategory,
    };
    setCategoryProducts(categories[category]);
  }, [category, products]);

  function filterProducts(category) {
    return (
      products && products.filter((product) => product.category === category)
    );
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
