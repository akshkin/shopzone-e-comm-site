import styled from "styled-components";
import { Icon } from "@iconify/react";

export const StyledIcon = styled(Icon)`
  font-size: 1.3em;
  display: ${({ display }) => display};
  cursor: pointer;
  margin-top: ${({ margintop }) => margintop};
`;
export const CartItemContainer = styled.div`
  padding: 1em;
  text-align: left;
  max-width: 700px;
  border: 1px solid lightgray;

  h3 {
    font-size: 1rem;
    text-align: left;
    max-width: 200px;
  }

  img {
    height: 150px;
    object-fit: cover;
  }

  @media (min-width: 500px) {
    display: flex;
    gap: 1em;
    align-items: center;
  }
`;
export const CartItemInfo = styled.div`
  justify-content: flex-start;

  h3,
  h4 {
    margin-top: 0;
  }
`;

export const Quantity = styled.span`
  display: inline-block;
  font-size: 1.25rem;
  padding-inline: 1em;
`;
export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;
