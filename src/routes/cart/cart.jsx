import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CartItem from "../../components/cart-item/cart-item.component";
import Button, { BUTTON_TYPES } from "../../components/button/button.component";
import { Context } from "../../context/context";
import { CartContainer, CartItemsContainer } from "./cart.style";
import CartImg from "../../images/shopping-cart.png";
import Order from "../../components/order/order.component";

function Cart() {
  const { cartItems, cartTotal, favorites, setCartItems } = useContext(Context);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderItems, setOrderItems] = useState([...cartItems]);

  const orderTotal = orderItems.reduce(
    (total, orderItem) => total + orderItem.quantity * orderItem.price,
    0
  );

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
    setTimeout(() => {
      setOrderPlaced(true);
    }, 300);
    setCartItems([]);
  }

  if (orderPlaced)
    return <Order orderTotal={orderTotal} orderItems={orderItems} />;
  return (
    <CartContainer>
      <CartItemsContainer>{cartItemElements}</CartItemsContainer>
      {!cartItems.length ? (
        <div>
          <img src={CartImg} alt="empty shopping cart" />
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
        <div className="place-order">
          <h4>Price details ({cartCount} items): </h4>
          <p>Total amount: SEK {cartTotal.toFixed(2)}</p>
          <Button onClick={placeOrder} type={BUTTON_TYPES.base}>
            Place order
          </Button>
        </div>
      )}
    </CartContainer>
  );
}

export default Cart;
