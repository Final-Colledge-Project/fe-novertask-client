import WorkSpaceSummary from '../components/WorkSpaceSummary'
import './style.scss'
import SearchBox from '~/components/SearchBox'
import MenuPopup from './MenuPopup'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { enqueueSnackbar } from 'notistack'
import { hideLoading, showLoading } from '~/redux/progressSlice'
import { setPopupAddPJ, setPopupAddWS } from '~/redux/popupSlice'
import { getFakeData } from '~/services/workspaceService'
import { IWSSummary } from '~/services/types'

const DashBoardMain = () => {
  const {
    currentTeamWS,
    createWS: { error, loading }
  } = useSelector((state: StoreType) => state.teamWorkspace)

  const dispatch = useDispatch()

  const [workspaceDatas, setWorkspaceDatas] = useState<IWSSummary[]>([])

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

  useEffect(() => {
    if (loading) {
      dispatch(showLoading())
    } else {
      dispatch(hideLoading())
    }
  }, [loading])

  useEffect(() => {
    dispatch(showLoading())
    try {
      const getData = async () => {
        const res = await getFakeData()
        if (res) {
          setWorkspaceDatas(res as IWSSummary[])
          dispatch(hideLoading())
        }
      }
      getData()
    } catch (err) {
      console.log(err)
      dispatch(hideLoading())
    }
  }, [])

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
      {workspaceDatas.map((workspace) => (
        <WorkSpaceSummary data={workspace} />
      ))}
      {currentTeamWS &&
        currentTeamWS.map((workspace) => (
          <WorkSpaceSummary
            data={{
              title: workspace.name,
              projects: [],
              id: workspace.id
            }}
          />
        ))}
    </div>
  )
}
export default DashBoardMain
