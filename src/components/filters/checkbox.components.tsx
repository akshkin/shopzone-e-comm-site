import { ChangeEvent } from 'react';
import { FiltersType } from '../../api';
import { StyledCheckbox } from './filters.styles'

type CheckboxProps = {
  filter: string;
  onFilterChange: (event: ChangeEvent<HTMLInputElement>) => void;
  filters: FiltersType;
  extraProp?: boolean;
  index: number

}

function Checkbox({ filter, onFilterChange, filters, extraProp, index }: CheckboxProps) {
  return (
    <StyledCheckbox>
      <input
        id={filter}
        key={filter}
        type="checkbox"
        name={filter}
        value={filter}
        checked={filters.category.includes(filter)}
        onChange={
          onFilterChange
        }
      />
      <label htmlFor={filter} key={index}>
        {filter} {extraProp && "star"}
      </label>
    </StyledCheckbox>
  )
}

export default Checkbox