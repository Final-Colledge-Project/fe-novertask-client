import { Outlet, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

// component
import EnterMail from './EnterMail'
import ConfirmMail from './ConfirmMail'
import FinishProfile from './FinishProfile'

const SignUp = () => {
  const SignUpLayout = (
    <div>
      <Outlet />
    </div>
  )
  const [currentEmail, setCurrentEmail] = useState('')
  const handleSubmitEmail = (newEmail: string) => setCurrentEmail(newEmail)
  return (
    <Routes>
      <Route element={SignUpLayout} path="/*">
        <Route
          element={
            <EnterMail
              defaultEmail={currentEmail}
              onSubmitEmail={handleSubmitEmail}
            />
          }
          index
        />
        <Route
          element={<ConfirmMail email={currentEmail} />}
          path="confirm-mail"
        />
        <Route
          element={<FinishProfile email={currentEmail} />}
          path="finish-profile"
        />
      </Route>
    </Routes>
  )
}
export default SignUp
