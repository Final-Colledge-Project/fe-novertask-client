import { useDispatch, useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

// components libraries
import { Button, IconButton } from '@mui/material'
import { RiCloseLine, RiLoopRightLine } from 'react-icons/ri'

// components
import TextInput from '~/components/TextInput'
import {
  Avatar,
  AvatarError,
  Form,
  FormActionsGroup,
  InfoSection,
  Input,
  InputGroup,
  UpdateAvatarSection,
  UploadActions,
  VisuallyHiddenInput
} from './style'
import DateInput from '~/components/DateInput'
import WithController from '~/components/InputWithController'

// services
import schema from './schema'
import { StoreDispatchType, StoreType } from '~/redux'
import IFormFields from './IFormFields'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { updateUser, uploadAvatar } from '~/redux/authSlice/actions'
import { resetUpdateUser as resetUpdateUserProcess } from '~/redux/authSlice'

export default function GeneralInfomation() {
  const MAX_FILE_ALLOWED_IN_MB = 2
  const ALLOWED_FILE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/jpg'
  ]

  const { userInfo: currentUserInfo, updateUser: updateUserState } =
    useSelector((state: StoreType) => state.auth)

  const dispatch = useDispatch<StoreDispatchType>()

  const [imageUrl, setImageUrl] = useState(currentUserInfo?.avatar || '')
  const [file, setFile] = useState<File>()
  const [errorOfImage, setErrorOfImage] = useState<string | undefined>()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      const reader = new FileReader()

      // File type validation
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        enqueueSnackbar(
          'Invalid file type. Please upload a JPEG, PNG, JPG or GIF image.',
          { variant: 'error' }
        )
        return
      }

      // check max size
      if (file.size > MAX_FILE_ALLOWED_IN_MB * 1024 * 1024) {
        // use message at avatar -> quite confusing
        // use message at alert -> easier to aware
        enqueueSnackbar(
          `File size exceeds ${MAX_FILE_ALLOWED_IN_MB} MB. Please choose a smaller file.`,
          { variant: 'error' }
        )
        return
      }

      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }

      setFile(file)
      setErrorOfImage('')
      reader.readAsDataURL(file)
      event.target.value = ''
    }
  }

  const handleCancel = () => {
    setFile(undefined)
    setErrorOfImage('')
    setImageUrl(currentUserInfo?.avatar || '')
  }

  const clearErrorOfImage = () => {
    setErrorOfImage('')
  }

  const handleUpdateAvatarSuccess = () => {
    setFile(undefined)
    setErrorOfImage('')
  }

  const submitAvatar = async () => {
    if (file) {
      try {
        dispatch(showLoading())

        await dispatch(uploadAvatar({ avatar: file }))

        handleUpdateAvatarSuccess()
        enqueueSnackbar('Update avatar successfully!', { variant: 'success' })

      } catch (err) {
        enqueueSnackbar((err as AxiosError).message)
      } finally {
        dispatch(hideLoading())
      }
    }
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty: IsFormDirty }
  } = useForm<IFormFields>({
    defaultValues: {
      address: currentUserInfo?.address,
      birthDate: dayjs(currentUserInfo?.birthDate) as unknown as string,
      firstName: currentUserInfo?.firstName,
      lastName: currentUserInfo?.lastName,
      phone: currentUserInfo?.phone
    },
    mode: 'onTouched',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {

    try {
      dispatch(showLoading())

      const formattedData = {
        ...data,
        birthDate: dayjs(data.birthDate).format('YYYY-MM-DD')
      }

      await dispatch(updateUser(formattedData))

    } catch (error) {
      // show error message on snack bar
      enqueueSnackbar((error as Error).message, {
        variant: 'error'
      })
    } finally {
      dispatch(hideLoading())
    }
  }

  useEffect(() => {

    if (updateUserState.error) {
      enqueueSnackbar(updateUserState.error, { variant: 'error' })
      dispatch(resetUpdateUserProcess())
    }

  }, [updateUserState.error])

  useEffect(() => {

    if (updateUserState.success) {
      enqueueSnackbar("Update user's information successfully!", {
        variant: 'success'
      })
      dispatch(resetUpdateUserProcess())
      reset({
        address: currentUserInfo?.address,
        birthDate: dayjs(currentUserInfo?.birthDate) as unknown as string,
        firstName: currentUserInfo?.firstName,
        lastName: currentUserInfo?.lastName,
        phone: currentUserInfo?.phone
      })
    }

  }, [updateUserState.success])

  return (
    <InfoSection>
      <p className="info-section__title">General information</p>

      <div className="info-section__form-group">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Input>
              <p className="label">First name</p>
              <WithController control={control} name="firstName">
                <TextInput label="" sx={{ height: '35px' }} />
              </WithController>
            </Input>

            <Input>
              <p className="label">Last name</p>
              <WithController control={control} name="lastName">
                <TextInput label="" sx={{ height: '35px' }} />
              </WithController>
            </Input>
          </InputGroup>

          <Input>
            <p className="label">Email</p>
            <TextInput
              label=""
              sx={{ height: '35px' }}
              disabled
              value={currentUserInfo?.email}
            />
          </Input>

          <Input>
            <p className="label">Phone</p>
            <WithController control={control} name="phone">
              <TextInput label="" sx={{ height: '35px' }} />
            </WithController>
          </Input>

          <Input>
            <p className="label">Birth date</p>
            <WithController control={control} name="birthDate">
              <DateInput label="" sx={{ height: '35px' }} disableFuture/>
            </WithController>
          </Input>

          <Input>
            <p className="label">Address</p>
            <WithController control={control} name="address">
              <TextInput label="" sx={{ height: '35px' }} />
            </WithController>
          </Input>

          <FormActionsGroup>
            <Button
              color="error"
              variant="outlined"
              onClick={() => reset()}
              disabled={!IsFormDirty}
            >
              Cancel
            </Button>

            <Button type="submit" variant="contained" disabled={!IsFormDirty}>
              Update
            </Button>
          </FormActionsGroup>
        </Form>
        <UpdateAvatarSection>
        <p className="label">Profile avatar</p>
          <Avatar>
            <img src={imageUrl} alt="" />

            <Button
              component="label"
              variant="contained"
              startIcon={<RiLoopRightLine />}
              size="small"
              className="change-avatar-button"
              sx={{
                minWidth: 0,
                padding: '10px',
                borderRadius: '50px',
                '& .MuiButton-startIcon': {
                  margin: '0'
                }
              }}
            >
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileUpload}
                accept="image/*"
              />
            </Button>
          </Avatar>

          {errorOfImage && (
            <AvatarError>
              <p>{errorOfImage}</p>

              <IconButton
                onClick={clearErrorOfImage}
                size="small"
                className="close-error-button"
              >
                <RiCloseLine />
              </IconButton>
            </AvatarError>
          )}

          {file && (
            <UploadActions>
              <Button color="error" variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>

              <Button
                color="primary"
                variant="contained"
                onClick={submitAvatar}
              >
                Upload
              </Button>
            </UploadActions>
          )}
        </UpdateAvatarSection>
      </div>
    </InfoSection>
  )
}
