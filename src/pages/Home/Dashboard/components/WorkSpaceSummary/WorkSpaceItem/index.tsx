import { useNavigate } from 'react-router-dom'

// component libraries
import IconButton from '@mui/material/IconButton'
import { RiFlagLine, RiMore2Fill } from 'react-icons/ri'
import { BsPerson } from 'react-icons/bs'

// components
import './style.scss'
import IWSItemProps from './IWSItemProps'

const WorkSpaceItem = ({ data }: IWSItemProps) => {
  const { title, cover, dueDate, ownerIds, memberIds, _id } = data
  const navigate = useNavigate()
  return (
    <div
      className="workspace-summary-item"
      onClick={() => {
        navigate('/u/boards/' + _id)
      }}
    >
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
      </div>
      <div className="item-bottom">
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
