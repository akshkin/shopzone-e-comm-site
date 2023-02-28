import { ProductType } from "../constants.types";
import { getSortBy } from "../features/productsSlice";
import { useAppSelector } from "./useAppDispatch";

export default function useSort() {
  const sortBy = useAppSelector(getSortBy)

  function sortProducts(array: ProductType[]) {
    if (sortBy === "falling") {
      return array.sort(
        (productA, productB) => productB.price - productA.price
      );
    } else if (sortBy === "rising") {
      return array.sort(
        (productA, productB) => productA.price - productB.price
      );
    } else if (sortBy === "rating") {
      return array.sort(
        (productA, productB) => productB.rating.rate - productA.rating.rate
      );
      
    } else if (sortBy === "most popular"){
      return array.sort((productB, productA) => productB.rating.count - productA.rating.count)
    }
  }
  return sortProducts;
}
