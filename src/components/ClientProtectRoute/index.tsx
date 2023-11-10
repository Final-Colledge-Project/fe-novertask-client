import { Navigate, useLocation } from 'react-router-dom'
import { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import { getCurrentUser } from '~/redux/authSlice/actions'

const ClientProtectRoute = ({
  children
}: {
  children: ReactElement | ReactElement[]
}) => {
  const location = useLocation()

  const { userInfo, userToken, shouldReSign } = useSelector(
    (state: StoreType) => state.auth
  )

  const dispatch = useDispatch<StoreDispatchType>()

  useEffect(() => {

    const getUser = async () => {
      // there is token but no info  -> get user info
      if (userToken && !userInfo) {
        await dispatch(getCurrentUser())
      }
    }

    getUser()

  }, [userInfo])

  // token is not found || refresh token is invalid -> sign in again
  return !userToken || shouldReSign ? (
    <Navigate to={'/sign-in'} state={{ redirectPath: location.pathname }} />
  ) : (
    userInfo && <>{children}</>
  )
}

export default ClientProtectRoute
