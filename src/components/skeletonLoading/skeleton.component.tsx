import React from "react";
import ProductSkeleton from "../product/product.skeleton";
import { ProductsContainer } from "../../routes/products/products.style";
import { SkeletonSubtitle, SkeletonTitle } from "./skeleton.style";

function SkeletonComponent() {
  return (
    <>
      <SkeletonTitle />
      <SkeletonSubtitle />
      <ProductsContainer>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <ProductSkeleton key={item} />
        ))}
      </ProductsContainer>
    </>
  );
}

export default SkeletonComponent;
