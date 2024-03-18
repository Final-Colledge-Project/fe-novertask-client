import { IoSettings, IoSettingsOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import './style.scss'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'

const PageNotFound = ({
  status,
  message: errorMessage
}: {
  status?: number
  message?: string
}) => {
  const navigateTo = useNavigate()
  const { errorCode, message } = useSelector((state: StoreType) => state.system)
  const { status: paramStatus } = useParams()

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
      <div className="page-not-found__button">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigateTo('/')}
        >
          Back to home
        </Button>
      </div>
    </div>
  )
}
export default PageNotFound
