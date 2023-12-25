import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import './style.scss'
import { Box, Tab, Tabs } from '@mui/material'
import CustomTabPanel from './components/NotificationItem/CustomTabPanel'
import { SyntheticEvent, useEffect, useState } from 'react'
import NotificationItem from './components/NotificationItem'
import { UseSelector } from 'react-redux/es/hooks/useSelector'
import { INotification } from '~/services/types'
import { getMarkReadAllNotification, getNotificationByUserId } from '~/redux/notiSlice/actions'

const Notification = () => {
  const { PopupNotification } = useSelector((state: StoreType) => state.popup)
  const [value, setValue] = useState(1)
  const dispatch = useDispatch<StoreDispatchType>()
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  useEffect(() => {
    const getNotification = async () => {
      try {
        await dispatch(getNotificationByUserId())
      } catch (err) {
        console.log(err)
      }
    }
    getNotification()
  }, [])
  const { notifications } = useSelector(
    (state: StoreType) => state.notification
  )
  const { data } = notifications
  const handleMarkReadAll = () => {
    const getAllMark = async() => await dispatch(getMarkReadAllNotification())
    getAllMark()
    const getNotification = async () => await dispatch(getNotificationByUserId())
    getNotification()
  }
  return (
    PopupNotification && (
      <div className="notification">
        <div className="notification-header">
          <div style={{ fontSize: '20px', fontWeight: '700' }}>
            Notification
          </div>
          <span className="notification-markAll" onClick={handleMarkReadAll}>Mark all as read</span>
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
            {data.map((noti: INotification) => (
              <NotificationItem {...noti} />
            ))}
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
