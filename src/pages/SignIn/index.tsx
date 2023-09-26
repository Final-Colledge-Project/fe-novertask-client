import { Button } from '@mui/material'
import './style.scss'
import { MdOutlineMailOutline, MdLockOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import TextInput from '~/components/TextInput'
import PasswordInput from '~/components/PasswordInput'
const SignIn = () => {
  const navigateTo = useNavigate()

  return (
    <div className="signup-container">
      <div className="signup-text">
        <p className="title">
          Welcome back to{' '}
          <span className="logo">
            <img src="/img/novertask-logo-full.png" alt="" />
          </span>
        </p>
        <p className="sub-title">Continue your trip. Enter your identify</p>
        <div className="signup-action">
          <TextInput
            type="text"
            placeHolder="Enter your email"
            label="Email"
            startIcon={<MdOutlineMailOutline />}
          />
          <PasswordInput
            startIcon={<MdLockOutline />}
            label="Password"
            placeHolder="Enter your password"
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: '43px',
              fontSize: '16px'
            }}
          >
            Sign in
          </Button>
          <p className="navigate-login">
            Not a member?
            <Button
              variant="text"
              color="primary"
              sx={{
                display: 'inline-block',
                height: '43px',
                fontSize: '20px',
                py: 0
              }}
              onClick={() => {
                navigateTo('/sign-up')
              }}
            >
              Sign up now
            </Button>
          </p>
        </div>
      </div>

      <div className="signup-image">
        <img className="main" src="/img/sign-up-pic.png" alt="" />
        <img className="calendar item" src="/img/calendar.png" alt="" />
        <img className="clock item" src="/img/clock.png" alt="" />
        <img className="timeline item" src="/img/timeline.png" alt="" />
        <img className="mail item" src="/img/mail.png" alt="" />
      </div>
    </div>
  )
}
export default SignIn
