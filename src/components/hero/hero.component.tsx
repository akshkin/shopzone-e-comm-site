import { ReactElement } from 'react'
import { StyledHero, Heading } from './hero.styles'

const HeroImg = require("../../images/hero.jpg")

function Hero(): ReactElement {
  return (
    <StyledHero>
        <img src={HeroImg} alt="hero"/>
        <Heading>SHOP FROM HOME!</Heading>
    </StyledHero>
  )
}

export default Hero