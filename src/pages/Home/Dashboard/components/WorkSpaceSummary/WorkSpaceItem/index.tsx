import './style.scss'
import IconButton from '@mui/material/IconButton'
import { RiFlagLine, RiMore2Fill } from 'react-icons/ri'
import { BsPerson } from 'react-icons/bs'
import IWSItemProps from './IWSItemProps'

const WorkSpaceItem = ({ data }: IWSItemProps) => {
  const { title, cover, dueDate, ownerIds, memberIds } = data
  return (
    <div className="workspace-summary-item">
      <div className="item-header">
        <div className="item-header__title">{title}</div>
        <IconButton
          aria-label="more"
          sx={{
            p: '2px'
          }}
        >
          <RiMore2Fill />
        </IconButton>
      </div>
      <div className="item__cover">
        <img src={cover || '/img/item-cover.jpg'} alt="" />
        {/* <div className="item__cover-fallback"></div> */}
      </div>
      <div className="item-bottom">
        {/* <div className="item-bottom__task-progress">
          <div className="progress-text">
            <p className="progress-text__title">Task progress</p>
            <p className="progress-text__number">
              {completeTask}/{totalTask}
            </p>
          </div>
          <div className="progress__bar">
            <BorderLinearProgress
              variant="determinate"
              value={(completeTask / totalTask) * 100}
            />
          </div>
        </div> */}
        <div className="item-bottom__info-group">
          {dueDate ? (
            <div className="item__estimate">
              <RiFlagLine />
              <p>{dueDate}</p>
            </div>
          ) : (
            <div></div>
          )}
          <div className="item__avatar-group">
            <BsPerson />
            <p>{[...ownerIds, ...memberIds].length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default WorkSpaceItem
