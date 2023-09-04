import { Link, useNavigate } from "react-router-dom";
import Button, { BUTTON_TYPES } from "../button/button.component";
import { Icon } from "@iconify/react";
import {
  ProductContainer,
  ButtonContainer,
  Image,
  ProductTitle,
  ProductPrice,
  Rating,
  StyledCartIcon,
  StyledHeartIcon,
} from "./product.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";
import {
  addProductToFavorites,
  selectFavorites,
} from "../../features/favoritesSlice";
import { addProductToCart } from "../../features/cartSlice";
import { getUser } from "../../features/userSlice";

type ProductProps = {
  product: ProductType;
  searchParams?: URLSearchParams;
};

function Product({ product, searchParams }: ProductProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const favorites = useAppSelector(selectFavorites);
  const navigate = useNavigate();

  function addItemToFavorites(item: ProductType) {
    user
      ? dispatch(addProductToFavorites({ item }))
      : navigate("/auth", { state: { message: "You must login first" } });
  }

  function heartIcon() {
    const isFavorite = favorites?.find(
      (favorite) => favorite.productId === product._id
    );

    return (
      <Icon
        icon={isFavorite ? "ri:heart-fill" : "ri:heart-line"}
        // onClick={() => addItemToFavorites(product)}
      />
    );
  }

  function addItemToCart(item: ProductType) {
    user
      ? dispatch(addProductToCart({ cartItem: item }))
      : navigate("/auth", {
          state: {
            message:
              "Please be patient while we work on the functionality of adding items to cart without being logged in.",
          },
        });
  }

  if (!product) {
    return <></>;
  }
  const { image, title, _id, price, rating } = product;
  return (
    <ProductContainer layout>
      <Image src={image} alt={`${title}`} />

      <StyledHeartIcon
        onClick={() => addItemToFavorites(product)}
        icon={heartIcon().props.icon}
      />
      <ProductTitle>
        <Link
          to={`/products/${_id}`}
          state={{ search: searchParams && `?${searchParams.toString()}` }}
        >
          {title.substring(0, 12)}...
        </Link>
      </ProductTitle>
      <Rating>
        {rating?.rate} <Icon icon="ri:star-s-fill" />
      </Rating>
      <ProductPrice>SEK {price}</ProductPrice>
      <StyledCartIcon
        onClick={() => addItemToCart(product)}
        icon="ion:cart-outline"
      />
    </ProductContainer>
  );
}

export default Product;
