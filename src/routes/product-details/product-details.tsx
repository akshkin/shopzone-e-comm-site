import React from "react";
import { useLoaderData, useNavigate, useParams, LoaderFunctionArgs, Await, defer } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button, { BUTTON_TYPES } from "../../components/button/button.component";
import { MainProductContainer, ButtonContainer } from "./product-details.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";
import { addToCart } from "../../features/cartSlice";
import { addToFavorites, removeFromFavorites, selectFavorites } from "../../features/favoritesSlice";
import { getUser } from "../../features/userSlice";
import { getProductDetails } from "../../utils/utils";
import {  } from "react-router-dom";
import { StyledLoader } from "../products/products.style";

type ProductParams = {
  productId: string
}

type LoaderDataType = {
  product: ProductType
}



export function loader({ params }: LoaderFunctionArgs){ 
  const productPromise = params.productId ? getProductDetails(params.productId) : null
  return defer({ product: productPromise })
}

function ProductDetail() {
  const {product} = useLoaderData() as LoaderDataType
  const { productId } = useParams<keyof ProductParams>() as ProductParams;
  const favorites = useAppSelector(selectFavorites)
  const dispatch = useAppDispatch();
  
  function addItemToCart(item: ProductType) {
    dispatch(addToCart(item));
  }

  function addItemToFavorites() {
    if (product){
      if (!favorites.includes(product)){
        return dispatch(addToFavorites(product));
      } else {
        return dispatch(removeFromFavorites(product._id))
      }
    }   
    
  }
  
  function renderProduct(product: ProductType){
    const { image, title, category, rating, price, description } = product;
    return (
      <MainProductContainer>
        <img src={image} alt={title} />
        <div className="product-info">
          <h2>{title}</h2>
          <p>{category}</p>
          <p>
            <span>
              <Icon icon="ri:star-s-fill" />
              {rating?.rate} ({rating?.count})
            </span>
          </p>
          <ButtonContainer>
            <Button
              buttonType={BUTTON_TYPES.base}
              onClick={() => addItemToCart(product)}
            >
              Add to Cart
            </Button>
            <Button
              buttonType={BUTTON_TYPES.inverted}
              onClick={addItemToFavorites}
            >
              Favorite
            </Button>
          </ButtonContainer>
          <p>SEK {price}</p>
          <h4>Product details: </h4>
          <p>{description}</p>
        </div>
      </MainProductContainer>
    )

  }

  return (
    <React.Suspense fallback={<StyledLoader />}>
      <Await resolve={product} children={renderProduct} />       
    </React.Suspense>
  );
}

export default ProductDetail;
