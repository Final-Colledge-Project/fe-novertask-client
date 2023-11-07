import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Welcome from './pages/Welcome'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import VerifyEmail from './pages/VerifyMail'
import GeneralSnackBar from './components/GeneralSnackBar'
import GuestRoutes from './layouts/GuestRoutes'
import UserRoutes from './layouts/UserRoutes'
import ForgotPassword from './pages/ResetPassword'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<PageNotFound />} path="/*" />
          {/* guest routes */}
          <Route element={<GuestRoutes />} path="/*">
            <Route element={<Welcome />} />
            <Route element={<Welcome />} index />
            <Route element={<Welcome />} path="welcome" index />
            <Route element={<SignUp />} path="sign-up/*" />
            <Route element={<SignIn />} path="sign-in" />
            <Route element={<VerifyEmail />} path="verify-email/*" />
            <Route element={<ForgotPassword />} path="reset-password" />
          </Route>

          {/* protected routes */}
          <Route element={<UserRoutes />}>
            <Route element={<Home />} path="/home/*" />
          </Route>
        </Routes>
      </BrowserRouter>
      <GeneralSnackBar />
    </div>
  )
}

export default App
