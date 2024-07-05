import styled, { keyframes } from "styled-components";
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
  width: calc(50vw - 1em);
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: left;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding-bottom: 0.5em;

  @media (min-width: 620px) {
    width: calc(30vw - 1em);
  }

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
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin: 0 auto;
  ${"" /* overflow: hidden; */}

  @media (min-width: 800px) {
    height: 250px;
    width: 100%;
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
`;

export const StyledCartIcon = styled(Icon)`
  grid-area: icon;
  font-size: 1.5rem;
  justify-self: end;
  margin-right: 0.5em;
  cursor: pointer;
`;

const pulseAnimation = keyframes`  
    to { background-color: #d7d4d4; }
`;

export const ImageSkeleton = styled.div`
  grid-area: image;
  width: 100px;
  height: 150px;
  margin: 0 auto;
  background-color: #e0e0e0;
  animation: ${pulseAnimation} 1s ease-in-out infinite;

  @media (min-width: 800px) {
    height: 250px;
    width: 250px;
  }
`;

export const TitleSkeleton = styled.div`
  grid-area: title;
  height: 1rem;
  width: 120px;
  margin: 0.6em;
  margin-bottom: 0.5em;
  background-color: #e0e0e0;
  border-radius: 5px;
  animation: ${pulseAnimation} 1s ease-in-out infinite;
`;

export const RatingSkeleton = styled.div`
  grid-area: rating;
  width: 30px;
  margin-right: 0.5em;
  margin-top: 0.6em;
  align-self: flex-start;
  background-color: #e0e0e0;
  border-radius: 5px;
  animation: ${pulseAnimation} 1s ease-in-out infinite;
`;

export const PriceSkeleton = styled.div`
  grid-area: price;
  width: 60px;
  height: 1rem;
  margin: 0 0.5em 0.5em;
  background-color: #e0e0e0;
  border-radius: 5px;
  animation: ${pulseAnimation} 1s ease-in-out infinite;
`;
export const CartIconSkeleton = styled.div`
  grid-area: icon;
  width: 20px;
  height: 1.5rem;
  justify-self: end;
  margin-right: 0.5em;
  background-color: #e0e0e0;
  border-radius: 5px;
  animation: ${pulseAnimation} 1s ease-in-out infinite;
`;
