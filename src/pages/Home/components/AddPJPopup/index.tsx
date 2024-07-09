import { useRef, useEffect, useMemo, useState, useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import clsx from 'clsx'

// component libraries
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { RiCloseFill, RiInformationLine } from 'react-icons/ri'

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
import { useNavigate } from 'react-router-dom'
import { getWSCanCreateBoard as getAllCanCreateBoard } from '~/services/workspaceService'
import { generateBusinessKey } from '~/utils/helper'
import { useDebounceCallback } from 'usehooks-ts'
import TemplateSelect from './TemplateSelect'
import { BOARD_TEMPLATES_LIST } from '~/utils/constant/board'
import { Tooltip } from '@mui/material'

const AddPJPopup = () => {
  const dispatch = useDispatch<StoreDispatchType>()
  const navigate = useNavigate()

  const { PopupAddPJ } = useSelector((state: StoreType) => state.popup)
  const { boards } = useSelector((state: StoreType) => state.board)
  const wsCanCreateBoardIdList = useRef<string[]>([])
  const [manuallyEditFlg, setManuallyEditFlg] = useState(false)

  const isFirstFocus = useRef(true)

  const getWorkspaces = () => {
    if (boards && wsCanCreateBoardIdList.current.length) {
      const result = boards?.map((w) => ({
        _id: w._id,
        name: w.name
      }))
      return result.filter((ws) =>
        wsCanCreateBoardIdList.current.includes(ws._id)
      )
    }
  }

  const { control, handleSubmit, reset, watch, setValue, register } =
    useForm<IFormFields>({
      defaultValues: {
        PJName: '',
        workspace: '',
        description: '',
        template: ''
      },
      mode: 'onChange',
      resolver: yupResolver(schema),
      reValidateMode: 'onBlur'
    })

  register('PJKey', {
    onChange: (e) => {
      if (e.target.value) {
        setManuallyEditFlg(true)
      } else {
        setManuallyEditFlg(false)
      }
    }
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
      dispatch(showLoading())
      const res = await createBoard({
        description: data.description,
        title: data.PJName,
        teamWorkspaceId: data.workspace,
        template: data.template,
        key: data.PJKey
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
        navigate(`/u/boards/${res.data._id}`)
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

  const updateBoardKey = (name: string, shouldValidate: boolean) => {
    if (name) {
      const key = generateBusinessKey(name)
      setValue('PJKey', key, { shouldValidate })
    } else {
      setValue('PJKey', '')
    }
  }

  const debounced = useDebounceCallback(updateBoardKey, 500)
  const debouncedCallback = useCallback(debounced, [])
  const PJName = watch('PJName')
  const PJKey = watch('PJKey')

  useEffect(() => {
    const name = PJName
    if (!manuallyEditFlg) {
      if (name && name.length > 1) {
        debouncedCallback(PJName, false)
      } else {
        debouncedCallback('', false)
      }
    }
  }, [PJName])

  useEffect(() => {
    const key = PJKey
    const name = PJName

    // if key is empty, update key base on name
    if (!key) {
      if (name) {
        debouncedCallback(name, true)
      }
    }
  }, [PJKey])

  useEffect(() => {
    isFirstFocus.current = false
  }, [])

  useEffect(() => {
    getWSCanCreateBoard()

    return () => {
      wsCanCreateBoardIdList.current.length = 0
    }
  }, [PopupAddPJ.data, boards])

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

  const templatesList = () => {
    return Object.values(BOARD_TEMPLATES_LIST)
  }

  const getWSCanCreateBoard = async () => {
    wsCanCreateBoardIdList.current.length = 0
    try {
      const res = await getAllCanCreateBoard({})
      if (res && res.data) {
        wsCanCreateBoardIdList.current = res.data.map((ws) => ws._id)
      }
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  return (
    <div
      className={clsx(
        'add-pj-popup',
        !PopupAddPJ.show && 'add-pj-popup--hidden'
      )}
      onClick={handleClose}>
      <div
        className="add-pj-popup__container"
        onClick={(e) => e.stopPropagation()}>
        <div className="add-pj-popup__picture">
          <div className="inner">
            <img src="/img/workspace.gif" alt="" />
          </div>
          <div className="outlined-div"></div>
          <div className="filled-div"></div>
        </div>
        <form className="add-pj-popup__form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="add-pj-popup__title">Create a new board</h1>

          <div className="add-pj-popup__input-row">
            {/* BOARD NAME */}
            <WithController control={control} name="PJName">
              <TextInput
                autofocus={isFirstFocus.current}
                label="Name of the new project"
                placeHolder="Some example names..."
                sx={{ width: '300px' }}
              />
            </WithController>

            {/* BOARD KEY */}
            <WithController control={control} name="PJKey">
              <TextInput
                label={'Board key'}
                persistLabel={true}
                maxLength={10}
              />
            </WithController>
          </div>

          {/* WORKSPACE */}
          <div className="add-pj-popup__input-row">
            <WithController name="workspace" control={control}>
              <WSSelectBox workspaces={workspaceNameList() || []} />
            </WithController>
          </div>

          {/* WORKSPACE */}
          <div className="add-pj-popup__input-row">
            <WithController name="template" control={control}>
              <TemplateSelect templates={templatesList() || []} />
            </WithController>
          </div>

          {/* DESCRIPTION */}
          <div className="add-pj-popup__input-row">
            <WithController name="description" control={control}>
              <TextInput label="Description" multiple row={3} />
            </WithController>
          </div>

          <div className="info-group">
            <div className="info">
              <div className="icon">
                <RiInformationLine />
              </div>
              <div className="text">
                Board key is an identifier for your project. It can be change
                later. It defaults be generated from the project name.
              </div>
            </div>
          </div>

          <div className="add-pj-popup__actions">
            <Button variant="text" color="error" onClick={handleClose}>
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
