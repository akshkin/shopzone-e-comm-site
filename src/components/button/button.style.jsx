import styled from "styled-components";

export const BaseButton = styled.button`
  color: white;
  background-color: #006d77;
  padding: 0.5em 1.5em;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover,
  &:focus {
    filter: brightness(110%);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

export const InvertedButton = styled(BaseButton)`
  color: #252525;
  background-color: #ffffff;
  border: 1px solid #252525;
`;
