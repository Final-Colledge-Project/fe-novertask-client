import { Outlet, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import EnterMailSection from './EnterMailSection'
import InputOTPSection from './InputOTPSection'
import { useMemo } from 'react'

const VerifyEmail = () => {
  const Layout = (
    <div>
      <Outlet />
    </div>
  )

  const location = useLocation()

  const redirectPath = useMemo(() => {
    return location.state?.redirectPath
  }, [])

  return redirectPath ? (
    <Routes>
      <Route element={Layout} path="*">
        <Route element={<EnterMailSection redirectPath={redirectPath} />} />
        <Route
          element={<EnterMailSection redirectPath={redirectPath} />}
          index
        />
        <Route
          element={<InputOTPSection redirectPath={redirectPath} />}
          path="confirm-otp"
        />
      </Route>
    </Routes>
  ) : (
    <Navigate to={'/'} replace />
  )
}
export default VerifyEmail
