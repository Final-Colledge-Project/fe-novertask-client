import { Navigate, useLocation } from 'react-router-dom'
import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'

const ClientProtectRoute = ({
  children
}: {
  children: ReactElement | ReactElement[]
}) => {
  const location = useLocation()
  const auth = useSelector((state: StoreType) => state.auth)
  if (!auth.userToken) {
    return <Navigate to={'/sign-in'} state={{ path: location.pathname }} />
  }
  return <>{children}</>
}

export default ClientProtectRoute
