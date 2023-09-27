import './style.scss'
import { Outlet, Routes, Route } from 'react-router-dom'
import EnterMail from './EnterMail'
import ConfirmMail from './ConfirmMaill'
const SignUp = () => {
  const SignUpLayout = (
    <div>
      <Outlet />
    </div>
  )
  return (
    <Routes>
      <Route element={SignUpLayout} path="/*">
        <Route element={<EnterMail />} index />
        <Route element={<ConfirmMail />} path="confirm-mail" />
      </Route>
    </Routes>
  )
}
export default SignUp
