import styled from "styled-components"

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  margin: 1em auto;
  gap: 2em;

  .place-order{
    max-width: 80%;
    margin-left: 2em;
    border: 1px solid lightgray;   
    padding: 1.5em 2em;

    button{
      width: 100%;
    }
    
}

  @media (min-width: 700px) {
    max-width: 800px;
    flex-direction: row;
    justify-content: center;

    .place-order{
       align-self: flex-start;
   }
  }
`

export const CartItemsContainer = styled.div`
    align-self: center;
    
`