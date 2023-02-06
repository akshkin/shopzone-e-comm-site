import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledOrder = styled.div`
  padding: 1em;
  margin: 0 auto;
  max-width: 700px;
`;

export const OrderItemTotal = styled.h4`
  text-align: right;
`;

export const StyledLink = styled(Link)`
  display: block;
  background-color: coral;
  color: white;
  padding: 0.5em 1.5em;
  transition: background 0.2s;
  margin: 1em auto 2em;

  &:hover,
  &:focus {
    background-color: white;
    border: 1px solid coral;
    color: #252525;
  }
`;