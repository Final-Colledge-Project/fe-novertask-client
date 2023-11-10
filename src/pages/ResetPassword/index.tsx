import { Button } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom'

// component
import PasswordInput from '~/components/PasswordInput'
import InputWithController from '~/components/InputWithController'
import CircularProgress from '@mui/material/CircularProgress'

// form validate
import formSchema from './formSchema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import IFormFields from './IFormFields'

import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { showMessage } from '~/redux/snackBarSlice'
import { useState } from 'react'
import useVerifyOTP from '~/hooks/useVerifyOTP'
import { authService } from '~/services'
import { setEmail } from '~/redux/userSlice'

const ResetPassword = () => {
  const navigateTo = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector((state: StoreType) => state.user)

  const { control, handleSubmit, getValues } = useForm<IFormFields>({
    defaultValues: {},
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    reValidateMode: 'onBlur'
  })

  // Manage progress bar visibility
  const [progressVisibility, setProgressVisibility] = useState(false)

  const { InputCodeElement, dirties, inputCodes } = useVerifyOTP({
    onSubmitCode: () => {},
    length: 6
  })

  const onSubmit: SubmitHandler<IFormFields> = async (formData) => {
    try {
      setProgressVisibility(true)

      await authService.resetPassword({
        newPassword: formData.password,
        email: currentUser.tempEmail,
        otp: inputCodes.join('')
      })

      setProgressVisibility(false)

      dispatch(
        showMessage({
          message: 'Reset password successfully! Please sign in again.',
          variants: 'success'
        })
      )
      dispatch(setEmail(''))
      navigateTo('/sign-in')
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

  return !currentUser.tempEmail ? (
    <Navigate to="/sign-in" />
  ) : (
    <div className="forgot-password-container">
      <div className="content">
        <p className="title">
          <span
            className="logo"
            onClick={() => {
              navigateTo('/')
            }}
          >
            <img src="/img/novertask-logo-full.png" alt="" />
          </span>
          <span>
            Reset your <span className="blue">password</span>
          </span>
          {/* <span className="sub-title">Enter OTP and create new password</span> */}
        </p>
        <div className="input-codes">
          <p className="label">Input the your OTP</p>
          {InputCodeElement}
        </div>
        {/* <div className="key-image">
          <RiShieldKeyholeLine />
        </div> */}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <p>
            <b>Input your new password</b>
          </p>
          <InputWithController name="password" control={control}>
            <PasswordInput
              placeHolder="Enter your new password"
              label="New password"
              value={getValues('password')}
            />
          </InputWithController>
          <InputWithController name="repeatPassword" control={control}>
            <PasswordInput
              label="Repeat new password"
              placeHolder="Enter your password"
              value={getValues('repeatPassword')}
            />
          </InputWithController>
          <Button
            className="submit-button"
            variant="contained"
            color="primary"
            sx={{
              height: '43px',
              fontSize: '16px'
            }}
            type="submit"
            disabled={progressVisibility || !dirties.every((i) => i === true)}
            onClick={handleSubmit(onSubmit)}
          >
            {progressVisibility ? (
              <CircularProgress
                size="30px"
                sx={{ color: (theme) => theme.palette.white.main }}
              />
            ) : (
              'Reset password'
            )}
          </Button>
        </form>
      </div>
      <div className="gif">
        <img src="/img/reset-password.gif" alt="" />
      </div>
    </div>
  )
}
export default ResetPassword
