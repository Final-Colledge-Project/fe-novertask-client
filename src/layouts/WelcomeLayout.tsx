import { Outlet } from 'react-router-dom'
import UnAuthSection from '~/components/UnAuthSection'

const WelcomeLayout = () => {
  return (
    <div>
      <UnAuthSection>
        <Outlet />
      </UnAuthSection>
    </div>
  )
}

export default WelcomeLayout
