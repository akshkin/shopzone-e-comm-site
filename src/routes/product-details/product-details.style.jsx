import styled from "styled-components";

export const MainProductContainer = styled.div`
  padding: 1em;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;

  img {
    width: 300px;
  }

  @media (min-width: 750px) {
    flex-direction: row;
    gap: 1em;
    max-width: 1000px;
    margin: 0 auto;

    img {
      width: 300px;
      height: auto;
    }
  }
  @media (min-width: 850px) {
    img {
      width: 400px;
      height: auto;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75em;

  @media (min-width: 600px) {
    flex-direction: row;
    align-items: flex-start;

    button {
      width: 200px;
    }
  }
`;
