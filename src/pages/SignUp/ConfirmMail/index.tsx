import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// components
import { MdOutlineChangeCircle } from 'react-icons/md'
import CustomStepper from '../components/Stepper'
import Button from '@mui/material/Button'
import CustomizedSnackbars from '~/components/SnackBar'
import { CircularProgress } from '@mui/material'

// styles
import './style.scss'

// services
import { userService } from '~/services'
import useInterval from '~/hooks/useInterval'

// OTP Input Group
import useOTPInputGroup from './useOTPInputGroup'

const ConfirmMail = ({ email }: { email: string }) => {
  const navigateTo = useNavigate()
  useEffect(() => {
    if (!email) {
      navigateTo('/sign-up')
    }
  }, [email])
  const steps = ['Enter email', 'Verify email', 'Finish profile']

  // Manage progress bar
  const [progressVerifyVis, setProgressVerifyVis] = useState(false)
  const [progressResendVis, setProgressResendVis] = useState(false)

  // Manage snack bar
  const [snackBarVisibility, setSnackBarVisibility] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState('')

  const [counter, setCounter] = useState(60)
  useInterval(() => {
    setCounter((count) => count - 1)
  }, 1000)

  const handleResendOTP = async () => {
    try {
      setProgressResendVis(true)
      await userService.sendOTP({ email })
      setCounter(60)
    } catch (error) {
      // show error message on snack bar
      setSnackBarMessage((error as Error).message)
      setSnackBarVisibility(true)
    } finally {
      setProgressResendVis(false)
    }
  }

  const handleSubmitCode = async (codes: number[]) => {
    try {
      setProgressVerifyVis(true)
      const codesStr = codes.join('')
      await userService.verifyOTP({ email, otp: codesStr })
      navigateTo('/sign-up/finish-profile', { replace: true })
      setProgressVerifyVis(false)
    } catch (error) {
      // other errors
      setSnackBarMessage((error as Error).message)
      setSnackBarVisibility(true)
      setProgressVerifyVis(false)
    }
  }

  const { InputCodeElement, inputCodes, dirties } = useOTPInputGroup({
    handleSubmitCode
  })

  return (
    <div className="confirm-container">
      <CustomStepper steps={steps} active={1} />
      <div className="confirm-content">
        <div className="image">
          <img src="/img/mail-notify.png" alt="" />
        </div>
        <div className="text">
          <p className="title">Verify your email</p>
          <div className="sub-title">
            <span>We emailed you a six digit code to </span>
            <div className="mail-group">
              <span className="mail">{email}</span>
              <span
                className="change-mail-icon"
                onClick={() => navigateTo('/sign-up')}
              >
                <MdOutlineChangeCircle />
              </span>
            </div>
          </div>
          <p className="sub-title">
            Enter the cod below to verify your email address
          </p>
        </div>
        {InputCodeElement}
        <div className="input-action">
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
          <p className="resend-group">
            You didn't receive the code?{' '}
            {counter > 0 ? (
              <span className="placeholder-counter">
                {`You can resend code in ${counter} seconds`}
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
      {snackBarVisibility && (
        <CustomizedSnackbars
          message={snackBarMessage}
          isShow={snackBarVisibility}
          onClose={() => {
            setSnackBarVisibility(false)
          }}
        />
      )}
    </div>
  )
}
export default ConfirmMail
