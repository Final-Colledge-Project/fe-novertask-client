import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

// components
import { MdOutlineChangeCircle } from 'react-icons/md'
// import CustomStepper from '../components/Stepper'
import Button from '@mui/material/Button'
import { CircularProgress } from '@mui/material'

// styles
import './style.scss'

// services
import { userService } from '~/services'

// OTP Input Group
import useVerifyOTP from '~/hooks/useVerifyOTP'

import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import IProps from './IProps'
import useCounter from '~/hooks/useCounter'
import { showMessage } from '~/redux/snackBarSlice'

const InputOTPSection = ({ redirectPath }: IProps) => {
  const navigateTo = useNavigate()

  const currentUser = useSelector((state: StoreType) => state.user)
  const dispatch = useDispatch()

  // Manage progress bar
  const [progressVerifyVis, setProgressVerifyVis] = useState(false)
  const [progressResendVis, setProgressResendVis] = useState(false)

  const { current, reset } = useCounter({ time: 10, isCountDown: true })

  const handleResendOTP = async () => {
    try {
      setProgressResendVis(true)
      await userService.sendOTP({ email: currentUser.email })
      dispatch(
        showMessage({
          message: `Successfully resent OTP to ${currentUser.email}`,
          variants: 'success'
        })
      )
      reset()
    } catch (error) {
      // show error message on snack bar
      dispatch(
        showMessage({
          message: (error as Error).message,
          variants: 'error'
        })
      )
    } finally {
      setProgressResendVis(false)
    }
  }

  const handleSubmitCode = async (codes: number[]) => {
    try {
      setProgressVerifyVis(true)
      const codesStr = codes.join('')
      await userService.verifyOTP({ email: currentUser.email, otp: codesStr })

      // if the code is correct -> redirect to the redirectPath
      navigateTo(redirectPath, { replace: true })
      setProgressVerifyVis(false)
    } catch (error) {
      // other errors
      dispatch(
        showMessage({
          message: (error as Error).message,
          variants: 'error'
        })
      )
      setProgressVerifyVis(false)
    }
  }

  const { InputCodeElement, inputCodes, dirties } = useVerifyOTP({
    onSubmitCode: handleSubmitCode,
    length: 6
  })

  return !currentUser.email ? (
    <Navigate to="/verify-email" state={{ isShortageEmail: true }} />
  ) : (
    <div className="input-otp-section">
      {/* <CustomStepper steps={steps} active={1} /> */}
      <div className="input-otp-section__content">
        <div className="input-otp-section__image">
          <img src="/img/mail-notify.png" alt="" />
        </div>
        <div className="input-otp-section__text">
          <p className="input-otp-section__title">Verify your email</p>
          <div className="input-otp-section__sub-title">
            <span>We emailed you a six digit code to </span>
            <div className="input-otp-section__mail-group">
              <span className="mail">{currentUser.email}</span>
              <span
                className="input-otp-section__change-mail-icon"
                onClick={() => navigateTo('..')}
              >
                <MdOutlineChangeCircle />
              </span>
            </div>
          </div>
          <p className="input-otp-section__sub-title">
            Enter the cod below to verify your email address
          </p>
        </div>
        {InputCodeElement}
        <div className="input-otp-section__input-action">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ maxWidth: '500px' }}
            onClick={() => handleSubmitCode(inputCodes)}
            disabled={!dirties.every((i) => i === true) || progressVerifyVis}
          >
            {progressVerifyVis ? (
              <CircularProgress
                size="30px"
                sx={{ color: (theme) => theme.palette.white.main }}
              />
            ) : (
              'Verify'
            )}
          </Button>
          <p className="input-otp-section__resend-group">
            You didn't receive the code?{' '}
            {current > 0 ? (
              <span className="input-otp-section__placeholder-counter">
                {`You can resend code in ${current} seconds`}
              </span>
            ) : (
              <Button
                variant="text"
                color="primary"
                sx={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '43px',
                  fontSize: '16px',
                  py: 0,
                  '@media screen and (max-width:900px)': {
                    fontSize: '12px'
                  }
                }}
                onClick={handleResendOTP}
              >
                {progressResendVis ? (
                  <CircularProgress
                    size="30px"
                    // sx={{ color: (theme) => theme.palette.white.main }}
                  />
                ) : (
                  'Resend'
                )}
              </Button>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
export default InputOTPSection
