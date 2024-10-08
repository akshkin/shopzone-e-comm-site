import React, { useEffect } from "react";
import {
  useParams,
  Outlet,
  LoaderFunctionArgs,
  defer,
  Await,
  useLoaderData,
} from "react-router-dom";
import Product from "../../components/product/product.component";
import { ProductsContainer } from "../products/products.style";
import { getProductsByCategory } from "../../utils/utils";
import { ProductType } from "../../constants.types";
import SkeletonComponent from "../../components/skeletonLoading/skeleton.component";

type CategoryParams = {
  category: string;
};

export function loader({ params }: LoaderFunctionArgs) {
  const productsPromise = params.category
    ? getProductsByCategory(params.category)
    : null;
  return defer({ categoryProducts: productsPromise });
}

type LoaderDataType = {
  categoryProducts: CategoryProducts;
};

type CategoryProducts = {
  products: ProductType[];
  totalProducts: number;
};

function Category() {
  const { categoryProducts } = useLoaderData() as LoaderDataType;
  const { category } = useParams<keyof CategoryParams>() as CategoryParams;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  function renderProducts(categoryProducts: CategoryProducts) {
    return (
      <>
        <h4>Showing {categoryProducts.totalProducts} products</h4>
        <ProductsContainer
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          {categoryProducts.products.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
        </ProductsContainer>
        <Outlet />
      </>
    );
  }

  return (
    <>
      <h2>{category?.toUpperCase()}</h2>
      <React.Suspense fallback={<SkeletonComponent />}>
        <Await resolve={categoryProducts} children={renderProducts} />
      </React.Suspense>
    </>
  );
}

export default Category;
