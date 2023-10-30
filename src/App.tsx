import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Welcome from './pages/Welcome'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import WelcomeLayout from './layouts/WelcomeLayout'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './layouts/AppLayout'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<AppLayout />}
          >
            {/* <Route element={<PageNotFound />} path="*" /> */}

            <Route element={<WelcomeLayout />} path="*">
              <Route element={<Welcome />} />
              <Route element={<Welcome />} index />
              <Route element={<Welcome />} path="welcome" index />
              <Route element={<SignUp />} path="sign-up/*" />
              <Route element={<SignIn />} path="sign-in" />
            </Route>
            <Route element={<Home />} path="home/*" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
