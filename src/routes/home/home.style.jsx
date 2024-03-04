import styled from "styled-components";

export const BackgroundImage = styled.div`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  width: 100%;
  height: 100%;
`;

export const Body = styled.div`
  border: 1px solid #252525;
  background-color: white;
  padding: 0.5em;

  &:hover {
    filter: brightness(80%);
    cursor: pointer;
  }

  & h2 {
    margin-top: 0;
  }

  @media (min-width: 500px) {
    padding: 2em;
  }
`;

export const CategoryItemContainer = styled.div`
  height: 400px;
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  transform: scale(1);
  overflow: hidden;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;

`;

export const CategoriesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 900px) {
    ${CategoryItemContainer} {
      height: 500px;
      width: 33%;
    }
  }
`;
