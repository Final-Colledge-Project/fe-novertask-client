import { Navigate } from 'react-router-dom'
import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'

const UnAuthRoute = ({
  children
}: {
  children: ReactElement
}) => {
  //   const location = useLocation()
  const auth = useSelector((state: StoreType) => state.auth)
  console.log(!auth.userToken)
  if (auth.userToken) {
    return <Navigate to={'/home'} />
  }
  return <>{children}</>
}

export default UnAuthRoute
