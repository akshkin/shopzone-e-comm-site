import Product from "../../components/product/product.component";
import { ProductsContainer, StyledRiseLoader } from "./products.style";
import Sort from "../../components/sort/sort.component";
import { useSelector } from "react-redux";
import { ErrorText } from "../auth/auth.style";
import useSort from "../../hooks/useSort";

function Products() {
  const allProducts = useSelector((state) => state.allProducts);
  const { loading, products, error, sortBy } = allProducts;
  const sortProducts = useSort(sortBy, products);

  const productElements = products?.map((product) => (
    <Product key={product._id} product={product} />
  ));

  sortProducts(products);

  return (
    <>
      {loading ? (
        <StyledRiseLoader />
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <>
          <Sort />
          <ProductsContainer className="products">
            {productElements}
          </ProductsContainer>
        </>
      )}
    </>
  );
}

export default Products;
