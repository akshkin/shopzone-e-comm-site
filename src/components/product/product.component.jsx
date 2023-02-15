import React from "react";
import { Link } from "react-router-dom";
import Button, { BUTTON_TYPES } from "../button/button.component";
import { Icon } from "@iconify/react";
import {
  ProductContainer,
  ButtonContainer,
  Image,
  ProductTitle,
  ProductPrice,
} from "./product.style";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from "../../features/favoritesSlice";
import { addToCart } from "../../features/cartSlice";

function Product({ product }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  function addItemToFavorites(item) {
    dispatch(addToFavorites(item));
  }
  function removeItemFromFavorites(id) {
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

  function addItemToCart(item) {
    dispatch(addToCart(item));
  }

  if (!product) {
    return <></>;
  }
  const { image, title, _id, price } = product;
  return (
    <ProductContainer>
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
      <ProductPrice>SEK {price}</ProductPrice>
    </ProductContainer>
  );
}

export default Product;
