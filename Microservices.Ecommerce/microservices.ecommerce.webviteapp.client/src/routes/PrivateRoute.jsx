import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const isAuthenticated = false;
    if (!isAuthenticated) {
        return <Navigate to="/" />
    }
  return (
    <div>{children}</div>
  )
}

export default PrivateRoute