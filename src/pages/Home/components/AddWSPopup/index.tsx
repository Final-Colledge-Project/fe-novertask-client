import TextInput from '~/components/TextInput'
import './style.scss'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { RiCloseFill } from 'react-icons/ri'
import clsx from 'clsx'
import { SubmitHandler, useForm } from 'react-hook-form'
import WithController from '~/components/InputWithController'
import IFormFields from './IFormFields'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './formSchema'
import { useDispatch, useSelector } from 'react-redux'
import { createWS } from '~/redux/teamWSSlice/actions'
import { StoreDispatchType, StoreType } from '~/redux'
import { setPopupAddWS } from '~/redux/popupSlice'
import { useEffect } from 'react'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { enqueueSnackbar } from 'notistack'
import { resetCreateWS } from '~/redux/teamWSSlice'

const AddWSPopup = () => {
  const dispatch = useDispatch<StoreDispatchType>()

  const handleClose = () => {
    dispatch(setPopupAddWS(false))
  }

  const { PopupAddWS } = useSelector((state: StoreType) => state.popup)

  const { control, handleSubmit, getValues } = useForm<IFormFields>({
    defaultValues: {},
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    await dispatch(createWS({ name: data.WSName }))
  }

  const {
    createWS: { error, loading, success }
  } = useSelector((state: StoreType) => state.teamWorkspace)

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [error])

  useEffect(() => {
    if (loading) {
      dispatch(showLoading())
    } else {
      dispatch(hideLoading())
    }
  }, [loading])

  useEffect(() => {
    if (success) {
      enqueueSnackbar(`Create successfully workspace ${getValues('WSName')}`, {
        variant: 'success'
      })
      dispatch(resetCreateWS())
      handleClose()
    }
  }, [success])

  return (
    <div
      className={clsx('add-ws-popup', !PopupAddWS && 'add-ws-popup--hidden')}
      onClick={handleClose}
    >
      <div
        className="add-ws-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="add-ws-popup-picture">
          <div className="inner">
            <img src="/img/workspace.gif" alt="" />
          </div>
          <div className="outlined-div"></div>
          <div className="filled-div"></div>
        </div>
        <form className="add-ws-popup-form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="add-ws-popup-title">Create a cool workspace</h1>

          <WithController control={control} name="WSName">
            <TextInput
              autofocus={true}
              label="Name of the new workspace"
              placeHolder="Some example names..."
            />
          </WithController>
          <p className="add-ws-popup-subtitle">
            After creating successfully a new workspace, you will be the admin
            of it
          </p>
          <div className="add-ws-popup-actions">
            <Button variant="text" color="warning" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Create workspace
            </Button>
          </div>
          <div className="add-ws-popup-close">
            <IconButton aria-label="close" onClick={handleClose}>
              <RiCloseFill />
            </IconButton>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddWSPopup
