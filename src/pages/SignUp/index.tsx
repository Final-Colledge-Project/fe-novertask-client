import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import './style.scss'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineMailOutline } from 'react-icons/md'
const SignUp = () => {
  return (
    <div className="signup-container">
      <div className="signup-text">
        <p className="title">
          Welcome to <span className="blue">Novertask</span>
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
          <FormControl
            fullWidth
            sx={{
              m: 0,
              height: '60px'
            }}
          >
            <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment
                  position="start"
                  sx={{
                    width: '30px',
                    height: '20px',
                    '& svg': {
                      width: '100%',
                      height: '100%'
                    }
                  }}
                >
                  <MdOutlineMailOutline />
                </InputAdornment>
              }
              label="Email"
              placeholder="Enter your email address"
              sx={{
                height: '100%',
                '&.Mui-focused': {
                  '.MuiOutlinedInput-notchedOutline': {
                    borderWidth: '1px'
                  }
                }
              }}
            />
          </FormControl>
          {/* <Button
            variant="outlined"
            fullWidth
            sx={{
              fontSize: '16px',
              color: (theme) => theme.palette.gray.main,
              border: (theme) => `1px solid ${theme.palette.gray3.main}`,
              height: '60px',
              '& svg': {
                width: '25px',
                height: '25px'
              },
              justifyContent: 'flex-start',
              paddingLeft: '30px'
            }}
            startIcon={<MdOutlineMailOutline />}
          >
            Continue with Google
          </Button> */}
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
            >
              Log in
            </Button>
          </p>
        </div>
      </div>

      <div className="signup-image">
        <img src="/img/sign-up-pic.png" alt="" />
      </div>
    </div>
  )
}
export default SignUp
