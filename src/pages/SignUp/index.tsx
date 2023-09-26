import { Button } from '@mui/material'
import './style.scss'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineMailOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import TextInput from '~/components/TextInput'
const SignUp = () => {
  const navigateTo = useNavigate()
  return (
    <div className="signup-container">
      <div className="signup-text">
        <p className="title">
          Welcome to{' '}
          <span className="logo">
            <img src="/img/novertask-logo-full.png" alt="" />
          </span>
        </p>
        <p className="sub-title">
          Get started - it's free. No credit card needed.
        </p>
        <div className="signup-action">
          <Button
            variant="outlined"
            fullWidth
            sx={{
              fontSize: '16px',
              color: (theme) => theme.palette.gray.main,
              border: (theme) => `1px solid ${theme.palette.black.main}`,
              height: '60px',
              '& svg': {
                width: '25px',
                height: '25px'
              }
            }}
            startIcon={<FcGoogle />}
          >
            Continue with Google
          </Button>
          <div className="divider">Or</div>
          <TextInput
            type="text"
            placeHolder="Enter your email"
            label="Email"
            startIcon={<MdOutlineMailOutline />}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: '43px',
              fontSize: '16px'
            }}
          >
            Continue
          </Button>
          <p className="navigate-login">
            Already have an account?
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
                navigateTo('/sign-in')
              }}
            >
              Log in
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
export default SignUp
