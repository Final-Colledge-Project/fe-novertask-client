import Badge from '@mui/material/Badge'
import { useEffect, useState } from 'react'
import { RiNotification2Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
const NotificationBadge = () => {
  const { notifications } = useSelector(
    (state: StoreType) => state.notification
  )
  const { unRead } = notifications
  const [unReadNoti, setUnReadNoti] = useState(unRead || 0)
  useEffect(() => {
    setUnReadNoti(unRead)
  }, [unRead])

  return (
    <div>
      <Badge
        badgeContent={unReadNoti}
        color="error"
        sx={{
          '& .MuiBadge-badge': {
            fonSize: '10px !important',
            width: 'fit-content',
            padding: '1px'
          }
        }}
      >
        <RiNotification2Line />
      </Badge>
    </div>
  )
}
export default NotificationBadge
