import React from "react";
import { SortContainer, Label, Select } from "./sort.styles";
import { useDispatch } from "react-redux";
import { setSortBy } from "../../store/product/product.actions";

function Sort() {
  const dispatch = useDispatch();

  function sort(event) {
    dispatch(setSortBy(event.target.value));
  }

  return (
    <SortContainer>
      <Label>Sort by</Label>
      <Select name="Price" onChange={sort}>
        <option value="falling">Price falling</option>
        <option value="rising">Price rising</option>
        <option value="rating">Rating</option>
      </Select>
    </SortContainer>
  );
}

export default Sort;
