// package
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Component
import TextInput from '~/components/TextInput'
import CustomStepper from '../components/Stepper'
import './style.scss'
import PasswordInput from '~/components/PasswordInput'
import DateInput from '~/components/DateInput'
import InputWithController from '~/components/InputWithController'
import formSchema from './formSchema'
import IFormFields from './IFormField'
import TSignUpResponse from './TSignUpResponse'
import axios from 'axios'
import { userApi } from '~/services/apis'

import CustomizedSnackbars from '~/components/SnackBar'

import { useAuth } from '~/services/hooks/useAuth'

const FinishProfile = ({ email }: { email: string }) => {
  const auth = useAuth()
  const navigateTo = useNavigate()
  useEffect(() => {
    if (!email) {
      navigateTo('/sign-up')
    }
  }, [email])

  const { control, handleSubmit } = useForm<IFormFields>({
    defaultValues: {},
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    reValidateMode: 'onBlur'
  })
  const steps = ['Enter email', 'Verify email', 'Finish profile']
  // Manage progress bar visibility
  const [progressVisibility, setProgressVisibility] = useState(false)
  // Manage error snackbar visibility
  const [errorBarVisibility, setErrorBarVisibility] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { signUp } = userApi

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      setProgressVisibility(true)
      const date = data.birthday.getDate()
      const month = data.birthday.getMonth() + 1
      const year = data.birthday.getFullYear()
      const birthdayStr = `${year}-${month}-${date}`
      const { firstName, lastName, password, phone, address } = data

      const res = await axios.post<TSignUpResponse>(
        signUp.url,
        signUp.body(
          firstName,
          lastName,
          email,
          password,
          phone,
          birthdayStr,
          address
        )
      )

      if (res.status === 201) {
        setProgressVisibility(false)
        auth?.signIn(res.data.data.token)
        navigateTo('/home')
      }
    } catch (err) {
      // Catching errors
      setProgressVisibility(false)
      setErrorBarVisibility(true)
      console.log(err)
      setErrorMessage('Something went wrong! Please try again.')
    }
  }
  return (
    <div className="finish-root">
      <CustomStepper steps={steps} active={2} />
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
          <div className="title-group">
            <p className="title">Your're almost done</p>
            <p className="sub-title">
              Enter your information. You can edit it at anytime.
            </p>
          </div>
          <div className="input-group">
            <InputWithController name="firstName" control={control}>
              <TextInput label="First name" placeHolder="Alex" type="text" />
            </InputWithController>
            <InputWithController name="lastName" control={control}>
              <TextInput label="Last name" placeHolder="Joseph" type="text" />
            </InputWithController>
          </div>
          <div className="input-group">
            <InputWithController name="password" control={control}>
              <PasswordInput label="Password" />
            </InputWithController>
          </div>
          <div className="input-group">
            <InputWithController name="repeatPassword" control={control}>
              <PasswordInput label="Repeat Password" />
            </InputWithController>
          </div>
          <div className="input-group">
            <InputWithController name="phone" control={control}>
              <TextInput label="Phone" placeHolder="1234567890" type="text" />
            </InputWithController>
            <InputWithController name="birthday" control={control}>
              <DateInput label="Birthday" disableFuture />
            </InputWithController>
          </div>
          {/* <div className="input-group"></div> */}
          <div className="input-group">
            <InputWithController name="address" control={control}>
              <TextInput
                label="Address"
                placeHolder="Los Angeles"
                type="text"
              />
            </InputWithController>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={progressVisibility}
          >
            {progressVisibility ? (
              <CircularProgress
                size="30px"
                sx={{ color: (theme) => theme.palette.white.main }}
              />
            ) : (
              'Submit'
            )}
          </Button>
        </form>
        <div className="image">
          <img src="/img/finish-profile-pic.png" alt="" />
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
      </div>
    </div>
  )
}
export default FinishProfile
