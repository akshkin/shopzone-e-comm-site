import React from "react";
import { CartItemContainer, CartItemInfo } from "../cart-item/cart-item.style";

function OrderCartItem({ cartItem }) {
  const { image, title, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={image} alt={title} />
      <CartItemInfo>
        <h4>{title}</h4>
        <p>SEK {price}</p>
        <span>quantity: {quantity}</span>
      </CartItemInfo>
    </CartItemContainer>
  );
}

export default OrderCartItem;
