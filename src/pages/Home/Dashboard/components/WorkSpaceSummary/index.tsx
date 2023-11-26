import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

// component libraries
import { RiAddLine } from 'react-icons/ri'
import Button from '@mui/material/Button'

// components
import IWSSummaryProps from './IWSSummaryProps'
import ToggleViewButton from './ToggleViewButton'
import WorkSpaceItem from './WorkSpaceItem'
import './style.scss'

// services
import { setCurrentNavItem } from '~/redux/navSlice'
import { setPopupAddPJ } from '~/redux/popupSlice'
import { getMembers } from '~/services/workspaceService'
import { StoreType } from '~/redux'
import { useEffectOnce } from 'usehooks-ts'

const WorkSpaceSummary = ({ data }: IWSSummaryProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleNavigateToDetailWS = () => {
    dispatch(setCurrentNavItem(data._id))
    navigate(`/u/workspaces/${data._id}`)
  }

  const currentUser = useSelector((state: StoreType) => state.auth.userInfo)
  const [isAdmin, setIsAdmin] = useState(false)

  const handleOpenAddBoardPopup = () => {
    dispatch(
      setPopupAddPJ({
        show: true,
        data: {
          currentWsID: data._id
        }
      })
    )
  }

  useEffectOnce(() => {
    const getMember = async () => {
      try {
        const res = await getMembers({ id: data._id })
        if (res && res.data) {
          !!res.data.workspaceAdmins.find(
            (admin) => admin.user?._id === currentUser?._id
          ) && setIsAdmin(true)
        }
      } catch (err) {
        // ignore errors
      }
    }
    data.board?.length === 0 && getMember()
  })

  return (
    <div className="workspace-summary">
      <div className="workspace-summary-header">
        <div className="header-text">
          <p className="header-text-name" onClick={handleNavigateToDetailWS}>
            {data.name}
          </p>
          <p className="header-text-count">
            {' '}
            • {data.board?.length || 0} projects
          </p>
        </div>
        <div className="header-divider"></div>
        <div className="header-show-type">
          <ToggleViewButton />
        </div>
      </div>
      <div className="workspace-summary-outlet">
        {data.board && data.board.length > 0 ? (
          <div className="outlet-items-list">
            {data.board?.map((project) => (
              <WorkSpaceItem data={project} key={project._id} />
            ))}
          </div>
        ) : isAdmin ? (
          <div className="outlet-items-list--empty">
            <Button
              variant="contained"
              fullWidth
              className="glass-effect"
              onClick={handleOpenAddBoardPopup}
            >
              <RiAddLine />
            </Button>
          </div>
        ) : (
          <p className="placeholder">There is no projects here</p>
        )}
      </div>
    </div>
  )
}
export default WorkSpaceSummary
