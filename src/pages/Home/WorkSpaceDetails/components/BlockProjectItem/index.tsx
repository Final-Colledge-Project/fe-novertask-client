import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

// component libraries
import IconButton from '@mui/material/IconButton'
import { RiFlagLine, RiMore2Fill } from 'react-icons/ri'
import { Tooltip } from '@mui/material'
import { BsPerson } from 'react-icons/bs'

// components
import { Item, ItemCover } from './styles'

// services
import IWSItemProps from './IWSItemProps'
import dayjs from 'dayjs'

const WorkSpaceItem = ({ data }: IWSItemProps) => {
  // clean up members list -> avoid dupicates
  const count = [
    ...data.memberIds,
    ...data.ownerIds.map((item) => item._id)
  ].filter(
    (member, index, all) => index === all.findIndex((obj) => obj === member)
  ).length

  const navigate = useNavigate()

  return (
    <Item onClick={() => navigate('/u/boards/' + data._id)}>
      <ItemCover>
        <div className="item-header">
          <div className="item-header__title">
            <Tooltip title={'This board is ' + data.type} placement="top">
              <div
                className={clsx('circle', data.type === 'private' && 'private')}
              >
                {data.type}
              </div>
            </Tooltip>
            <p>{data.title}</p>
          </div>
          <IconButton
            aria-label="more"
            sx={{
              p: '2px',
              color: (theme) => theme.palette.white.main
            }}
          >
            <RiMore2Fill />
          </IconButton>
        </div>
        <img src={data.cover} alt="" />
      </ItemCover>
      <div className="item-bottom">
        <div className="item-bottom__info-group">
          {data.dueDate ? (
            <div className="item__estimate">
              <RiFlagLine />
              <p>{dayjs(data.dueDate).format('YYYY-DD-MM')}</p>
            </div>
          ) : (
            <div></div>
          )}
          <div className="item__avatar-group">
            <BsPerson />
            <p>{count}</p>
          </div>
        </div>
      </div>
    </Item>
  )
}
export default WorkSpaceItem
