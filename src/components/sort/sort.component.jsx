import React, { useContext } from "react";
import { SortContainer, Label, Select } from "./sort.styles";
import { Context } from "../../context/context";

function Sort() {
  const { setSortBy } = useContext(Context);

  return (
    <SortContainer>
      <Label>Sort by</Label>
      <Select name="Price" onChange={(event) => setSortBy(event.target.value)}>
        <option value="falling">Price falling</option>
        <option value="rising">Price rising</option>
        <option value="rating">Rating</option>
      </Select>
    </SortContainer>
  );
}

export default Sort;
