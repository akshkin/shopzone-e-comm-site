import Product from "../../components/product/product.component";
import { CategoryContainer } from "../categories/categories.style";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  favoritesLoading,
  getProductFavorites,
  selectFavorites,
} from "../../features/favoritesSlice";
import { useEffect } from "react";
import { StyledLoader } from "../products/products.style";

function Favorites() {
  const favorites = useAppSelector(selectFavorites);
  const isLoading = useAppSelector(favoritesLoading);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getProductFavorites());
  // }, [dispatch]);

  console.log(favorites);
  const favoriteElements = favorites?.map((favorite) => (
    <Product key={favorite.product._id} product={favorite.product} />
  ));

  if (favorites?.length === 0) return <p>No products added to Favorites</p>;

  if (isLoading) return <StyledLoader />;

  return <CategoryContainer>{favoriteElements}</CategoryContainer>;
}

export default Favorites;
