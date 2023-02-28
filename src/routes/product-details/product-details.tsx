import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button, { BUTTON_TYPES } from "../../components/button/button.component";
import { MainProductContainer, ButtonContainer } from "./product-details.style";
import { ErrorText } from "../auth/auth.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";
import { addToCart } from "../../features/cartSlice";
import { addToFavorites, removeFromFavorites, selectFavorites } from "../../features/favoritesSlice";
import { productLoading, errorMessage, selectProduct, getProductDetail} from "../../features/productsSlice";
import { RiseLoader } from "react-spinners"
import { useEffect } from "react";

type ProductParams = {
  productId: string
}

function ProductDetail() {
  const { productId } = useParams<keyof ProductParams>() as ProductParams;
  const favorites = useAppSelector(selectFavorites)
  const product = useAppSelector(selectProduct);
  const loading = useAppSelector(productLoading)
  const error = useAppSelector(errorMessage)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductDetail(productId))
  }, [])

  function addItemToCart(item: ProductType) {
    dispatch(addToCart(item));
  }

  function addItemToFavorites() {
    if (product){
      if (!favorites.includes(product)){
        dispatch(addToFavorites(product));
      } else {
        dispatch(removeFromFavorites(product._id))
      }
    }
  }

  if (!product) return <h4>Something went wrong!</h4>;

  const { image, title, category, rating, price, description } = product;

  return (
    <>
      {loading ? (
         <RiseLoader /> 
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <MainProductContainer>
          <img src={image} alt={title} />
          <div className="product-info">
            <h2>{title}</h2>
            <p>{category}</p>
            <p>
              <span>
                <Icon icon="ri:star-s-fill" />
                {rating.rate} ({rating.count})
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
      )}
    </>
  );
}

export default ProductDetail;
