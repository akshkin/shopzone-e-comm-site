import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartItem from "../../components/cart-item/cart-item.component";
import Button, { BUTTON_TYPES } from "../../components/button/button.component";
import { Context } from "../../context/context";
import { CartContainer, CartItemsContainer } from "./cart.style";
import CartImg from "../../images/shopping-cart.png";

function Cart() {
  const { cartItems, cartTotal, favorites } = useContext(Context);

  const cartCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  const cartItemElements = cartItems.map((item) => {
    return (
      <div key={item.id} className="product cart-product">
        <CartItem item={item} />
      </div>
    );
  });

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
          <Button type={BUTTON_TYPES.base}>Place order</Button>
        </div>
      )}
    </CartContainer>
  );
}

export default Cart;
