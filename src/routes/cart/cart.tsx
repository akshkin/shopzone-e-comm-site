import { Link, useNavigate } from "react-router-dom";
import { CartItem, Button } from "../../components";
import { BUTTON_TYPES } from "../../components/button/button.component";
import {
  CartContainer,
  CartItemsContainer,
  EmptyCart,
  PlaceOrder,
} from "./cart.style";
import { useAppSelector } from "../../hooks/useAppDispatch";
import {
  selectCartItems,
  selectTotalPrice,
  cartLoading,
} from "../../features/cartSlice";
import { selectFavorites } from "../../features/favoritesSlice";
import { StyledLoader } from "../products/products.style";

export type CartItemType = {
  product: string;
  quantity: number;
  totalPrice: number;
};

function Cart() {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectTotalPrice);
  const favorites = useAppSelector(selectFavorites);
  const isLoading = useAppSelector(cartLoading);

  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  const cartItemElements = cartItems?.map((item) => {
    return (
      <div key={item.product._id} className="product cart-product">
        <CartItem item={item} />
      </div>
    );
  });

  function placeOrder() {
    navigate("/checkout/shipping");
  }

  if (isLoading) return <StyledLoader />;

  return (
    <>
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
            <Button onClick={placeOrder}>Place order</Button>
          </PlaceOrder>
        )}
      </CartContainer>
    </>
  );
}

export default Cart;
