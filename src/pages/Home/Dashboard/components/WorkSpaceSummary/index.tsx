import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

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

const WorkSpaceSummary = ({ data }: IWSSummaryProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleNavigateToDetailWS = () => {
    dispatch(setCurrentNavItem(data._id))
    navigate(`/u/home/workspaces/${data._id}`)
  }

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
        ) : (
          <div className="outlet-items-list--empty">
            <Button variant="contained" fullWidth className="glass-effect">
              <RiAddLine />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
export default WorkSpaceSummary
