import styled from "styled-components"

export const ButtonContainer = styled.div`
  display: none;
`

export const ProductContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 220px;
  padding: 1em;
  gap: 0.25em;
  margin: 0 auto;
  text-align: left;
  border: 1px solid lightgray;
  border-radius: 5px;
      
    &:hover{
      ${ButtonContainer}{
        width: 100%;
        position: absolute;
        top: 70%;
        left: 6%;
        display: flex;
      }
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    }    
`

export const ProductTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 0;
  font-weight: 300;
`
export const Image = styled.img`
  max-width: 200px;
  height: 250px;
  object-fit: cover;
  margin: 0 auto; 
  padding: 1em;
`
export const ProductPrice = styled.p`
  font-size: 0.875rem;
  font-weight: normal;
  margin: 0;
`
