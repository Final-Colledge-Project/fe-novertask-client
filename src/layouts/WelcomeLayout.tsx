import { Outlet } from 'react-router-dom'
import UnAuthSection from '~/components/UnAuthSection'

const WelcomeLayout = () => {
  return (
    <>
      <UnAuthSection>
        <Outlet />
      </UnAuthSection>
    </>
  )
}

export default WelcomeLayout
