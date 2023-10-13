import { Button } from '@mui/material'
import { MdOutlineMailOutline, MdLockOutline } from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

// component
import TextInput from '~/components/TextInput'
import PasswordInput from '~/components/PasswordInput'
import InputWithController from '~/components/InputWithController'
import AnimPic from '../SignUp/components/AnimPic'
import CircularProgress from '@mui/material/CircularProgress'
import CustomizedSnackbars from '~/components/SnackBar'

// form validate
import formSchema from './formSchema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import IFormFields from './IFormFields'

// api service
import { authService } from '~/services'

import { useAuth } from '~/hooks/useAuth'

import './style.scss'

const SignIn = () => {
  const navigateTo = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  // Manage progress bar visibility
  const [progressVisibility, setProgressVisibility] = useState(false)

  // Manage error snackbar visibility
  const [errorBarVisibility, setErrorBarVisibility] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { control, handleSubmit } = useForm<IFormFields>({
    defaultValues: {},
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    reValidateMode: 'onBlur'
  })

  // navigate to home if don't have last past
  const redirectPath = location.state?.path || '/home'

  const onSubmit: SubmitHandler<IFormFields> = async (formData) => {
    try {
      setProgressVisibility(true)

      const res = await authService.signIn(formData)

      // save token
      auth?.signIn(res?.data.token as string)
      // navigate to home page or last page called login
      navigateTo(redirectPath, { replace: true })

    } catch (error) {

      setProgressVisibility(false)
      setErrorBarVisibility(true)
      setErrorMessage((error as Error).message)
    } finally {
      setProgressVisibility(false)
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-text">
        <p className="title">
          Welcome back to{' '}
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
            />
          </InputWithController>
          <InputWithController name="password" control={control}>
            <PasswordInput
              startIcon={<MdLockOutline />}
              label="Password"
              placeHolder="Enter your password"
            />
          </InputWithController>
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: '43px',
              fontSize: '16px'
            }}
            type="submit"
            disabled={progressVisibility}
          >
            {progressVisibility ? (
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
                navigateTo('/sign-up')
              }}
            >
              Sign up now
            </Button>
          </p>
        </form>
      </div>
      <AnimPic />
      {errorBarVisibility && (
        <CustomizedSnackbars
          message={errorMessage}
          isShow={errorBarVisibility}
          onClose={() => {
            setErrorBarVisibility(false)
          }}
        />
      )}
    </div>
  )
}
export default SignIn
