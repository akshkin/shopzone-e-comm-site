import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getUser } from '../features/userSlice'
import { useAppSelector } from '../hooks/useAppDispatch'

function ProtectedRoute() {
  const user = useAppSelector(getUser)
  const location = useLocation()
  // console.log(location)
  return (    
      !user ? <Navigate state={{message: "You must log in first", path: location.pathname}} to="/auth" replace /> : <Outlet />    
  )
}

export default ProtectedRoute