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
import { useState, useRef, useEffect } from 'react'
import WSSelectBox from './WSSelectBox'
import { SelectChangeEvent, Switch } from '@mui/material'
import workspaceDatas from '~/services/mockData.json'
import PublicButtonTooltip from './PublicButtonToolTip'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { setPopupAddPJ } from '~/redux/popupSlice'

const AddPJPopup = () => {
  const dispatch = useDispatch()
  const { PopupAddPJ } = useSelector((state: StoreType) => state.popup)
  console.log('✨ ~ file: index.tsx:24 ~ AddPJPopup ~ PopupAddPJ:', PopupAddPJ)

  const handleClose = () => {
    dispatch(setPopupAddPJ(false))
  }

  const { control, handleSubmit } = useForm<IFormFields>({
    defaultValues: { PJName: '', workspace: workspaceDatas[0].id },
    mode: 'onChange',
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      alert(
        `Project: ${data.PJName} added in workspace having id ${data.workspace}`
      )
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  const [choseWorkspace, setChoseWorkspace] = useState(workspaceDatas[0].id)
  const [isPublic, setIsPublic] = useState(true)
  const isFirstFocus = useRef(true)

  useEffect(() => {
    isFirstFocus.current = false
  }, [])

  const handleChangeWorkspace = (e: SelectChangeEvent) => {
    setChoseWorkspace(e.target.value)
  }

  const handleSwitchPublicButton = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsPublic(event.target.checked)
  }

  return (
    <div
      className={clsx('add-pj-popup', !PopupAddPJ && 'add-pj-popup--hidden')}
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
          {/* <p className="add-pj-popup__subtitle">
            After creating successfully a new project, you will be the admin of
            it
          </p> */}
          <div className="add-pj-popup__input-row">
            <WithController name="workspace" control={control}>
              <WSSelectBox
                value={choseWorkspace}
                handleChange={handleChangeWorkspace}
                workspaces={workspaceDatas.map((w) => ({
                  id: w.id,
                  name: w.title
                }))}
              />
            </WithController>
          </div>
          <label
            htmlFor="is-project-public"
            className="add-pj-popup__input-row"
          >
            <div className="switch-label">
              <span>Public this project</span>
              <PublicButtonTooltip />
            </div>
            <Switch
              id="is-project-public"
              checked={isPublic}
              onChange={handleSwitchPublicButton}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </label>
          <div className="add-pj-popup__actions">
            <Button variant="text" color="warning" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Create workspace
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
