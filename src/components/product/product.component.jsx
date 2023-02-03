import React from "react";
import { Link } from "react-router-dom";
import Button, { BUTTON_TYPES } from "../button/button.component";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import {
  ProductContainer,
  ButtonContainer,
  Image,
  ProductTitle,
  ProductPrice,
} from "./product.style";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart/cart.actions";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../store/favorites/favorites.actions";

function Product({ product }) {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);

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
Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};
export default Product;
