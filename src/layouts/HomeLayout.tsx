import { Outlet } from 'react-router-dom'
import ClientProtectRoute from '~/components/ClientProtectRoute'

const HomeLayout = () => {
  return (
    <ClientProtectRoute>
      <Outlet />
    </ClientProtectRoute>
  )
}

export default HomeLayout
