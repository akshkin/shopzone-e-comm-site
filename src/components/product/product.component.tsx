import { Link } from "react-router-dom";
import Button, { BUTTON_TYPES } from "../button/button.component";
import { Icon } from "@iconify/react";
import {
  ProductContainer,
  ButtonContainer,
  Image,
  ProductTitle,
  ProductPrice,
  Rating
} from "./product.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";
import { addToFavorites, removeFromFavorites, selectFavorites } from "../../features/favoritesSlice";
import { addToCart } from "../../features/cartSlice";

type ProductProps = {
  product: ProductType
}


function Product({ product }: ProductProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  function addItemToFavorites(item: ProductType) {
    dispatch(addToFavorites(item));
  }
  function removeItemFromFavorites(id: string) {
    dispatch(removeFromFavorites(id));
  }

  function heartIcon() {
    if (favorites?.find((favorite) => favorite._id === product._id)) {
      return (
        <Icon
          icon="ri:heart-fill"
          onClick={() => removeItemFromFavorites(product._id)}
        />
      );
    } else {
      return (
        <Icon
          icon="ri:heart-line"
          onClick={() => addItemToFavorites(product)}
        />
      );
    }
  }

  function addItemToCart(item: ProductType) {
    dispatch(addToCart(item));
  }

  if (!product) {
    return <></>;
  }
  const { image, title, _id, price, rating } = product;
  return (
    <ProductContainer layout>
      <Image src={image} alt={`${title}`} />
      <ButtonContainer>
        <Button
          buttonType={BUTTON_TYPES.base}
          onClick={() => addItemToCart(product)}
        >
          Add to Cart
        </Button>
        <Button buttonType={BUTTON_TYPES.inverted}>{heartIcon()}</Button>
      </ButtonContainer>
      <ProductTitle>
        <Link to={`/products/${_id}`}>{title}</Link>
      </ProductTitle>
      <Rating>{rating.rate} <Icon icon="ri:star-s-fill" /></Rating>
      <ProductPrice>SEK {price}</ProductPrice>
    </ProductContainer>
  );
}

export default Product;
