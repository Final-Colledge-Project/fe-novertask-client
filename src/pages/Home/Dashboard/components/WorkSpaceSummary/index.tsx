import { RiAddLine } from 'react-icons/ri'
import IWSSummaryProps from './IWSSummaryProps'
import ToggleViewButton from './ToggleViewButton'
import WorkSpaceItem from './WorkSpaceItem'
import './style.scss'
import Button from '@mui/material/Button'

const WorkSpaceSummary = ({ data }: IWSSummaryProps) => {
  return (
    <div className="workspace-summary">
      <div className="workspace-summary-header">
        <div className="header-text">
          <p className="header-text-name">{data.title}</p>
          <p className="header-text-count">
            {' '}
            • {data.projects.length} projects
          </p>
        </div>
        <div className="header-divider"></div>
        <div className="header-show-type">
          <ToggleViewButton />
        </div>
      </div>
      <div className="workspace-summary-outlet">
        {data.projects.length > 0 ? (
          <div className="outlet-items-list">
            {data.projects.map((project) => (
              <WorkSpaceItem data={project} />
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
