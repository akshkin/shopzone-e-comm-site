import { useState } from "react";
import { Link } from "react-router-dom";
import {
  StyledIcon,
  CartItemContainer,
  CartItemInfo,
  Quantity,
  QuantityContainer,
} from "./cart-item.style";
import { addToCart, removeFromCart, clearFromCart } from "../../features/cartSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";

type CartItemProp = {
  item: ProductType
}

function CartItem({ item }: CartItemProp) {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch()

  const trashIcon = hovered ? "ri-delete-bin-5-fill" : "ri-delete-bin-5-line";

  const { _id, image, title, price, quantity } = item;

  function removeItemFromCart(id: string) {
    dispatch(removeFromCart(id));
  }

  function addItemToCart(item: ProductType) {
    dispatch(addToCart(item));
  }

  function clearItemFromCart(id: string) {
    dispatch(clearFromCart(id));
  }

  return (
    <>
      <CartItemContainer>
        <img src={image} alt={`${title}`} />
        <CartItemInfo>
          <h3>
            <Link to={`/products/${_id}`}>{title}</Link>
          </h3>
          <p>SEK {quantity ? price * quantity : price}</p>
          <QuantityContainer>
            <StyledIcon
              icon="ri:subtract-fill"
              onClick={() => removeItemFromCart(_id)}
            />
            <Quantity> {quantity} </Quantity>
            <StyledIcon
              icon="ri:add-line"
              onClick={() => addItemToCart(item)}
            />
          </QuantityContainer>
          <StyledIcon
            display="block"
            margintop="0.5em"
            icon={trashIcon}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => clearItemFromCart(_id)}
          />
        </CartItemInfo>
      </CartItemContainer>
    </>
  );
}

export default CartItem;
