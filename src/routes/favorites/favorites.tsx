import Product from "../../components/product/product.component";
import { CategoryContainer } from "../categories/categories.style";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  getProductFavorites,
  selectFavorites,
} from "../../features/favoritesSlice";
import { useEffect } from "react";

function Favorites() {
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getProductFavorites());
  // }, [dispatch]);

  const favoriteElements = favorites?.map((favorite) => (
    <Product key={favorite.productId} product={favorite.product} />
  ));

  if (favorites?.length === 0) return <p>No products added to Favorites</p>;

  return <CategoryContainer>{favoriteElements}</CategoryContainer>;
}

export default Favorites;
