import React, { useContext } from "react";
import { Context } from "../../context/context";
import Product from "../../components/product/product.component";
import { CategoryContainer } from "../categories/categories.style";

function Favorites() {
  const { favorites } = useContext(Context);
  const favoriteElements = favorites.map((favorite) => (
    <Product key={favorite.id} product={favorite} />
  ));
  if (favorites.length === 0) return <p>No products added to Favorites</p>;
  return <CategoryContainer>{favoriteElements}</CategoryContainer>;
}
export default Favorites;
