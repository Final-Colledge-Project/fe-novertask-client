import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MdOutlineChangeCircle } from 'react-icons/md'
import CustomStepper from '../components/Stepper'
import Button from '@mui/material/Button'
import './style.scss'
import useInterval from '~/hooks/useInterval'

import { userApi } from '~/services/apis'
import IVerifyResponse from './IVerifyResponse'
import axios from 'axios'
import CustomizedSnackbars from '~/components/SnackBar'
import { CircularProgress } from '@mui/material'

import emailRequestBody from './emailRequestBody'
import ISendOTPResponse from './ISendOTPResponse'
import { userService } from '~/services'

const ConfirmMail = ({ email }: { email: string }) => {
  const navigateTo = useNavigate()
  useEffect(() => {
    if (!email) {
      navigateTo('/sign-up')
    }
  }, [email])
  const steps = ['Enter email', 'Verify email', 'Finish profile']
  const ref = useRef<HTMLDivElement | null>(null)
  const [inputCodes, setInputCodes] = useState<Array<number>>([
    0, 0, 0, 0, 0, 0
  ])
  const [inputs, setInputs] = useState<Array<HTMLInputElement>>()
  const [dirties, setDirties] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
    false,
    false
  ])

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

  const focusInputAt = (index: number, type: 'next' | 'back') => {
    if (inputs !== undefined) {
      // turn focus into the next right box of current index
      if (type === 'next') {
        if (index >= inputs.length - 1) {
          return
        }
        inputs[index + 1].focus()
      }

      // turn focus into the next left box of current index
      else {
        if (index <= 0) {
          return
        }
        inputs[index - 1].focus()
      }
    }
  }
  const handleInputCodes = (e: React.ChangeEvent, index: number) => {
    setInputCodes((prev) => {
      const newCodes = [...prev]
      const inputType = (e.nativeEvent as InputEvent).inputType

      // case: pressed key is Backspace
      if (inputType === 'deleteContentBackward') {
        newCodes[index] = 0

        // check if the current box have value -> stay focus
        // otherwise, turn focus back to the next left box
        if (!dirties[index]) {
          focusInputAt(index, 'back')
        } else {
          setDirties((prev) => {
            const newState = [...prev]
            newState[index] = false
            return newState
          })
        }

        return newCodes
      }

      // Case: Pressed key is digit
      const toData = (e.nativeEvent as InputEvent).data
      if (toData !== null && toData.match(/^[0-9]$/)) {
        newCodes[index] = +toData

        // Turn focus to the next right box
        focusInputAt(index, 'next')

        setDirties((prev) => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }
      return newCodes
    })
  }

  const handleSubmitCode = async () => {
    if (dirties.every((i) => i)) {
      try {
        setProgressVerifyVis(true)
        const codesStr = inputCodes.join('')
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
  }
  useEffect(() => {
    if (ref.current?.children) {
      const children = Array.from(ref.current.children)
      setInputs(children.map((child) => child as HTMLInputElement))
    }
  }, [])
  useEffect(() => {
    if (inputs !== undefined) {
      inputs[0].focus()
    }
  }, [inputs])

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'Enter':
        handleSubmitCode()
        break
      case 'ArrowRight':
        focusInputAt(index, 'next')
        break
      case 'ArrowLeft':
        focusInputAt(index, 'back')
        break
    }
  }
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
        <div className="input-box-group" ref={ref}>
          {inputCodes.map((c, i) => (
            <input
              key={`input-box-${i}`}
              pattern="[0-9]*"
              step={1}
              type="text"
              name="digit-1"
              id="digit-1"
              placeholder="0"
              className={clsx('input-box', dirties[i] ? 'dirty' : '')}
              value={inputCodes[i]}
              onChange={(e) => handleInputCodes(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>
        <div className="input-action">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ maxWidth: '500px' }}
            onClick={handleSubmitCode}
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
