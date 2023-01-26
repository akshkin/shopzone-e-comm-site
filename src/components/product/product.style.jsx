import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const ProductContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 1em;
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
`;
export const Image = styled.img`
  max-width: 200px;
  height: 250px;
  object-fit: cover;
  margin: 0 auto;
  padding: 1em;
`;
export const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: normal;
  margin-top: 0;
`;
