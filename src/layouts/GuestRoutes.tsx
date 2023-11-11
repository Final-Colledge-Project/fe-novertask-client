import { Outlet } from 'react-router-dom'
import UnAuthRoute from '~/components/UnAuthRoute'

const GuestRoutes = () => {
  return (
    <UnAuthRoute>
      <Outlet />
    </UnAuthRoute>
  )
}

export default GuestRoutes
