import Tooltip from '@mui/material/Tooltip'
import { RiInformationLine } from 'react-icons/ri'

const PublicButtonTooltip = () => {
  return (
    <Tooltip arrow title={<TooltipTitle />}>
      <div className="tooltip-icon">
        <RiInformationLine />
      </div>
    </Tooltip>
  )
}

const TooltipTitle = () => {
  return (
    <ul>
      <li>
        <b>Public:</b> everyone in workspace can see
      </li>
      <li>
        <b>Private:</b> only those who are in this project can see
      </li>
    </ul>
  )
}

export default PublicButtonTooltip
