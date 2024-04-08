import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

const PrivateRoute = ({children}: { children: ReactNode }) => {
    const isAuthenticated = false;
    if (!isAuthenticated) {
        return <Navigate to="/" />
    }
  return (
    <div>{children}</div>
  )
}

export default PrivateRoute