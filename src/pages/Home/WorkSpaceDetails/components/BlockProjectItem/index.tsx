import IconButton from '@mui/material/IconButton'
import { RiFlagLine, RiMore2Fill } from 'react-icons/ri'
import IWSItemProps from './IWSItemProps'
import { Item, ItemCover } from './styles'
import { BsPerson } from 'react-icons/bs'
import Tooltip from '@mui/material/Tooltip'
import clsx from 'clsx'

const WorkSpaceItem = ({ data }: IWSItemProps) => {
  // clean up members list -> avoid dupicates
  const count = [...data.memberIds, ...data.ownerIds].filter(
    (member, index, all) => index === all.findIndex((obj) => obj === member)
  ).length

  return (
    <Item>
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
        {/* <div className="item__cover-fallback"></div> */}
      </ItemCover>
      <div className="item-bottom">
        <div className="item-bottom__info-group">
          {data.dueDate ? (
            <div className="item__estimate">
              <RiFlagLine />
              <p>{data.dueDate}</p>
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
