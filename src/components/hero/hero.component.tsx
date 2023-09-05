import { ReactElement } from "react";
import { StyledHero, Heading } from "./hero.styles";

const HeroImg = require("../../images/hero-new.jpg");

function Hero(): ReactElement {
  return (
    <StyledHero>
      <img src={HeroImg} alt="hero" />
      <Heading>Explore our collections below</Heading>
    </StyledHero>
  );
}

export default Hero;
