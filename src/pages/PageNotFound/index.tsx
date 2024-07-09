import { IoSettings, IoSettingsOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import './style.scss'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { setErrorScreen } from '~/redux/systemSlice'
import copy from '~/utils/copy'
import { enqueueSnackbar } from 'notistack'
import { RiFileCopyLine } from 'react-icons/ri'

const PageNotFound = ({
  status,
  message: errorMessage
}: {
  status?: number
  message?: string
}) => {
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const { errorCode, message, showHomeButton } = useSelector(
    (state: StoreType) => state.system
  )
  const { status: paramStatus } = useParams()

  const onHomeButtonClick = () => {
    dispatch(setErrorScreen({ errorCode: undefined, message: undefined }))
    navigateTo('/')
  }

  const handleAddToClipBoard = async (value: string) => {
    await copy(value)
    enqueueSnackbar('Copied to clipboard!', { variant: 'success' })
  }

  return (
    <div className="page-not-found">
      <div className="page-not-found__logo">
        <img src="/img/novertask-logo-full.png" alt="" />
      </div>
      <div className="page-not-found__title">
        <span className="page-not-found__404">
          {errorCode || status || paramStatus}
        </span>
        <div className="page-not-found__icon--filled">
          <IoSettings />
        </div>
        <div className="page-not-found__icon--outlined">
          <IoSettingsOutline />
        </div>
      </div>
      <h2 className="page-not-found__sub-title">Oops! Something is wrong</h2>
      <h2 className="page-not-found__sub-title">{errorMessage || message}</h2>
      {showHomeButton && (
        <div className="page-not-found__button">
          <Button
            variant="contained"
            color="primary"
            onClick={onHomeButtonClick}>
            Back to home
          </Button>
        </div>
      )}
      <div className="page-not-found__emergency-text">
        <span>In case emergency, please contact </span>
        <a href="mailto:novertask@hotmail.com">novertask@hotmail.com</a>
        <div
          className="page-not-found__email-copy"
          onClick={() => handleAddToClipBoard('novertask@hotmail.com')}>
          <RiFileCopyLine />
        </div>
      </div>
    </div>
  )
}
export default PageNotFound
