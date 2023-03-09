import Product from "../../components/product/product.component";
import { Main, DesktopFilters, FilterWrapper, ProductsContainer, StyledLoader, FilterAndSort } from "./products.style";
import { ErrorText } from "../auth/auth.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { ProductType } from "../../constants.types";
import { productLoading, selectProducts, errorMessage, selectShow, setShow, selectTotalProducts, listProducts } from "../../features/productsSlice";
import Filters from "../../components/filters/filters.component";
import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { AnimatePresence } from "framer-motion";
import { FiltersType } from "../../api";

export const defaultFilters = {
  sort: {
    rating: "rating_desc",
    price: ""
  },
  category: [],
  rating: 3,
  price: 1000000
}

function Products() {
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(productLoading)
  const error = useAppSelector(errorMessage)
  const totalProducts = useAppSelector(selectTotalProducts)

  const dispatch = useAppDispatch()

  const show = useAppSelector(selectShow)

  const [filters, setFilters] = useState<FiltersType>({...defaultFilters})

  useEffect(() => {
    dispatch(listProducts(filters))
  }, [])

    
  const productElements = products.map((product: ProductType) => (
    <Product key={product._id} product={product} />
  ));
  
    
  return (
    <>
      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <Main>
          <FilterAndSort>Filter and Sort <Icon onClick={() => dispatch(setShow(true))} icon="system-uicons:filtering" /></FilterAndSort>
          <AnimatePresence> 
            {show && 
              <FilterWrapper initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              show={show}
              transition={{ ease: "easeOut", duration: 0.5 }}>
                <Filters filters={filters} setFilters={setFilters} />
              </FilterWrapper>
            }
          </AnimatePresence>
          <DesktopFilters>
            <Filters filters={filters} setFilters={setFilters} />
          </DesktopFilters>
          { loading ? <StyledLoader /> : (<p>Showing {totalProducts} {totalProducts === 1 ? "product" : "products"}</p>)}
          <ProductsContainer>
            {productElements}
          </ProductsContainer>
        </Main>
      )}
    </>
  );
}

export default Products;
