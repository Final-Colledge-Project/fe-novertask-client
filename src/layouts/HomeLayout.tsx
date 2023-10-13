import { Outlet } from 'react-router-dom'
import RequireAuth from '~/components/RequireAuth'

const HomeLayout = () => {
  return (
    <>
      <RequireAuth>
        <Outlet />
      </RequireAuth>
    </>
  )
}

export default HomeLayout
