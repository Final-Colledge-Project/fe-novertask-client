import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import './style.scss'
import { Box, Tab, Tabs } from '@mui/material'
import CustomTabPanel from './components/NotificationItem/CustomTabPanel'
import {
  SyntheticEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import NotificationItem from './components/NotificationItem'
import { INotification } from '~/services/types'
import {
  getMarkReadAllNotification,
  getNotificationByUserId
} from '~/redux/notiSlice/actions'
import { setPopupNotification } from '~/redux/popupSlice'
import { useOnClickOutside } from 'usehooks-ts'

const Notification = () => {
  const popupRef = useRef(null)
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
        // console.log(err)
      }
    }
    getNotification()
  }, [])
  const { notifications } = useSelector(
    (state: StoreType) => state.notification
  )
  const { eventSource } = useSelector((state: StoreType) => state.popup)
  const { data } = notifications
  const handleMarkReadAll = () => {
    const getAllMark = async () => await dispatch(getMarkReadAllNotification())
    getAllMark()
    const getNotification = async () =>
      await dispatch(getNotificationByUserId())
    getNotification()
  }

  // handle click outside the notification popup
  const handleClickOutSide = (event: MouseEvent) => {
    const el = event.target as HTMLElement
    if (!el) return
    // check if the clicked element is the notification button
    if (el.id === 'notification-button' || el.closest('#notification-button')) {
      return // do nothing
    } else {
      dispatch(
        setPopupNotification({
          PopupNotification: PopupNotification,
          eventSource: 'outside'
        })
      )
    }
  }

  // open/close the notification popup
  const handleTogglePopup = () => {
    dispatch(
      setPopupNotification({
        PopupNotification: !PopupNotification,
        eventSource: 'menu'
      })
    )
  }

  useOnClickOutside(popupRef, handleClickOutSide)

  useEffect(() => {
    if (eventSource === 'outside') {
      handleTogglePopup()
    }
  }, [eventSource])

  return (
    PopupNotification && (
      <div className="notification" ref={popupRef}>
        <div className="notification-header">
          <div style={{ fontSize: '20px', fontWeight: '700' }}>
            Notification
          </div>
          <span className="notification-markAll" onClick={handleMarkReadAll}>
            Mark all as read
          </span>
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
