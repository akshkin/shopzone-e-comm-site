import styled from "styled-components";

export const BaseButton = styled.button`
  color: white;
  background-color: #006d77;
  padding: 0.5em 1.5em;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    opacity: 0.8;
  }
`;

export const InvertedButton = styled(BaseButton)`
  color: #252525;
  background-color: #83c5be;
`;
