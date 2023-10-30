import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Dashboard from './Dashboard'
import HomeLayout from '~/layouts/HomeLayout'
import './style.scss'
const Home = () => {
  return (
    <div className="home-container">
      <Navigation />
      <div className="home-outlet">
        <Routes>
          <Route element={<HomeLayout />} path="*">
            <Route element={<Dashboard />} index />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}
export default Home
