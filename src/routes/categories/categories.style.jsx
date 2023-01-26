import styled from "styled-components";

export const CategoryContainer = styled.div`
  padding: 1em;
  margin: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 250px));
  grid-auto-rows: 1fr;
  justify-content: center;
  align-items: center;
  grid-gap: 2em;
`;
