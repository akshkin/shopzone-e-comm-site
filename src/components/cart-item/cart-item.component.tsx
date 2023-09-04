import { useState } from "react";
import { Link } from "react-router-dom";
import {
  StyledIcon,
  CartItemContainer,
  CartItemInfo,
  Quantity,
  QuantityContainer,
} from "./cart-item.style";
import {
  addProductToCart,
  removeProductFromCart,
  CartItemType,
  clearProductFromCart,
} from "../../features/cartSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";

type CartItemProp = {
  item: CartItemType;
};

function CartItem({ item }: CartItemProp) {
  const [hovered, setHovered] = useState(false);
  const dispatch = useAppDispatch();

  const trashIcon = hovered ? "ri-delete-bin-5-fill" : "ri-delete-bin-5-line";

  const { _id, image, title } = item.product;

  function removeItemFromCart(id: string) {
    dispatch(removeProductFromCart({ id }));
  }

  function addItemToCart(item: ProductType) {
    dispatch(addProductToCart({ cartItem: item }));
  }

  function clearItemFromCart(id: string) {
    dispatch(clearProductFromCart({ id }));
  }

  return (
    <>
      <CartItemContainer>
        <img src={image} alt={`${title}`} />
        <CartItemInfo>
          <h3>
            <Link to={`/products/${_id}`}>{title}</Link>
          </h3>
          <p>SEK {item.totalPrice}</p>
          <QuantityContainer>
            <StyledIcon
              icon="ri:subtract-fill"
              onClick={() => removeItemFromCart(_id)}
            />
            <Quantity> {item.quantity} </Quantity>
            <StyledIcon
              icon="ri:add-line"
              onClick={() => addItemToCart(item.product)}
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
