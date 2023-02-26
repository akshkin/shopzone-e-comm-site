import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button, { BUTTON_TYPES } from "../../components/button/button.component";
import { MainProductContainer, ButtonContainer } from "./product-details.style";
import { useDispatch, useSelector } from "react-redux";
import { ErrorText } from "../auth/auth.style";
import {
  errorMessage,
  getProductDetail,
  productLoading,
  selectProduct,
} from "../../features/productsSlice";
import { addToCart } from "../../features/cartSlice";
import {
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from "../../features/favoritesSlice";
import { useEffect } from "react";
import { StyledRiseLoader } from "../products/products.style";

function ProductDetail() {
  const { productId } = useParams();

  const error = useSelector(errorMessage);
  const dispatch = useDispatch();
  const loading = useSelector(productLoading);
  const favorites = useSelector(selectFavorites);
  const thisProduct = useSelector(selectProduct);

  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, [productId, dispatch]);

  function addItemToCart(item) {
    dispatch(addToCart(item));
  }

  function addItemToFavorites(item) {
    if (!favorites.includes(item)) {
      dispatch(addToFavorites(item));
    } else {
      dispatch(removeFromFavorites(item._id));
    }
  }

  if (!thisProduct) return <h5>Product does not exist</h5>;

  const { image, title, category, rating, price, description } = thisProduct;

  return (
    <>
      {loading ? (
        <StyledRiseLoader />
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
                {rating?.rate} ({rating?.count})
              </span>
            </p>
            <ButtonContainer>
              <Button
                buttonType={BUTTON_TYPES.base}
                onClick={() => addItemToCart(thisProduct)}
              >
                Add to Cart
              </Button>
              <Button
                buttonType={BUTTON_TYPES.inverted}
                onClick={() => addItemToFavorites(thisProduct)}
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
