import React from 'react'
import {Link} from "react-router-dom"
import { Container } from "./notFound.styles"

const notFoundImg = require("../../images/404.png")

function NotFound() {
  return (
    <Container>
      <h3>Sorry, the page you were looking for was not found!</h3>
      <img src={notFoundImg} alt="not found" />
      <Link style={{display: "block"}} to="/"><span>&larr; &nbsp;</span>Back to Home</Link>
    </Container>
  )
}

export default NotFound