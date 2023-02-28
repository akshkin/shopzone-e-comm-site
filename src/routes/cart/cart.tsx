import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartItem, Button, Order } from "../../components";
import { BUTTON_TYPES } from "../../components/button/button.component";
import { CartContainer, CartItemsContainer, EmptyCart, PlaceOrder } from "./cart.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";
import { selectCartItems, clearCart } from "../../features/cartSlice";
import { selectFavorites } from "../../features/favoritesSlice";
import { Icon } from '@iconify/react';

const CartImg = require("../../images/shopping-cart.png")

function Cart() {
  const  cartItems  = useAppSelector(selectCartItems);
  const [cartTotal, setCartTotal] = useState(0);
  const dispatch = useAppDispatch();
  const  favorites  = useAppSelector(selectFavorites);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderItems, setOrderItems] = useState<ProductType[]>([...cartItems]);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity! * cartItem.price,
      0
  );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = orderItems.reduce(
      (total, orderItem) => total + orderItem.quantity! * orderItem.price,
      0
    );
    setOrderTotal(newTotal);
  }, [cartItems, orderItems]);

  const cartCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity!,
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
          <EmptyCart icon="noto:shopping-cart" />
          <Link to="/products">
            <h3>Your cart is empty. Let's add some items!</h3>
          </Link>
          {favorites && favorites.length > 0 && (
            <Button buttonType={BUTTON_TYPES.inverted}>
              <Link to="/favorites">ADD ITEMS FROM FAVORITES</Link>
            </Button>
          )}
        </div>
      ) : (
        <PlaceOrder>
          <h4>Price details ({cartCount} items): </h4>
          <p>Total amount: SEK {cartTotal.toFixed(2)}</p>
          <Button onClick={placeOrder}>
            Place order
          </Button>
        </PlaceOrder>
      )}
    </CartContainer>
  );
}

export default Cart;
