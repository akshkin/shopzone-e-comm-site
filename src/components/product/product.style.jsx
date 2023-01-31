import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  button {
    flex-grow: 1;
  }
`;

export const ProductContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 250px;
  gap: 0.25em;
  margin: 0 auto;
  text-align: left;
  border: 1px solid lightgray;
  border-radius: 5px;

  @media (min-width: 800px) {
    width: 300px;
  }
`;

export const ProductTitle = styled.h3`
  font-size: 1rem;
  font-weight: 300;
  margin: 1em;
`;
export const Image = styled.img`
  width: 100%;
  max-width: 300px;
  object-fit: cover;
  margin: 0 auto;
`;
export const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: normal;
  margin: 0 1em 1em;
`;
