import styled from "styled-components";

export const StyledHero = styled.div`
  width: 100%;
  height: 70vh;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;
export const Heading = styled.h1`
  padding: 1em;
  position: absolute;
  bottom: 5%;
  left: 20;
  font-size: 2rem;
  color: white;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

  @media (min-width: 800px) {
    font-size: 2.5rem;
  }
`;
