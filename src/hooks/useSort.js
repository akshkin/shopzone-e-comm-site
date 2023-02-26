import { useSelector } from "react-redux";
import { getSortBy } from "../features/productsSlice";

export default function useSort() {
  const sortBy = useSelector(getSortBy);
  function sortProducts(array) {
    if (sortBy === "rising") {
      return array.sort(
        (productA, productB) => productA.price - productB.price
      );
    } else if (sortBy === "falling") {
      return array.sort(
        (productA, productB) => productB.price - productA.price
      );
    } else if (sortBy === "rating") {
      return array.sort(
        (productA, productB) => productB.rating.rate - productA.rating.rate
      );
    }
  }
  return sortProducts;
}
