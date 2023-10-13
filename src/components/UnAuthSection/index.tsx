import { Navigate } from 'react-router-dom'
import { ReactElement } from 'react'
import { useAuth } from '~/hooks/useAuth'

const UnAuthSection = ({ children }: { children: ReactElement }) => {
  //   const location = useLocation()
  const auth = useAuth()
  if (auth?.isSigning()) {
    return <Navigate to={'/home'} />
  }
  return <>{children}</>
}

export default UnAuthSection
