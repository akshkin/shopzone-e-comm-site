import React from "react";
import Product from "../../components/product/product.component";
import { CategoryContainer } from "../categories/categories.style";
import { useSelector } from "react-redux";

function Favorites() {
  const { favorites } = useSelector((state) => state.favorites);
  console.log(favorites);

  const favoriteElements = favorites?.map((favorite) => (
    <Product key={favorite._id} product={favorite} />
  ));

  if (favorites?.length === 0) return <p>No products added to Favorites</p>;

  return <CategoryContainer>{favoriteElements}</CategoryContainer>;
}

export default Favorites;
