import styled from "styled-components";
import { Icon } from "@iconify/react";

export const FilterContainer = styled.div`
  text-align: left;
  width: 70vw;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 1em;
  z-index: 100;
  background-color: white;
  h3 {
    font-size: 110%;
  }

  @media (min-width: 900px) {
    width: 400px;
    max-width: 100%;
    position: static;
  }
`;

export const RadioButtons = styled.div`
  display: flex;
  padding-block: 0.2em;

  label {
    cursor: pointer;
  }
`;

export const StyledIcon = styled(Icon)`
  font-size: 2rem;
  position: absolute;
  right: 2px;
  top: 0.75em;
  cursor: pointer;

  @media (min-width: 900px) {
    display: none;
  }
`;

export const Section = styled.div`
  margin-bottom: 1em;

  h5 {
    margin-bottom: 1em;
    padding-bottom: 0.4em;
    border-bottom: 1px solid #ccc;
  }
`;

export const StyledCheckbox = styled.div`
  display: block;

  label {
    cursor: pointer;
  }
`;
