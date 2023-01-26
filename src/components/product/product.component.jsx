import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button, { BUTTON_TYPES } from "../button/button.component";
import PropTypes from "prop-types";
import { Context } from "../../context/context";
import { Icon } from "@iconify/react";
import {
  ProductContainer,
  ButtonContainer,
  Image,
  ProductTitle,
  ProductPrice,
} from "./product.style";

function Product({ product }) {
  const { favorites, addToFavorites, removeFromFavorites, addToCart } =
    useContext(Context);

  function heartIcon() {
    if (favorites.some((favorite) => favorite.id === product.id)) {
      return (
        <Icon
          icon="ri:heart-fill"
          onClick={() => removeFromFavorites(product.id)}
        />
      );
    } else {
      return (
        <Icon icon="ri:heart-line" onClick={() => addToFavorites(product)} />
      );
    }
  }

  if (!product) {
    return <></>;
  }
  const { image, title, id, price } = product;
  return (
    <ProductContainer>
      <Image src={image} alt={`${title}`} />
      <ButtonContainer>
        <Button
          buttonType={BUTTON_TYPES.base}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
        <Button buttonType={BUTTON_TYPES.inverted}>{heartIcon()}</Button>
      </ButtonContainer>
      <ProductTitle>
        <Link to={`/products/${id}`}>{title}</Link>
      </ProductTitle>
      <ProductPrice>SEK {price}</ProductPrice>
    </ProductContainer>
  );
}
Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};
export default Product;
