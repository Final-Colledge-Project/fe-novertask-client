// package
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

// Component
import TextInput from '~/components/TextInput'
import CustomStepper from '../components/Stepper'
import PasswordInput from '~/components/PasswordInput'
import DateInput from '~/components/DateInput'
import InputWithController from '~/components/InputWithController'

// validate form
import formSchema from './formSchema'
import IFormFields from './IFormField'

// styles
import './style.scss'

import CustomizedSnackbars from '~/components/SnackBar'

import { useAuth } from '~/hooks/useAuth'
import { userService } from '~/services'

const FinishProfile = ({ email }: { email: string }) => {
  const auth = useAuth()
  const navigateTo = useNavigate()
  useEffect(() => {
    if (!email) {
      navigateTo('/sign-up')
    }
  }, [email])

  const toDateString = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }

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

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      setProgressVisibility(true)
      const birthdayStr = toDateString(data.birthday)

      const body = {
        ...data,
        email,
        birthDate: birthdayStr
      }

      const res = await userService.signUp(body)
      console.log(res)

      setProgressVisibility(false)
      auth?.signIn(res?.data.token as string)
      navigateTo('/home')
    } catch (err) {
      // show error message on snack bar
      setErrorMessage((err as Error).message)
      setErrorBarVisibility(true)
    } finally {
      setProgressVisibility(false)
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
