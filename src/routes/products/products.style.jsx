import styled from "styled-components";
import RiseLoader from "react-spinners/RiseLoader";

export const ProductsContainer = styled.div`
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
  grid-gap: 1em;
`;

export const StyledRiseLoader = styled(RiseLoader)`
  margin-block: 1em;
  color: #006d77;
`;
