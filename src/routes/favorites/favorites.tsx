import Product from "../../components/product/product.component";
import { CategoryContainer } from "../categories/categories.style";

import { useAppSelector } from "../../hooks/useAppDispatch";
import { selectFavorites } from "../../features/favoritesSlice";

function Favorites() {
  const favorites = useAppSelector(selectFavorites);


  const favoriteElements = favorites?.map((favorite) => (
    <Product key={favorite._id} product={favorite} />
  ));

  if (favorites?.length === 0) return <p>No products added to Favorites</p>;

  return <CategoryContainer>{favoriteElements}</CategoryContainer>;
}

export default Favorites;
