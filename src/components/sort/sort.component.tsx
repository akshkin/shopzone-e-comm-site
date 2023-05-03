import { ChangeEvent } from "react";
import { SortContainer, Label, Select } from "./sort.styles";
import { FiltersType } from "../../api";

const options = [
  {
    value: "",
    name: "sort",
    label: "Select option",
  },
  {
    value: "price_desc",
    name: "sort",
    label: "Price falling",
  },
  {
    value: "price_asc",
    name: "sort",
    label: "Price rising",
  },
  {
    value: "rating_asc",
    name: "sort",
    label: "Rating ascending",
  },
  {
    value: "rating_desc",
    name: "sort",
    label: "Rating falling",
  },
];

type SortProps = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  updateSearchParams: (key: string, value: string | null) => void;
};

function Sort({ filters, setFilters, updateSearchParams }: SortProps) {
  function sortBy(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    // setFilters({...filters, sort : {...filters.sort, rating: value.includes("rating") ? value : "", price: value.includes("price") ? value: ""}});
    // updateSearchParams("sortBy", value)
    setFilters({ ...filters, sort: value });
    updateSearchParams("sortBy", value);
  }

  return (
    <SortContainer>
      <Label>Sort by</Label>
      <Select name="sort" value={filters.sort} onChange={sortBy}>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </SortContainer>
  );
}

export default Sort;
