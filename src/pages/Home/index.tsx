import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomeLayout from '~/layouts/HomeLayout'
import './style.scss'
import WorkSpaceDetails from './WorkSpaceDetails'
import AddWSPopup from './components/AddWSPopup'
import AddPJPopup from './components/AddPJPopup'
import Dashboard from './Dashboard'
import InvitePeoplePopup from './components/InvitePeoplePopup'
import BoardDetail from './BoardDetail'
import Profile from './Profile'

const Home = () => {
  return (
    <div className="home-container">
      <Navigation />
      <div className="home-outlet">
        <Routes>
          <Route element={<HomeLayout />}>
            <Route element={<Dashboard />} index />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="workspaces/:id/*" element={<WorkSpaceDetails />} />
            <Route path="boards/:id/*" element={<BoardDetail />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
      <AddWSPopup />
      <AddPJPopup />
      <InvitePeoplePopup />
    </div>
  )
}
export default Home
