import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartItem, Button, Order } from "../../components";
import { BUTTON_TYPES } from "../../components/button/button.component";
import {
  CartContainer,
  CartItemsContainer,
  PlaceOrder,
  StyledCartImg,
} from "./cart.style";
import { ReactComponent as CartImg } from "../../images/shopping-cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/cart/cart.actions";

function Cart() {
  const { cartItems } = useSelector((state) => state.cartItems);
  const [cartTotal, setCartTotal] = useState(0);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderItems, setOrderItems] = useState([...cartItems]);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = orderItems.reduce(
      (total, orderItem) => total + orderItem.quantity * orderItem.price,
      0
    );
    setOrderTotal(newTotal);
  }, [cartItems, orderItems]);

  const cartCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  const cartItemElements = cartItems.map((item) => {
    return (
      <div key={item._id} className="product cart-product">
        <CartItem item={item} />
      </div>
    );
  });

  function placeOrder() {
    if (window.confirm("Confirm payment?")) {
      setTimeout(() => {
        setOrderPlaced(true);
      }, 300);
    }
    dispatch(clearCart());
  }

  if (orderPlaced)
    return <Order orderTotal={orderTotal} orderItems={orderItems} />;

  return (
    <CartContainer>
      <CartItemsContainer>{cartItemElements}</CartItemsContainer>
      {!cartItems.length ? (
        <div>
          <StyledCartImg className="empty-cart" />
          <Link to="/products">
            <h3>Your cart is empty. Let's add some items!</h3>
          </Link>
          {favorites.length > 0 && (
            <Button buttonType={BUTTON_TYPES.inverted}>
              <Link to="/favorites">ADD ITEMS FROM FAVORITES</Link>
            </Button>
          )}
        </div>
      ) : (
        <PlaceOrder>
          <h4>Price details ({cartCount} items): </h4>
          <p>Total amount: SEK {cartTotal.toFixed(2)}</p>
          <Button onClick={placeOrder} type={BUTTON_TYPES.base}>
            Place order
          </Button>
        </PlaceOrder>
      )}
    </CartContainer>
  );
}

export default Cart;
