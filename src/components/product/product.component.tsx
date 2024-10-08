import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  ProductContainer,
  Image,
  ProductTitle,
  ProductPrice,
  Rating,
  StyledCartIcon,
  StyledHeartIcon,
} from "./product.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";
import {
  addProductToFavorites,
  selectFavorites,
} from "../../features/favoritesSlice";
import {
  addProductToCart,
  addToCartUnlogged,
  selectCartItems,
} from "../../features/cartSlice";
import { getUser } from "../../features/userSlice";

type ProductProps = {
  product: ProductType;
  searchParams?: URLSearchParams;
};

function Product({ product, searchParams }: ProductProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const favorites = useAppSelector(selectFavorites);
  const cartItems = useAppSelector(selectCartItems);
  const navigate = useNavigate();
  const location = useLocation();

  function addItemToFavorites(item: ProductType) {
    user
      ? dispatch(addProductToFavorites({ item }))
      : navigate("/auth", { state: { message: "You must login first" } });
  }

  function heartIcon() {
    const isFavorite = favorites?.find(
      (favorite) => favorite.product._id === product._id
    );

    return <Icon icon={isFavorite ? "ri:heart-fill" : "ri:heart-line"} />;
  }

  function cartIcon() {
    const inCart = cartItems.find((item) => item.product._id === product._id);

    return <Icon icon={inCart ? "ion:cart-sharp" : "ion:cart-outline"} />;
  }

  function addItemToCart(item: ProductType) {
    user
      ? dispatch(addProductToCart({ cartItem: item }))
      : dispatch(addToCartUnlogged(item));
  }

  function saveScrollPosition() {
    // console.log(loaction);
    // if (location.pathname.startsWith("/products")) {
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    // }
  }

  if (!product) {
    return <></>;
  }
  const { image, title, _id, price, rating } = product;
  return (
    <ProductContainer layout>
      <Image src={image} alt={`${title}`} />

      <StyledHeartIcon
        onClick={() => addItemToFavorites(product)}
        icon={heartIcon().props.icon}
      />
      <ProductTitle onClick={saveScrollPosition}>
        <Link
          to={`/products/${_id}`}
          state={{ search: searchParams && `?${searchParams.toString()}` }}
        >
          {title?.substring(0, 12)}...
        </Link>
      </ProductTitle>
      <Rating>
        {rating?.rate} <Icon icon="ri:star-s-fill" />
      </Rating>
      <ProductPrice>SEK {price}</ProductPrice>
      <StyledCartIcon
        onClick={() => addItemToCart(product)}
        icon={cartIcon().props.icon}
      />
    </ProductContainer>
  );
}

export default Product;
