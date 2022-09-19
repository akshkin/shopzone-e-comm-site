import styled from "styled-components"

export const BaseButton = styled.button`
  color: white;
  background-color: #252525;
  padding: 0.5em 1.5em;
  font-family: inherit;
  font-size: 1rem;
  cursor: pointer;

  &:hover{
    opacity: 0.8;
  }
`

export const InvertedButton = styled(BaseButton)`
  color: #252525;
  background-color: white;
  border: 2px solid gray;

  &:hover{
    border: 1px solid darkgray;
  }
`