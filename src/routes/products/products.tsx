import React from 'react';
import Product from "../../components/product/product.component";
import { Main, DesktopFilters, FilterWrapper, ProductsContainer, StyledLoader, FilterAndSort } from "./products.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";
import { selectFilteredProducts, selectShow, setShow, selectTotalProducts } from "../../features/productsSlice";
import Filters from "../../components/filters/filters.component";
import { useState } from "react";
import { Icon } from '@iconify/react';
import { AnimatePresence } from "framer-motion";
import { FiltersType } from "../../api";
import { useLoaderData, defer, Await } from "react-router-dom";
import { DataType, getProducts } from "../../utils/utils";

export const defaultFilters = {
  sort: {
    rating: "rating_desc",
    price: ""
  },
  category: [],
  rating: 3,
  price: 1000000
}

export function loader(){
  const productsPromise = getProducts(defaultFilters)
  return defer({productsData: productsPromise}) 
}

type LoaderDataType = {
  productsData: DataType
}

function Products() {
  const { productsData } = useLoaderData() as LoaderDataType
  const dispatch = useAppDispatch()
  const filteredProducts = useAppSelector(selectFilteredProducts)
  const totalProducts = useAppSelector(selectTotalProducts)
  const show = useAppSelector(selectShow)

  const [filters, setFilters] = useState<FiltersType>({...defaultFilters})

  function renderProducts(productsData: DataType){

    const productElements = productsData.products.map((product: ProductType) => 
      <Product key={product._id} product={product} />
    );
    const filteredProductElements = filteredProducts.map(product => <Product key={product._id} product={product} />)
      return (
        <Main>
          <FilterAndSort>Filter and Sort <Icon onClick={() => dispatch(setShow(true))} icon="system-uicons:filtering" /></FilterAndSort>
          <AnimatePresence> 
            {show && 
              <FilterWrapper initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              show={show}
              transition={{ ease: "easeOut", duration: 0.5 }}>
                <Filters filters={filters} setFilters={setFilters} categories={productsData.category}/>
              </FilterWrapper>
            }
          </AnimatePresence>
          <DesktopFilters>
            <Filters filters={filters} setFilters={setFilters} categories={productsData.category}/>
          </DesktopFilters>
          <p>Showing {totalProducts ? totalProducts : productsData.totalProducts} {productsData.totalProducts === 1 ? "product" : "products"}</p>
          <ProductsContainer>
            {filteredProducts.length > 0 ? filteredProductElements : productElements}
          </ProductsContainer>
        </Main>
      )
  }
  
    
  return (
    <React.Suspense fallback={<StyledLoader />}>
      <Await resolve={productsData} children={renderProducts} />    
    </React.Suspense>    
  );
}

export default Products;
