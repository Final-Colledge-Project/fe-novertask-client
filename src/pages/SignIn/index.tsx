import { Button } from '@mui/material'
import { MdOutlineMailOutline, MdLockOutline } from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom'

// component
import TextInput from '~/components/TextInput'
import PasswordInput from '~/components/PasswordInput'
import InputWithController from '~/components/InputWithController'
import AnimPic from '~/components/AnimPic'
import CircularProgress from '@mui/material/CircularProgress'

// form validate
import formSchema from './formSchema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import IFormFields from './IFormFields'

import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import { signIn } from '~/redux/authSlice/action'
import { showMessage } from '~/redux/snackBarSlice'

const SignIn = () => {
  const navigateTo = useNavigate()
  const location = useLocation()

  const dispatch = useDispatch<StoreDispatchType>()
  const currentAuth = useSelector((store: StoreType) => store.auth)

  const { control, handleSubmit, getValues } = useForm<IFormFields>({
    defaultValues: {},
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    reValidateMode: 'onBlur'
  })

  // navigate to home if don't have last past
  const redirectPath = location.state?.path || '/home'

  const onSubmit: SubmitHandler<IFormFields> = async (formData) => {
    // sign in action -> persist token on local storage
    await dispatch(signIn(formData))

    if (currentAuth.error) {
      dispatch(
        showMessage({
          message: currentAuth.error,
          open: true,
          variants: 'error'
        })
      )
    }

    if (currentAuth.success) {
      // navigate to home page or last page called login
      navigateTo(redirectPath, { replace: true })
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-text">
        <p className="title">
          Sign in to{' '}
          <span className="logo">
            <img src="/img/novertask-logo-full.png" alt="" />
          </span>
        </p>
        <p className="sub-title">Continue your trip. Enter your identify</p>
        <form className="signin-action" onSubmit={handleSubmit(onSubmit)}>
          <InputWithController name="email" control={control}>
            <TextInput
              placeHolder="Enter your email"
              label="Email"
              startIcon={<MdOutlineMailOutline />}
              type="text"
              value={getValues('email')}
            />
          </InputWithController>
          <InputWithController name="password" control={control}>
            <PasswordInput
              startIcon={<MdLockOutline />}
              label="Password"
              placeHolder="Enter your password"
              value={getValues('password')}
            />
          </InputWithController>
          <div className="signin__forgot-password">
            <Button
              variant="text"
              color="primary"
              sx={{
                display: 'inline-block',
                py: 0,
                '@media only screen and (max-width:414px)': {
                  fontSize: '15px'
                }
              }}
              onClick={() => {
                navigateTo('/verify-email', {
                  state: { redirectPath: '/reset-password' }
                })
              }}
            >
              Forgot password?
            </Button>
          </div>
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: '43px',
              fontSize: '16px'
            }}
            type="submit"
            disabled={currentAuth.loading}
          >
            {currentAuth.loading ? (
              <CircularProgress
                size="30px"
                sx={{ color: (theme) => theme.palette.white.main }}
              />
            ) : (
              'Sign In'
            )}
          </Button>
          <p className="navigate-signup">
            Not a member?
            <Button
              variant="text"
              color="primary"
              sx={{
                display: 'inline-block',
                height: '43px',
                fontSize: '20px',
                py: 0,
                '@media only screen and (max-width:414px)': {
                  fontSize: '15px'
                }
              }}
              onClick={() => {
                navigateTo('/verify-email', {
                  state: { redirectPath: '/sign-up' }
                })
              }}
            >
              Sign up now
            </Button>
          </p>
        </form>
      </div>
      <AnimPic />
    </div>
  )
}
export default SignIn
