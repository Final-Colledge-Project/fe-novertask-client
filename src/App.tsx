import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Welcome from './pages/Welcome'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import WelcomeLayout from './layouts/WelcomeLayout'
import HomeLayout from './layouts/HomeLayout'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<WelcomeLayout />} path="/*">
            <Route element={<Welcome />} />
            <Route element={<Welcome />} path="welcome" />
            <Route element={<Welcome />} index />
            <Route element={<SignUp />} path="sign-up/*" />
            <Route element={<SignIn />} path="sign-in" />
          </Route>
          <Route element={<HomeLayout />} path="/home/*">
            <Route element={<Home />} />
            <Route element={<Home />} index />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
