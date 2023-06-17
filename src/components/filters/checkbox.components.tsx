import { ChangeEvent } from "react";
import { FiltersType } from "../../api";
import { StyledCheckbox } from "./filters.styles";

type CheckboxProps = {
  filter: string;
  onFilterChange: (event: ChangeEvent<HTMLInputElement>) => void;
  filters: FiltersType;
  extraProp?: boolean;
  index: number;
  searchParams: URLSearchParams;
};

function Checkbox({
  filter,
  onFilterChange,
  filters,
  extraProp,
  index,
  searchParams,
}: CheckboxProps) {
  return (
    <StyledCheckbox>
      <input
        id={filter}
        type="checkbox"
        name={filter}
        value={filter}
        checked={
          searchParams.get("category")
            ? searchParams.get("category")?.split(",").includes(filter)
            : filters.category?.includes(filter)
        }
        onChange={onFilterChange}
      />
      <label htmlFor={filter} key={index}>
        {filter} {extraProp && "star"}
      </label>
    </StyledCheckbox>
  );
}

export default Checkbox;
