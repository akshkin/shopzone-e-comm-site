import styled from "styled-components"

export const ProductsContainer = styled.div`
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  justify-content: center;
  grid-gap: 1em;
`