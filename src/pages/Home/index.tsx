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
import Notification from '~/pages/Home/Notifications'
import { StoreDispatchType, StoreType } from '~/redux'
import { useEffect } from 'react'
import socketIoClient from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { getNotificationByUserId } from '~/redux/notiSlice/actions'
const Home = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL
  const { user } = useSelector((state: StoreType) => state.user)
  const dispatch = useDispatch<StoreDispatchType>()
  useEffect(() => {
    const socket = socketIoClient(serverUrl)
    socket.on('connect', async function () {
      console.log('~~~~~~~~~~~>Login')
      socket.emit('login', { userId: user?._id })
      // <-- this works
      socket.on('message', function (data) {
        console.log('Received message:', data)
      })
    })
    socket.on('directMessage', (data) => {
      console.log('🚀 ~ file: index.tsx:113 ~ socket.on ~ data:', data)
      if (data?.message === 'fetchNotification') {
        dispatch(getNotificationByUserId())
      }
    })
  }, [user])
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
            <Route path="profile/*" element={<Profile />} />
          </Route>
        </Routes>
      </div>
      <AddWSPopup />
      <AddPJPopup />
      <InvitePeoplePopup />
      <Notification />
    </div>
  )
}
export default Home
