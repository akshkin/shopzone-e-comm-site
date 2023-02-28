import styled from "styled-components";
import { Icon } from "@iconify/react";

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  margin: 1em auto;
  gap: 2em;

  @media (min-width: 700px) {
    max-width: 800px;
    flex-direction: row;
    justify-content: center;
  }
`;

export const PlaceOrder = styled.div`
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid lightgray;
  padding: 1.5em 2em;

  h4 {
    margin-top: 0;
  }

  button {
    width: 100%;
  }

  @media (min-width: 700px) {
    align-self: flex-start;
  }
`;

export const CartItemsContainer = styled.div`
  align-self: center;
`;

export const EmptyCart = styled(Icon)`
  font-size: 18rem;

  @media (min-width: 600px) {
    font-size: 25rem;
  }
`;
