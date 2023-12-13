import { useParams } from "react-router-dom";
import OrderCartItem from "./orderCartItem.components";
import {
  OrderItemTotal,
  StyledOrder,
  StyledLink,
} from "./orderCartItem.styles";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  getOrder,
  getOrderUnlogged,
  selectOrderItems,
  selectTotalPrice,
} from "../../features/orderSlice";
import { getUser } from "../../features/userSlice";

function Order() {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectOrderItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const user = useAppSelector(getUser);

  useEffect(() => {
    user ? dispatch(getOrder(orderId!)) : dispatch(getOrderUnlogged(orderId!));
  }, [orderId, user, dispatch]);

  return (
    <StyledOrder>
      <h2>Your order has been confirmed</h2>
      <h4>Order summary</h4>
      <div>
        {cartItems.map((cartItem) => (
          <OrderCartItem
            key={cartItem.product._id}
            cartItem={cartItem.product}
            quantity={cartItem.quantity}
          />
        ))}
      </div>
      <OrderItemTotal>Total: SEK {totalPrice}</OrderItemTotal>
      <StyledLink to="/products">Keep shopping</StyledLink>
    </StyledOrder>
  );
}

export default Order;
