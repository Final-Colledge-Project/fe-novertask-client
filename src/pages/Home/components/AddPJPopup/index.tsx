import { useRef, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import clsx from 'clsx'

// component libraries
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { RiCloseFill } from 'react-icons/ri'

// components
import TextInput from '~/components/TextInput'
import './style.scss'
import WithController from '~/components/InputWithController'
import IFormFields from './IFormFields'
import schema from './formSchema'
import WSSelectBox from './WSSelectBox'

// services
import { StoreDispatchType, StoreType } from '~/redux'
import { setPopupAddPJ } from '~/redux/popupSlice'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { createBoard } from '~/services/boardService'
import { getAllByUserId } from '~/redux/boardSlice/actions'
import { setShouldReloadAllBoard } from '~/redux/boardSlice'

const AddPJPopup = () => {
  const dispatch = useDispatch<StoreDispatchType>()

  const { PopupAddPJ } = useSelector((state: StoreType) => state.popup)
  const { boards } = useSelector((state: StoreType) => state.board)

  const isFirstFocus = useRef(true)

  const getWorkspaces = () => {
    if (boards) {
      const result = boards?.map((w) => ({
        _id: w._id,
        name: w.name
      }))
      return result
    }
  }

  const { control, handleSubmit, reset } = useForm<IFormFields>({
    defaultValues: {
      PJName: '',
      workspace: '',
      description: ''
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const handleClose = () => {
    reset()
    dispatch(
      setPopupAddPJ({
        show: false,
        data: {
          currentWsID: undefined
        }
      })
    )
  }

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      dispatch(showLoading)
      const res = await createBoard({
        description: data.description,
        title: data.PJName,
        teamWorkspaceId: data.workspace
      })
      // if create board is successful -> load all boards again
      if (res && res.data) {
        // refresh board aat dashboard
        dispatch(getAllByUserId())

        // refresh board at workspace detail if id is specified
        PopupAddPJ.data.currentWsID && dispatch(setShouldReloadAllBoard(true))

        enqueueSnackbar(`Create successfully board ${data.PJName}.`, {
          variant: 'success'
        })
        handleClose()
      }
    } catch (err) {
      const message = (err as AxiosError).message
      if (message === 'UNAUTHORIZED') {
        enqueueSnackbar(
          'You are not an admin to create board in this workspace.',
          {
            variant: 'error'
          }
        )
      } else {
        enqueueSnackbar((err as AxiosError).message, {
          variant: 'error'
        })
      }
    } finally {
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    isFirstFocus.current = false
  }, [])

  const workspaceNameList = () => {
    if (PopupAddPJ.data.currentWsID) {
      const selectedWS = getWorkspaces()?.find(
        (w) => w._id === PopupAddPJ.data.currentWsID
      )
      return [
        {
          _id: selectedWS?._id as string,
          name: selectedWS?.name as string
        }
      ]
    } else return getWorkspaces()
  }

  return (
    <div
      className={clsx(
        'add-pj-popup',
        !PopupAddPJ.show && 'add-pj-popup--hidden'
      )}
      onClick={handleClose}
    >
      <div
        className="add-pj-popup__container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="add-pj-popup__picture">
          <div className="inner">
            <img src="/img/workspace.gif" alt="" />
          </div>
          <div className="outlined-div"></div>
          <div className="filled-div"></div>
        </div>
        <form className="add-pj-popup__form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="add-pj-popup__title">Create a new project</h1>

          <div className="add-pj-popup__input-row">
            <WithController control={control} name="PJName">
              <TextInput
                autofocus={isFirstFocus.current}
                label="Name of the new workspace"
                placeHolder="Some example names..."
              />
            </WithController>
          </div>
          <div className="add-pj-popup__input-row">
            <WithController name="workspace" control={control}>
              <WSSelectBox workspaces={workspaceNameList() || []} />
            </WithController>
          </div>
          <div className="add-pj-popup__input-row">
            <WithController name="description" control={control}>
              <TextInput label="Description" multiple row={3} />
            </WithController>
          </div>
          <div className="add-pj-popup__actions">
            <Button variant="text" color="warning" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Create project
            </Button>
          </div>
          <div className="add-pj-popup__close">
            <IconButton aria-label="close" onClick={handleClose}>
              <RiCloseFill />
            </IconButton>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddPJPopup
