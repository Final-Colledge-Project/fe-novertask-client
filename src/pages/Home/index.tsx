import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
// import Dashboard from './Dashboard'
import HomeLayout from '~/layouts/HomeLayout'
import './style.scss'
import WorkSpaceDetails from './WorkSpaceDetails'
import AddWSPopup from './components/AddWSPopup'
import AddPJPopup from './components/AddPJPopup'
import { Suspense, lazy } from 'react'
import LoadingSkelelton from './components/LoadingSkeleton'
import InvitePeoplePopup from './components/InvitePeoplePopup'

const Dashboard = lazy(() => import('./Dashboard'))

const Home = () => {
  return (
    <div className="home-container">
      <Navigation />
      <div className="home-outlet">
        <Routes>
          <Route element={<HomeLayout />} path="*">
            <Route
              element={
                <Suspense fallback={<LoadingSkelelton />}>
                  <Dashboard />
                </Suspense>
              }
              index
            />
            <Route
              path="dashboard"
              element={
                <Suspense fallback={<LoadingSkelelton />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route path="workspaces/:id" element={<WorkSpaceDetails />} />
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
