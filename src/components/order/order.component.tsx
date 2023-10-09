import { ProductType } from "../../constants.types";
import { CartItemType } from "../../features/cartSlice";
import OrderCartItem from "./orderCartItem.components";
import {
  OrderItemTotal,
  StyledOrder,
  StyledLink,
} from "./orderCartItem.styles";

type OrderProps = {
  orderItems: CartItemType[];
  orderTotal: number;
};

function Order({ orderItems, orderTotal }: OrderProps) {
  return (
    <StyledOrder>
      <h2>Your order has been confirmed</h2>
      <h4>Order summary</h4>
      <div>
        {orderItems.map((cartItem) => (
          <OrderCartItem
            key={cartItem.product._id}
            cartItem={cartItem.product}
            quantity={cartItem.quantity}
          />
        ))}
      </div>
      <OrderItemTotal>Total: SEK {orderTotal}</OrderItemTotal>
      <StyledLink to="/products">Keep shopping</StyledLink>
    </StyledOrder>
  );
}

export default Order;
