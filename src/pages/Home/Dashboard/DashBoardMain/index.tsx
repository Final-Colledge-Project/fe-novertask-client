import './style.scss'
import SearchBox from '~/components/SearchBox'
import MenuPopup from './MenuPopup'
import { lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { enqueueSnackbar } from 'notistack'
import { setPopupAddPJ, setPopupAddWS } from '~/redux/popupSlice'
const Data = lazy(() => import('./Data'))

const DashBoardMain = () => {
  const {
    createWS: { error }
  } = useSelector((state: StoreType) => state.teamWorkspace)

  const dispatch = useDispatch()

  const addMenuItems = [
    {
      title: 'Add workspace',
      onChoose: () => {
        dispatch(setPopupAddWS(true))
      }
    },
    {
      title: 'Add project',
      onChoose: () => {
        dispatch(setPopupAddPJ(true))
      }
    },
    {
      title: 'Add task',
      onChoose: () => {}
    }
  ]

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [error])

  return (
    <div className="dashboard-main-container">
      <div className="dashboard-header">
        <h1 className="dashboard-header-title">Dashboard</h1>
        <div className="dashboard-header-searchbox">
          <SearchBox label="" />
        </div>
        <div className="dashboard-header-add-btn">
          <MenuPopup items={addMenuItems} />
        </div>
      </div>
      <Data />
    </div>
  )
}
export default DashBoardMain
