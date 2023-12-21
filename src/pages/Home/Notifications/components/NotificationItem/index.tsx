import { Avatar, Chip } from '@mui/material'
import './style.scss'
const NotificationItem = () => {
  return (
    <div className="noti-item">
      <div className="noti-avatar">
        <Avatar
          alt="User"
          src="https://firebasestorage.googleapis.com/v0/b/nover-task-b511e.appspot.com/o/files%2FAnnie.jpg?alt=media&token=eaa049a5-7928-466d-b882-f0764a87dbf3"
        />
      </div>
      <div className="noti-body">
        <div className="noti-content">
          <span>
            Annie has assigned you to task <b>Task 1</b>
          </span>
          <div className='noti-unreadDot'></div>
        </div>
        <div className="noti-footer">
          <div className="noti-time">2 hours ago</div>
          <div className="noti-dot"></div>
          <div className="noti-type">Board Name</div>
        </div>
        <div className="noti-tag">
          <Chip
            label="Board"
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
