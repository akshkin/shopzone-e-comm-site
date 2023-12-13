import Product from "../../components/product/product.component";
import { CategoryContainer } from "../categories/categories.style";

import { useAppSelector } from "../../hooks/useAppDispatch";
import {
  favoritesLoading,
  selectFavorites,
} from "../../features/favoritesSlice";

import { StyledLoader } from "../products/products.style";

function Favorites() {
  const favorites = useAppSelector(selectFavorites);
  const isLoading = useAppSelector(favoritesLoading);

  const favoriteElements = favorites?.map((favorite) => (
    <Product key={favorite.product._id} product={favorite.product} />
  ));

  if (favorites?.length === 0) return <p>No products added to Favorites</p>;

  if (isLoading) return <StyledLoader />;

  return <CategoryContainer>{favoriteElements}</CategoryContainer>;
}

export default Favorites;
