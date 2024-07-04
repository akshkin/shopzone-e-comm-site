import { Suspense, useEffect } from "react";
import {
  Await,
  defer,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from "react-router-dom";
import Product from "../../components/product/product.component";
import { ProductType } from "../../constants.types";
import {
  productLoading,
  selectFilteredProducts,
} from "../../features/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { getProductsBySearch } from "../../utils/utils";
import { ProductsContainer, StyledLoader } from "../products/products.style";
import { SearchTitle } from "./searchPage.styles";
import SkeletonComponent from "../../components/skeletonLoading/skeleton.component";

export function loader({ params }: LoaderFunctionArgs) {
  const dataPromise = params.query ? getProductsBySearch(params.query) : null;
  return defer({ filteredProducts: dataPromise });
}

type SearchParams = {
  query: string;
};

type LoaderDataType = {
  filteredProducts: ProductType[];
};

function SearchPage() {
  const { filteredProducts } = useLoaderData() as LoaderDataType;
  const { query } = useParams<keyof SearchParams>() as SearchParams;
  const dispatch = useAppDispatch();
  const loading = useAppSelector(productLoading);

  function renderFilteredProducts(filteredProducts: ProductType[]) {
    return (
      <>
        <SearchTitle>
          Showing results for <span>{query}</span>
        </SearchTitle>
        <ProductsContainer>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <p>No results found. Please try another search!</p>
          )}
        </ProductsContainer>
      </>
    );
  }

  return (
    <>
      <Suspense fallback={<SkeletonComponent />}>
        <Await resolve={filteredProducts} children={renderFilteredProducts} />
      </Suspense>
    </>
  );
}

export default SearchPage;
