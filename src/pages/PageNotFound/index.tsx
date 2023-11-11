import { IoSettings, IoSettingsOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import './style.scss'
import Button from '@mui/material/Button'

const PageNotFound = () => {
  const navigateTo = useNavigate()

  return (
    <div className="page-not-found">
      <div className="page-not-found__logo">
        <img src="/img/novertask-logo-full.png" alt="" />
      </div>
      <div className="page-not-found__title">
        <span className="page-not-found__404">404</span>
        <div className="page-not-found__icon--filled">
          <IoSettings />
        </div>
        <div className="page-not-found__icon--outlined">
          <IoSettingsOutline />
        </div>
      </div>
      <h2 className="page-not-found__sub-title">Oops! Everything is okay,</h2>
      <h2 className="page-not-found__sub-title">
        But maybe this address is on his vacation ^_^
      </h2>
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
