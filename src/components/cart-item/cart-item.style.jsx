import styled from "styled-components"
import {Icon} from "@iconify/react"

export const StyledIcon = styled(Icon)`
    font-size: 1.3em;
    display: ${({display}) => display};
    cursor: pointer; 
    /* margin: auto;    */
    margin-top: ${({marginTop}) => marginTop};

`
export const CartItemContainer = styled.div`
  padding: 1em;
  text-align: left;
  max-width: 700px;
  border: 1px solid lightgray;

  h3{
    font-size: 1rem;
    text-align: left;
    max-width: 200px;
  }

  img{
    height: 150px;
  }

  @media(min-width: 500px){
    display: flex;
    align-items: center;
  }
`
export const CartItemInfo = styled.div`
  /* @media(min-width: 700px){
    display: flex;
    align-items: center;
    gap: 1.2em;
    width: 550px;
  } */
  justify-content: flex-start;
`

export const Quantity = styled.span`   
  display: inline-block;
  font-size: 1.25rem;
  padding-inline: 1em;
`
export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`
