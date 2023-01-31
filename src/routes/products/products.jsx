import { useContext } from "react";
import { Context } from "../../context/context";
import Product from "../../components/product/product.component";
import { ProductsContainer } from "./products.style";
import Sort from "../../components/sort/sort.component";

function Products() {
  const { allProducts, sortProducts } = useContext(Context);
  const productElements = allProducts.map((product) => (
    <Product key={product._id} product={product} />
  ));

  sortProducts(allProducts);

  return (
    <>
      <Sort />
      <ProductsContainer className="products">
        {productElements}
      </ProductsContainer>
    </>
  );
}

export default Products;
