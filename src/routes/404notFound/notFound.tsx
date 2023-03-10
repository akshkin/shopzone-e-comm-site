import React from 'react'
import {Link} from "react-router-dom"

const notFoundImg = require("../../images/404.png")

function NotFound() {
  return (
    <div>
      <h3>Sorry, the page you were looking for was not found!</h3>
      <img src={notFoundImg} alt="not found" />
      <Link style={{display: "block"}} to="/">Back to Home</Link>
    </div>
  )
}

export default NotFound