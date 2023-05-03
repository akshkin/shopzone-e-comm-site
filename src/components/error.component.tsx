import React from 'react'
import { Link } from 'react-router-dom'
import { useRouteError } from 'react-router-dom'
import { ErrorText } from '../routes/auth/auth.style'

function ErrorComponent() {
  const error: any = useRouteError()
  console.log(error)
  return (
    <div>
      <ErrorText>An error occured! </ErrorText>
      Go to <Link to="/">Home</Link>
    </div>
  )
}

export default ErrorComponent