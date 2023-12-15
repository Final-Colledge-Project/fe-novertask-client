import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Welcome from './pages/Welcome'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import PageNotFound from './pages/PageNotFound'
import VerifyEmail from './pages/VerifyMail'
import GeneralSnackBar from './components/GeneralSnackBar'
import GuestRoutes from './layouts/GuestRoutes'
import UserRoutes from './layouts/UserRoutes'
import ForgotPassword from './pages/ResetPassword'
import ProgressModal from './components/ProgressModal'
import { lazy, Suspense } from 'react'
import Loading from './components/Loading'
import SingInSuccess from './pages/SignIn/components/SignInSuccess'
const Home = lazy(() => import('./pages/Home'))
const Invitation = lazy(() => import('./pages/Invitation'))

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<PageNotFound />} path="/*" />
          {/* guest routes */}
          <Route element={<GuestRoutes />} path="/*">
            <Route element={<SignIn />} path="sign-in" />
            <Route element={<Welcome />} />
            <Route element={<Welcome />} index />
            <Route element={<Welcome />} path="welcome" index />
            <Route element={<SignUp />} path="sign-up/*" />
            <Route element={<VerifyEmail />} path="verify-email/*" />
            <Route element={<ForgotPassword />} path="reset-password" />
            <Route element={<SingInSuccess />} path='login-success/:userId/:tokenLogin'/>
          </Route>

          {/* protected routes */}
          <Route element={<UserRoutes />} path="u">
            <Route
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
              index
            />
            <Route
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
              path="*"
            />
            <Route
              element={
                <Suspense fallback={<Loading />}>
                  <Invitation />
                </Suspense>
              }
              path="invitation/:id"
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <GeneralSnackBar />
      <ProgressModal />
    </div>
  )
}

export default App
