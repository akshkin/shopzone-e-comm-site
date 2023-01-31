import React from "react";
import OrderCartItem from "./orderCartItem.components";
import {
  OrderItemTotal,
  StyledOrder,
  StyledLink,
} from "./orderCartItem.styles";

function Order({ orderItems, orderTotal }) {
  return (
    <StyledOrder>
      <h2>Your order has been confirmed</h2>
      <h4>Order summary</h4>
      <div>
        {orderItems.map((cartItem) => (
          <OrderCartItem key={cartItem._id} cartItem={cartItem} />
        ))}
      </div>
      <OrderItemTotal>Total: SEK {orderTotal}</OrderItemTotal>
      <StyledLink to="/products">Keep shopping</StyledLink>
    </StyledOrder>
  );
}

export default Order;
