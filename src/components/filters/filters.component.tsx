import React, { ChangeEvent } from "react";
import { listProducts, setShow } from "../../features/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import {
  FilterContainer,
  Section,
  StyledIcon,
  RadioButtons
} from "./filters.styles";
import Checkbox from "./checkbox.components";
import { FiltersType } from "../../api";
import Sort from "../sort/sort.component";
import Button, { BUTTON_TYPES } from "../button/button.component";
import { defaultFilters } from "../../routes/products/products";
import { RootState } from "../../store";

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
  {
    id: "5 star",
    name: "rating",
    value: "5 star",
  }
]


type FiltersProp = {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
  categories : string[]
}


function Filters({ filters, setFilters, categories }: FiltersProp) {
  const dispatch = useAppDispatch();
  const maxPrice = useAppSelector((state: RootState) => state.allProducts.maxPrice);
  const minPrice = useAppSelector((state: RootState) => state.allProducts.minPrice);
   
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { type, checked, value, name } = event.target;
    if (type === "range") setFilters({...filters, price: +value}); 
    if (type === "radio") setFilters({...filters, rating: +value.slice(0,1)})
    if (type === "checkbox") {
      if (checked){  
        setFilters({...filters, category: [...filters.category, name]});
   
      } else {
        setFilters({...filters, category: filters.category.filter(item => item !== name)})
      }
    }
      
  };
  
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch(listProducts(filters))
    dispatch(setShow(false));
  };

  const closeFilter = () => {
    dispatch(setShow(false));
  };

  const clearFilters = ( ) => {
    setFilters(defaultFilters)
    dispatch(listProducts(defaultFilters))
    dispatch(setShow(false))
  }

  return (
    <FilterContainer>
     <form onSubmit={handleSubmit}>
        <Sort filters={filters} setFilters={setFilters} />
        <span>
          <StyledIcon onClick={closeFilter} icon="carbon:close" />
        </span>
        <h3>Filters</h3>
        <div>
          <h5>Price</h5>
          <span>{minPrice}</span>
          <input
            type="range"
            max={maxPrice}
            min={minPrice}
            defaultValue={filters.price}
            onChange={handleChange}
            name="price"
          />
          <span>SEK {maxPrice}</span>
        </div>
        <Section>
          <h5>Category</h5>
          {categories.map((category, index) => (
            <Checkbox filter={category} onFilterChange={handleChange} filters={filters} index={index}/>
          ))}
        </Section>
        <Section>
          <h5>Rating (greater than)</h5>
          { ratingStar.map((rating, index) => 
            <RadioButtons>
              <input 
                id={rating.id} 
                key={rating.id}
                type="radio" 
                name="rating" 
                checked={filters.rating === +rating.value.slice(0,1)} 
                value={+rating.value.slice(0, 1)} 
                onChange={handleChange} />
              <label key={index} htmlFor={rating.id}>
                {rating.value}
              </label>
            </RadioButtons>
          )}
        </Section>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <Button type="button" buttonType={BUTTON_TYPES.inverted} onClick={clearFilters}>Clear Filters</Button>
      </form>
    </FilterContainer>
  );
}

export default Filters;
