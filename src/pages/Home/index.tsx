import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
// import Dashboard from './Dashboard'
import HomeLayout from '~/layouts/HomeLayout'
import './style.scss'
import WorkSpaceDetails from './WorkSpaceDetails'
import AddWSPopup from './components/AddWSPopup'
import AddPJPopup from './components/AddPJPopup'
import Dashboard from './Dashboard'

const Home = () => {
  return (
    <div className="home-container">
      <Navigation />
      <div className="home-outlet">
        <Routes>
          <Route element={<HomeLayout />} path="*">
            <Route element={<Dashboard />} index />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workspaces/:id" element={<WorkSpaceDetails />} />
          </Route>
        </Routes>
      </div>
      <AddWSPopup />
      <AddPJPopup />
    </div>
  )
}
export default Home
