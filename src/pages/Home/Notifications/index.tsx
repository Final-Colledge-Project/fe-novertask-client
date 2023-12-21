import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import './style.scss'
import { Box, Tab, Tabs } from '@mui/material'
import CustomTabPanel from './components/NotificationItem/CustomTabPanel'
import { SyntheticEvent, useState } from 'react'
import NotificationItem from './components/NotificationItem'

const Notification = () => {
  const dispatch = useDispatch<StoreDispatchType>()
  const { PopupNotification } = useSelector((state: StoreType) => state.popup)
  const [value, setValue] = useState(1)
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    PopupNotification && (
      <div className="notification">
        <div className="notification-header">
          <div style={{ fontSize: '20px', fontWeight: '700' }}>
            Notification
          </div>
          <span className="notification-markAll">Mark all as read</span>
        </div>
        <div className="notification-list">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              className="notification-tabs"
            >
              <Tab
                label="All"
                // icon={
                //   <Chip
                //     label="4"
                //     sx={{
                //       height: '20px',
                //       borderRadius: '5px',
                //       '& .MuiChip-label': {
                //         padding: '0px 8px'
                //       }
                //     }}
                //   />
                // }
                // iconPosition="end"
                value={1}
                sx={{
                  textTransform: 'none',
                  fontSize: '16px',
                  '& .MuiButtonBase-root': {
                    top: '-12px'
                  }
                }}
              />
              <Tab
                label="Unread"
                value={2}
                sx={{ textTransform: 'none', fontSize: '16px' }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={1}>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Two
          </CustomTabPanel>
        </div>
      </div>
    )
  )
}

export default Notification
