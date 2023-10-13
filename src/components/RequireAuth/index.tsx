import { Navigate, useLocation } from 'react-router-dom'
import { ReactElement } from 'react'
import { useAuth } from '~/hooks/useAuth'

const RequireAuth = ({ children }: { children: ReactElement }) => {
  const location = useLocation()
  const auth = useAuth()
  if (!auth?.isSigning()) {
    return <Navigate to={'/sign-in'} state={{ path: location.pathname }} />
  }
  return <>{children}</>
}

export default RequireAuth
