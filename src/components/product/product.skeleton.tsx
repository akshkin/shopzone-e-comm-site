import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  ProductContainer,
  Image,
  ProductTitle,
  ProductPrice,
  Rating,
  StyledCartIcon,
  StyledHeartIcon,
  ImageSkeleton,
  TitleSkeleton,
  RatingSkeleton,
  PriceSkeleton,
  CartIconSkeleton,
} from "./product.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";
import {
  addProductToFavorites,
  selectFavorites,
} from "../../features/favoritesSlice";
import { addProductToCart, selectCartItems } from "../../features/cartSlice";
import { getUser } from "../../features/userSlice";

type ProductProps = {
  product: ProductType;
  searchParams?: URLSearchParams;
};

function ProductSkeleton() {
  return (
    <ProductContainer>
      <ImageSkeleton/>

      <TitleSkeleton />
      <RatingSkeleton />
        
      <PriceSkeleton />
      <CartIconSkeleton />
       
    </ProductContainer>
  );
}

export default ProductSkeleton;
