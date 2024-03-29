import styled from "styled-components";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  button {
    flex-grow: 1;
  }
`;

export const ProductContainer = styled(motion.div)`
  position: relative;
  display: grid;
  grid-template-areas:
    "image image"
    "title rating"
    "price icon";
  min-width: 120px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: left;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding-bottom: 0.5em;

  @media (min-width: 800px) {
    width: 300px;
  }
`;

export const Rating = styled.span`
  grid-area: rating;
  margin-right: 0.5em;
  margin-top: 0.6em;
  display: flex;
  align-items: center;
  justify-self: end;
  align-self: flex-start;
  gap: 0.2em;
`;

export const ProductTitle = styled.h3`
  grid-area: title;
  font-size: 1rem;
  font-weight: 300;
  margin: 0.6em;
  margin-bottom: 0.5em;
`;
export const Image = styled.img`
  grid-area: image;
  max-width: 100%;
  height: 150px;
  object-fit: cover;
  margin: 0 auto;
  overflow: hidden;

  @media (min-width: 800px) {
    height: 225px;
    width: 300px;
  }
`;

export const ProductPrice = styled.p`
  grid-area: price;
  font-size: 1rem;
  font-weight: normal;
  margin: 0 0.5em 0.5em;
`;

export const StyledHeartIcon = styled(Icon)`
  position: absolute;
  top: 7px;
  right: 7px;
  z-index: 10;
  background-color: white;
  padding: 0.1em;
  font-size: 2rem;
  border-radius: 50%;
  cursor: pointer;
`;

export const StyledCartIcon = styled(Icon)`
  grid-area: icon;
  font-size: 1.5rem;
  justify-self: end;
  margin-right: 0.5em;
  cursor: pointer;
`;
