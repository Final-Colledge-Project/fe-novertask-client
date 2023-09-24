import { Route, Routes, BrowserRouter } from 'react-router-dom'
import WelcomePage from './pages/Welcome'
import SignUp from './pages/SignUp'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<WelcomePage />} path="/" />
          <Route element={<WelcomePage />} path="/welcome" />
          <Route element={<WelcomePage />} index />
          <Route element={<SignUp />} path="sign-up" />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
