import React from 'react'
import {Link} from "react-router-dom"

function NotFound() {
  return (
    <div>
      <h3>Sorry, the page you were looking for was not found!</h3>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default NotFound