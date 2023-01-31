import { useContext } from "react";
import { useParams, Outlet } from "react-router-dom";
import { Context } from "../../context/context";
import { Icon } from "@iconify/react";
import Button, { BUTTON_TYPES } from "../../components/button/button.component";
import { MainProductContainer, ButtonContainer } from "./product-details.style";

function ProductDetail() {
  const { productId } = useParams();
  const { allProducts, addToFavorites, addToCart } = useContext(Context);
  const thisProduct = allProducts.find((product) => product._id === productId);
  console.log(thisProduct);
  if (!thisProduct) return <></>;
  const { image, title, category, rating, price, description } = thisProduct;
  return (
    <>
      <Outlet />
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
              onClick={() => addToCart(thisProduct)}
            >
              Add to Cart
            </Button>
            <Button
              buttonType={BUTTON_TYPES.inverted}
              onClick={() => addToFavorites(thisProduct)}
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

export default ProductDetail;
