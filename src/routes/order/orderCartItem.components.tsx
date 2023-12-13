import { ProductType } from "../../constants.types";
import {
  CartItemContainer,
  CartItemInfo,
} from "../../components/cart-item/cart-item.style";

type OrderCartItemProps = {
  cartItem: ProductType;
  quantity: number;
};

function OrderCartItem({ cartItem, quantity }: OrderCartItemProps) {
  const { image, title, price } = cartItem;
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
