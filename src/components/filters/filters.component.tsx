import React, { ChangeEvent, useCallback } from "react";
import { setShow } from "../../features/productsSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  FilterContainer,
  Section,
  StyledIcon,
  RadioButtons,
} from "./filters.styles";
import Checkbox from "./checkbox.components";
import { FiltersType } from "../../api";
import Sort from "../sort/sort.component";
import Button, { BUTTON_TYPES } from "../button/button.component";
import { defaultFilters } from "../../routes/products/products";
import { getProducts } from "../../utils/utils";

const ratingStar = [
  {
    id: "1 star",
    name: "rating",
    value: "1 star",
  },
  {
    id: "2 star",
    name: "rating",
    value: "2 star",
  },
  {
    id: "3 star",
    name: "rating",
    value: "3 star",
  },
  {
    id: "4 star",
    name: "rating",
    value: "4 star",
  },
];

type setSearchParamsType = (
  params: URLSearchParams | string | ((prevParams: URLSearchParams) => string)
) => void;

type FiltersProp = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  categories: string[];
  searchParams: URLSearchParams;
  setSearchParams: setSearchParamsType;
  minPrice: number;
  maxPrice: number;
};

function Filters({
  filters,
  setFilters,
  categories,
  searchParams,
  setSearchParams,
  maxPrice,
  minPrice,
}: FiltersProp) {
  const dispatch = useAppDispatch();

  const searchFilters = searchParams.toString();

  const updateSearchParams = useCallback(
    (key: string, value: string | null) => {
      setSearchParams((prevParams: URLSearchParams) => {
        const newParams = new URLSearchParams(prevParams);

        if (value === null) {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }

        return newParams.toString();
      });
    },
    [setSearchParams]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { type, checked, value, name } = event.target;
    let categoriesParams = searchParams.get("category")?.split(",") ?? [];

    if (type === "range") {
      setFilters({ ...filters, price: +value });
      updateSearchParams("price", value);
    }
    if (type === "radio") {
      setFilters({ ...filters, rating: +value.slice(0, 1) });
      updateSearchParams("rating", value.slice(0, 1));
    }
    if (type === "checkbox") {
      if (checked) {
        categoriesParams.push(name);
        setFilters({ ...filters, category: [...filters.category!, name] });
        updateSearchParams("category", categoriesParams.join(","));
      } else {
        setFilters({
          ...filters,
          category: filters.category!.filter((item) => item !== name),
        });
        categoriesParams = categoriesParams.filter(
          (category) => category !== name
        );
        updateSearchParams(
          "category",
          categoriesParams.length > 0 ? categoriesParams.join(",") : null
        );
      }
    }
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await getProducts(filters);
    dispatch(setShow(false));
  }

  const closeFilter = () => {
    dispatch(setShow(false));
  };

  const clearFilters = async () => {
    setFilters(defaultFilters);
    setSearchParams("");
    await getProducts(defaultFilters);
    dispatch(setShow(false));
  };

  return (
    <FilterContainer>
      <form onSubmit={handleSubmit}>
        <Sort
          filters={filters}
          setFilters={setFilters}
          updateSearchParams={updateSearchParams}
        />
        <span>
          <StyledIcon onClick={closeFilter} icon="carbon:close" />
        </span>
        <h3>Filters</h3>
        <div>
          <h5>Price (SEK {searchParams.get("price")})</h5>
          <span>SEK {minPrice}</span>
          <input
            type="range"
            max={maxPrice}
            min={minPrice}
            defaultValue={searchParams.get("price") || filters.price}
            onChange={handleChange}
            name="price"
          />
          <span>SEK {maxPrice}</span>
        </div>
        <Section>
          <h5>Category</h5>
          {categories.map((category, index) => (
            <Checkbox
              filter={category}
              key={`category-${category}`}
              onFilterChange={handleChange}
              filters={filters}
              index={index}
              searchParams={searchParams}
            />
          ))}
        </Section>
        <Section>
          <h5>Rating (greater than)</h5>
          {ratingStar.map((rating, index) => (
            <RadioButtons>
              <input
                id={rating.id}
                key={`rating-${rating.id}`}
                type="radio"
                name="rating"
                checked={
                  searchParams
                    .get("rating")
                    ?.includes(rating.value.slice(0, 1)) ||
                  filters.rating === +rating.value.slice(0, 1)
                }
                value={+rating.value.slice(0, 1)}
                onChange={handleChange}
              />
              <label key={index} htmlFor={rating.id}>
                {rating.value}
              </label>
            </RadioButtons>
          ))}
        </Section>
        <Button type="submit" onClick={handleSubmit}>
          Apply
        </Button>
        <Button
          disabled={searchFilters === ""}
          type="button"
          buttonType={BUTTON_TYPES.inverted}
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </form>
    </FilterContainer>
  );
}

export default Filters;
