import Button from '@mui/material/Button'
import './style.scss'
import { useNavigate } from 'react-router-dom'
const WelcomeContent = () => {
  const navigateTo = useNavigate()
  return (
    <div className="welcome-content">
      <div className="content-text">
        <div className="content-title">
          <h2>Work but relax</h2>
          <h2>Handle everything</h2>
          <h2 className="blue">in one place</h2>
        </div>
        <div className="content-desc">
          <p>The platform is all you need, from teams to yourself</p>
          <p className="strong">Tasks, Time tracking, Report & more</p>
        </div>
        <div className="content-cta">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigateTo('/sign-up')
            }}
            sx={{
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '20px 28px',
              lineHeight: 'normal'
            }}
          >
            Get Started Now
          </Button>
          <p className="sub">Free to join!</p>
        </div>
      </div>
      <div className="content-image">
        <img src="/img/welcome-main-pic.png" alt="Demo" />
      </div>
    </div>
  )
}
export default WelcomeContent
