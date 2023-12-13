import { useDispatch } from 'react-redux'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

// component libraries
import { Button } from '@mui/material'

// components
import {
  ChangePasswordContainer,
  Form,
  FormActionsGroup,
  Input
} from './styles'
import WithController from '~/components/InputWithController'
import PasswordInput from '~/components/PasswordInput'

// services
import IFormFields from './IFormFields'
import schema from './schema'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { changePassword } from '~/services/userService'
import { signOut } from '~/redux/authSlice/actions'
import { StoreDispatchType } from '~/redux'

export default function ChangePassword() {
  const dispatch = useDispatch<StoreDispatchType>()

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty: IsFormDirty }
  } = useForm<IFormFields>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: ''
    },
    mode: 'onTouched',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      dispatch(showLoading())

      const res = await changePassword(data)

      if (res && res.data) {

        // should sign out after change password successfully
        dispatch(signOut())

        enqueueSnackbar('Change password successfully! Please sign in again.', {
          variant: 'success'
        })
      }
    } catch (error) {

      // show error message on snack bar
      enqueueSnackbar((error as AxiosError).message, { variant: 'error' })

    } finally {
      dispatch(hideLoading())
    }
  }

  return (
    <ChangePasswordContainer>
      <p className="section__title">Change password</p>
      <p className="section__sub-title">
        After change password successfully, you must sign in again
      </p>

      <div className="info-section__form-group">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input>
            <p className="label">Current password</p>
            <WithController control={control} name="currentPassword">
              <PasswordInput label="" sx={{ height: '35px' }} />
            </WithController>
          </Input>

          <Input>
            <p className="label">New password</p>
            <WithController control={control} name="newPassword">
              <PasswordInput label="" sx={{ height: '35px' }} />
            </WithController>
          </Input>

          <Input>
            <p className="label">Repeat new password</p>
            <WithController control={control} name="repeatNewPassword">
              <PasswordInput label="" sx={{ height: '35px' }} />
            </WithController>
          </Input>

          <FormActionsGroup>
            <Button
              color="error"
              variant="outlined"
              disabled={!IsFormDirty}
              onClick={() => reset()}
            >
              Cancel
            </Button>

            <Button type="submit" variant="contained" disabled={!IsFormDirty}>
              Update
            </Button>
          </FormActionsGroup>
        </Form>
      </div>
    </ChangePasswordContainer>
  )
}
