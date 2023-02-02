import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Outlet } from "react-router-dom";
import Product from "../../components/product/product.component";
import Sort from "../../components/sort/sort.component";
import useSort from "../../hooks/useSort";
import { listProducts } from "../../store/product/product.actions";
import { CategoryContainer } from "./categories.style";

function Category() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const { sortBy, products } = allProducts;
  const [categoryProducts, setCategoryProducts] = useState([]);
  const sortProducts = useSort(sortBy, categoryProducts);

  sortProducts(categoryProducts);

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  useEffect(() => {
    const categories = {
      mens: mensCategory,
      womens: womensCategory,
      jewelery: jeweleryCategory,
      electronics: electronicsCategory,
    };
    setCategoryProducts(categories[category]);
  }, [category, allProducts]);

  const mensCategory = products.filter(
    (product) => product.category === "men's clothing"
  );
  const womensCategory = products.filter(
    (product) => product.category === "women's clothing"
  );
  const jeweleryCategory = products.filter(
    (product) => product.category === "jewelery"
  );
  const electronicsCategory = products.filter(
    (product) => product.category === "electronics"
  );

  return (
    <>
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
