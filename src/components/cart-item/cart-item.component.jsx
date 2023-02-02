import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  StyledIcon,
  CartItemContainer,
  CartItemInfo,
  Quantity,
  QuantityContainer,
} from "./cart-item.style";
import {
  removeFromCart,
  addToCart,
  clearFromCart,
} from "../../store/cart/cart.actions";

function CartItem({ item }) {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();

  const trashIcon = hovered ? "ri-delete-bin-5-fill" : "ri-delete-bin-5-line";

  const { _id, image, title, price, quantity } = item;

  function removeItemFromCart(id) {
    dispatch(removeFromCart(id));
  }

  function addItemToCart(item) {
    dispatch(addToCart(item));
  }

  function clearItemFromCart(id) {
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
          <p>SEK {price * quantity}</p>
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
            marginTop="0.5em"
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
