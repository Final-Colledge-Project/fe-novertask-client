import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    // <ClientProtectRoute>
      <Outlet />
    // </ClientProtectRoute>
  )
}

export default HomeLayout
