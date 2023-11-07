import { Button, CircularProgress } from '@mui/material'
import { MdOutlineMailOutline } from 'react-icons/md'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

// components
import TextInput from '~/components/TextInput'
import InputWithController from '~/components/InputWithController'

// styles
import './style.scss'

// api service
import { authService, userService } from '~/services'

// form validate
import IFormFields from './IFormFields'
import formSchema from './formSchema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector, useDispatch } from 'react-redux'

import { StoreType } from '~/redux'
import { Dispatch } from '@reduxjs/toolkit'
import { setEmail } from '~/redux/userSlice'
import { showMessage } from '~/redux/snackBarSlice'
import IProps from './IProps'

const EnterMailSection = ({ redirectPath }: IProps) => {
  const location = useLocation()
  const navigateTo = useNavigate()
  const dispatch: Dispatch = useDispatch()

  const currentUser = useSelector((state: StoreType) => state.user)
  const { email } = currentUser

  // manage progress bar visibility
  const [progressVisibility, setProgressVisibility] = useState(false)

  // form controller from react-hook
  const { control, handleSubmit } = useForm<IFormFields>({
    defaultValues: { email },
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    reValidateMode: 'onBlur'
  })

  useEffect(() => {
    // if this page is redirected because shortage of email
    if (location.state?.isShortageEmail) {
      dispatch(
        showMessage({
          message: 'You have to verify your email first',
          variants: 'error'
        })
      )
    }
  }, [])

  const onSubmit: SubmitHandler<IFormFields> = async (formData) => {
    try {
      setProgressVisibility(true)

      // verify email for sign up -> sendOTP
      if (redirectPath === '/sign-up') await userService.sendOTP(formData)
      // verify email for reset password -> forgotPassword
      else await authService.forgotPassword(formData)

      // update user in store
      dispatch(setEmail(formData.email))
      dispatch(
        showMessage({
          message: `OTP have been sent successfully to ${formData.email}!`,
          variants: 'success'
        })
      )

      redirectPath === '/sign-up'
        ? navigateTo('confirm-otp')
        : navigateTo('/reset-password')
    } catch (error) {
      // show error message on snack bar
      dispatch(
        showMessage({
          message: (error as Error).message,
          variants: 'error'
        })
      )
    } finally {
      setProgressVisibility(false)
    }
  }

  return (
    <div className="enter-mail-section">
      <div className="enter-mail-section__text">
        <p className="enter-mail-section__title">
          Welcome to{' '}
          <span className="enter-mail-section__logo">
            <img src="/img/novertask-logo-full.png" alt="" />
          </span>
        </p>
        <p className="enter-mail-section__sub-title">
          First, let's verify your email address
        </p>
        <div className="enter-mail-section__action">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputWithController name="email" control={control}>
              <TextInput
                error={false}
                type="text"
                placeHolder="Enter your email"
                label="Email"
                startIcon={<MdOutlineMailOutline />}
              />
            </InputWithController>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{
                height: '43px',
                fontSize: '16px'
              }}
              // onClick={() => navigateTo('./confirm-mail')}
              disabled={progressVisibility}
            >
              {progressVisibility ? (
                <CircularProgress
                  size="30px"
                  sx={{ color: (theme) => theme.palette.white.main }}
                />
              ) : (
                'Continue'
              )}
            </Button>
          </form>
          <p className="navigate-login">
            Already have an account?
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
                navigateTo('/sign-in')
              }}
            >
              Log in
            </Button>
          </p>
        </div>
      </div>
      <div className="gif">
        <img src="/img/reset-password.gif" alt="" />
      </div>
    </div>
  )
}
export default EnterMailSection
