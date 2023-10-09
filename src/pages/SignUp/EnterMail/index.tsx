import { Button, CircularProgress } from '@mui/material'
import { MdOutlineMailOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

// components
import TextInput from '~/components/TextInput'
import AnimPic from '../components/AnimPic'
import InputWithController from '~/components/InputWithController'
import CustomizedSnackbars from '~/components/SnackBar'
import GoogleSignInButton from '../components/GoogleSignInButton'

// styles
import './style.scss'

// api
import { userApi } from '~/services/apis'
import axios from 'axios'
import emailRequestBody from './emailRequestBody'
import IFormFields from './IFormFields'
import ISendOTPResponse from './ISendOTPResponse'

// form validate
import formSchema from './formSchema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const EnterMail = ({
  defaultEmail,
  onSubmitEmail
}: {
  defaultEmail: string
  onSubmitEmail: (value: string) => void
}) => {
  const navigateTo = useNavigate()

  // manage progress bar visibility
  const [progressVisibility, setProgressVisibility] = useState(false)

  // manage error snackbar visibility
  const [errorBarVisibility, setErrorBarVisibility] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // form controller from react-hook
  const { control, handleSubmit } = useForm<IFormFields>({
    defaultValues: { email: defaultEmail },
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    reValidateMode: 'onBlur'
  })

  const { sendOTP } = userApi
  const { subject, message } = emailRequestBody()

  const onSubmit: SubmitHandler<IFormFields> = async (formData) => {
    try {
      setProgressVisibility(true)
      const res = await axios.post<ISendOTPResponse>(
        sendOTP.url,
        sendOTP.body(formData.email, subject, message)
      )

      // Send OTP success
      if (res.status === 201) {
        onSubmitEmail(formData.email)
        navigateTo('./confirm-mail')
      }
    } catch (error) {
      setProgressVisibility(false)

      // error: user exists already
      // setErrorMessage('Cannot send OTP to this email! Try another one!')
      // setErrorBarVisibility(true)

      // other errors
      setErrorMessage('Something went wrong! Please try later.')
      setErrorBarVisibility(true)
    } finally {
      setProgressVisibility(false)
    }
  }

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
          <GoogleSignInButton />
          <div className="divider">Or</div>
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
      {errorBarVisibility && (
        <CustomizedSnackbars
          message={errorMessage}
          isShow={errorBarVisibility}
          onClose={() => {
            setErrorBarVisibility(false)
          }}
        />
      )}
      <AnimPic />
    </div>
  )
}
export default EnterMail
