import { Outlet, Routes, Route } from 'react-router-dom'

// component
import FinishProfile from './FinishProfile'

const SignUp = () => {
  const SignUpLayout = (
    <div>
      <Outlet />
    </div>
  )

  return (
    <Routes>
      <Route element={SignUpLayout} path="*">
        <Route element={<FinishProfile />} index />
      </Route>
    </Routes>
  )
}
export default SignUp
