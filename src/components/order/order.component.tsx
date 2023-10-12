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
  selectOrderItems,
  selectTotalPrice,
} from "../../features/orderSlice";

function Order() {
  const { orderId } = useParams();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectOrderItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  useEffect(() => {
    dispatch(getOrder(orderId!));
  }, [orderId, dispatch]);

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
