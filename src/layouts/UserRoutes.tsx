import { Outlet } from 'react-router-dom'
import ClientProtectRoute from '~/components/ClientProtectRoute'

const UserRoutes = () => {
  return (
    <ClientProtectRoute>
      <Outlet />
    </ClientProtectRoute>
  )
}

export default UserRoutes
