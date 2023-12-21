import Badge from '@mui/material/Badge'
import { RiNotificationFill } from 'react-icons/ri'
const NotificationBadge = () => {
  return (
    <div>
      <Badge
        badgeContent="1"
        color="error"
        sx={{
          '& .MuiBadge-badge': {
            fonSize: '10px !important',
            width: 'fit-content',
            padding: '1px'
          }
        }}
      >
        <RiNotificationFill />
      </Badge>
    </div>
  )
}
export default NotificationBadge
