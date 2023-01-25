import React from 'react'
import { StyledHero, Heading } from './hero.styles'
import HeroImg from "../../images/hero.jpg"

function Hero() {
  return (
    <StyledHero>
        <img src={HeroImg} alt="hero"/>
        <Heading>SHOP FROM HOME!</Heading>
    </StyledHero>
  )
}

export default Hero