import { Avatar, Chip } from '@mui/material'
import './style.scss'
import { INotification } from '~/services/types'
import dayjs from 'dayjs'
import { getRecordTime } from '~/utils/helper'
import clsx from 'clsx'
import { Navigate } from 'react-router-dom'
const NotificationItem = (props: INotification) => {
  const {
    sender,
    type,
    message,
    targetType,
    contextUrl,
    isRead,
    createAt,
    updatedAt
  } = props
  const createdDate = dayjs(createAt)
  const updatedDate = dayjs(updatedAt)
  const timeNoti =
    updatedDate.diff(createdDate, 'hour') > 0 ? updatedAt : createAt
  const displayTime = getRecordTime(timeNoti)
  const handleOnClick =() => {
    window.open(contextUrl, '_self')
  }
  return (
    
    <div className={clsx('noti-item', !isRead && 'noti-item-unread')} onClick={handleOnClick}>
      <div className="noti-avatar">
        <Avatar alt={sender.fullName} src={sender.avatar} />
      </div>
      <div className="noti-body">
        <div className="noti-content">
          <span>
            <b>{sender.fullName}</b> {message} <b>{targetType}</b>
          </span>
          <div className="noti-unreadDot"></div>
        </div>
        <div className="noti-footer">
          <div className="noti-time">{displayTime}</div>
          <div className="noti-dot"></div>
          <div className="noti-type">{type.name}</div>
        </div>
        <div className="noti-tag">
          <Chip
            label={type.category}
            variant="outlined"
            sx={{
              height: '20px',
              borderRadius: '5px',
              '& .MuiChip-label': {
                padding: '0px 8px'
              },
              color: '#FF9500',
              borderColor: '#FF9500'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default NotificationItem
