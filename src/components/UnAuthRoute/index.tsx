import { Navigate, useLocation } from 'react-router-dom'
import { ReactElement, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { enqueueSnackbar } from 'notistack'

const UnAuthRoute = ({ children }: { children: ReactElement }) => {
  const location = useLocation()
  const { shouldReSign, error, userToken, userInfo } = useSelector(
    (state: StoreType) => state.auth
  )

  useEffect(() => {
    let message = undefined

    // case: user access protected route without token
    if (!shouldReSign && location.state?.redirectPath)
      message = 'Please sign in to access this page.'

    if (message) {
      enqueueSnackbar(message, {
        variant: 'error'
      })
    }
  }, [])

  // access authentication page but already have token
  useEffect(() => {
    if (userToken) {
      enqueueSnackbar('Switching to home...', {
        variant: 'info'
      })
    }
  }, [])

  // raise success message when signing in is successful
  useEffect(() => {
    if (userInfo && location.pathname === '/sign-in') {
      enqueueSnackbar('Sign in successfully.', {
        variant: 'success'
      })
    }
  }, [userInfo])

  // raise error when dispatch action failed
  useEffect(() => {
    const message = error ? error : undefined

    if (message) {
      enqueueSnackbar(message, {
        variant: 'error'
      })
    }
  }, [error])

  return !userToken ? (
    <>{children}</>
  ) : (
    <Navigate to={location.state?.redirectPath || '/home'} replace />
  )
}

export default UnAuthRoute
