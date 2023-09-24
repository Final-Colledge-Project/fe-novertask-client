import FeatureDropMenu from './FeatureDropMenu'
import { Link } from 'react-router-dom'
import './style.scss'
import PackagesDropMenu from './PackagesDropMenu'
import AboutDropMenu from './AboutDropMenu'
import Button from '@mui/material/Button'
import Navigation from '../Navigation'

const WelcomeHeader = () => {
  return (
    <div className="welcome-header">
      <div className="header-left">
        <Navigation />
        <Link to={'/'} className="header-logo">
          Novertask
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
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}
export default WelcomeHeader
