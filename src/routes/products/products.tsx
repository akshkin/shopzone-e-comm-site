import React, { useEffect } from "react";
import Product from "../../components/product/product.component";
import {
  Main,
  DesktopFilters,
  FilterWrapper,
  ProductsContainer,
  StyledLoader,
  FilterAndSort,
} from "./products.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";
import {
  selectShow,
  setShow
} from "../../features/productsSlice";
import Filters from "../../components/filters/filters.component";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence } from "framer-motion";
import { FiltersType } from "../../api";
import { useLoaderData, defer, Await, useSearchParams } from "react-router-dom";
import { DataType, getProducts } from "../../utils/utils";

export const defaultFilters = {
  sort: "rating_desc",
  category: [],
  rating: 3,
  price: 1000000,
};

export function loader() {
  const productsPromise = getProducts(defaultFilters);
  return defer({ productsData: productsPromise });
}

type LoaderDataType = {
  productsData: DataType;
};

function Products() {
  const { productsData } = useLoaderData() as LoaderDataType;
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShow);
  const [filteredProducts, setFilteredProducts] = useState<DataType>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<FiltersType>({ ...defaultFilters });

  const priceFilter = searchParams.get("price");
  const categoryFilter = searchParams.get("category");
  const sortFilter = searchParams.get("sortBy");
  const ratingFilter = searchParams.get("rating");

  useEffect(() => {
    async function listP(){
    const data = await getProducts({
      sort: sortFilter ? sortFilter : "",
      category: categoryFilter ? [categoryFilter] : [],
      price: priceFilter ? +priceFilter : 100000,
      rating: ratingFilter ? +ratingFilter : 3,
    });
    setFilteredProducts(data)

    }
    listP()
  }, [filters, categoryFilter, ratingFilter, sortFilter, priceFilter])

  
  function renderProducts(productsData: DataType) {
    const productElements = productsData.products.map(
      (product: ProductType) => (
        <Product
          key={product._id}
          product={product}
          searchParams={searchParams}
        />
      )
    );
    const filteredProductElements = filteredProducts?.products.map(
      (product) => (
        <Product
          key={product._id}
          product={product}
          searchParams={searchParams}
        />
      )
    );

    return (
      <Main>
        <FilterAndSort>
          Filter and Sort{" "}
          <Icon
            onClick={() => dispatch(setShow(true))}
            icon="system-uicons:filtering"
          />
        </FilterAndSort>
        <AnimatePresence>
          {show && (
            <FilterWrapper
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              show={show}
              transition={{ ease: "easeOut", duration: 0.5 }}
              onClick={() => setShow(false)}
            >
              <Filters
                setSearchParams={setSearchParams}
                searchParams={searchParams}
                filters={filters}
                setFilters={setFilters}
                categories={productsData.category}
                minPrice={productsData?.minPrice}
                maxPrice={productsData.maxPrice}
              />
            </FilterWrapper>
          )}
        </AnimatePresence>
        <DesktopFilters>
          <Filters
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            filters={filters}
            setFilters={setFilters}
            categories={productsData.category}
            minPrice={productsData?.minPrice}
            maxPrice={productsData.maxPrice}
          />
        </DesktopFilters>
        <p>
          Showing{" "}
          {filteredProducts?.totalProducts
            ? filteredProducts.totalProducts
            : productsData.totalProducts}{" "}
          {filteredProducts?.totalProducts === 1 || productsData.totalProducts === 1 ? "product" : "products"}
        </p>
        <ProductsContainer>
          {filteredProducts?.products.length 
            ? filteredProductElements
            : productElements}
        </ProductsContainer>
      </Main>
    );
  }

  return (
    <React.Suspense fallback={<StyledLoader />}>
      <Await resolve={productsData} children={renderProducts} />
    </React.Suspense>
  );
}

export default Products;
