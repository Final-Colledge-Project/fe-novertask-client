import FeatureDropMenu from './FeatureDropMenu'
import { Link } from 'react-router-dom'
import './style.scss'
import PackagesDropMenu from './PackagesDropMenu'
import AboutDropMenu from './AboutDropMenu'
import Button from '@mui/material/Button'
import Navigation from '../components/Navigation'
import { useNavigate } from 'react-router-dom'
const WelcomeHeader = () => {
  const navigateTo = useNavigate()
  return (
    <div className="welcome-header">
      <div className="header-left">
        <Navigation />
        <Link to={'/'} className="header-logo">
          {/* Novertask */}
          <img src="/img/novertask-logo-full.png" alt="" />
        </Link>
        <FeatureDropMenu />
        <PackagesDropMenu />
        <AboutDropMenu />
      </div>
      <div className="header-right">
        <Button
          variant="text"
          sx={{
            color: (theme) => theme.palette.black.main,
            fontWeight: 'bold',
            fontSize: '16px'
          }}
          onClick={() => {
            navigateTo('/sign-in')
          }}
        >
          Sign in
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 'bold',
            fontSize: '16px'
          }}
          onClick={() => {
            navigateTo('/verify-email', {
              state: { redirectPath: '/sign-up' }
            })
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}
export default WelcomeHeader
