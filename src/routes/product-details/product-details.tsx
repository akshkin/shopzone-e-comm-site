import React, { useEffect } from "react";
import {
  useLoaderData,
  useParams,
  LoaderFunctionArgs,
  Await,
  defer,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Icon } from "@iconify/react";
import Button, { BUTTON_TYPES } from "../../components/button/button.component";
import {
  MainProductContainer,
  ButtonContainer,
  BackButton,
} from "./product-details.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";
import { addProductToCart, addToCartUnlogged } from "../../features/cartSlice";
import {
  addProductToFavorites,
  selectFavorites,
} from "../../features/favoritesSlice";
import { getProductDetails } from "../../utils/utils";
import {} from "react-router-dom";
import { StyledLoader } from "../products/products.style";
import { Link } from "react-router-dom";
import { getUser } from "../../features/userSlice";

type ProductParams = {
  productId: string;
};

type LoaderDataType = {
  product: ProductType;
};

export function loader({ params }: LoaderFunctionArgs) {
  const productPromise = params.productId
    ? getProductDetails(params.productId)
    : null;
  return defer({ product: productPromise });
}

function ProductDetail() {
  const { product } = useLoaderData() as LoaderDataType;
  const location = useLocation();
  // const { productId } = useParams<keyof ProductParams>() as ProductParams;
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const navigate = useNavigate();

  const search = location.state?.search;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function addItemToCart(item: ProductType) {
    user
      ? dispatch(addProductToCart({ cartItem: item }))
      : dispatch(addToCartUnlogged(item));
  }

  function renderProduct(product: ProductType) {
    const { image, title, category, rating, price, description } = product;

    function addItemToFavorites() {
      if (user) {
        return dispatch(addProductToFavorites({ item: product }));
      } else {
        navigate("/auth", { state: { message: "You must login first" } });
      }
    }

    return (
      <>
        {search ? (
          <Link to={`..${search}`} relative="path">
            <p style={{ textAlign: "left", padding: "1em" }}>
              &larr; Back to products
            </p>
          </Link>
        ) : (
          <BackButton onClick={() => navigate(-1)}>&larr; Go Back</BackButton>
        )}
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
      </>
    );
  }

  return (
    <React.Suspense fallback={<StyledLoader />}>
      <Await resolve={product} children={renderProduct} />
    </React.Suspense>
  );
}

export default ProductDetail;
