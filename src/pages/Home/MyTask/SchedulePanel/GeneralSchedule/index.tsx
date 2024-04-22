import { DateCalendar } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Button, Divider } from 'antd'
import './style.scss'
import CalendarItem from './CalendarItem'
import { GoogleOutlined } from '@ant-design/icons'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useDispatch, useSelector } from 'react-redux'
import { StoreDispatchType, StoreType } from '~/redux'
import {
  getGoogleCalendar,
  syncGoogleEvents
} from '~/redux/scheduleSlice/action'
import { useEffect, useState } from 'react'
interface IGeneralScheduleProps {
  date: Date
  setDate: (event: Date) => void
}

const GeneralSchedule = ({ date, setDate }: IGeneralScheduleProps) => {
  const dispatch = useDispatch<StoreDispatchType>()
  const currentUserInfo = useSelector((state: StoreType) => state.auth.userInfo)
  console.log("🚀 ~ GeneralSchedule ~ currentUserInfo:", currentUserInfo)
  const [isSynced, setIsSynced] = useState(false)
  const handleSyncGoogleEvents = async () => {
    try {
      await dispatch(syncGoogleEvents(currentUserInfo?._id || ''))
      // setIsSynced(true)
    } catch (e) {
      console.log(e)
    }

    // await dispatch(getGoogleCalendar())
  }

  // useEffect(() => {
  //   if (isSynced) {
  //     dispatch(getGoogleCalendar())
  //   }
  // }, [isSynced])

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={dayjs.utc(date)}
          onChange={(newValue) => setDate(newValue)}
        />
      </LocalizationProvider>
      <Divider style={{ margin: 0, border: '0.5px solid #E5E5EA' }} />
      <div className="myCalendar">
        <div style={{ fontSize: '16px', fontWeight: '500' }}>My Calendars</div>
        <CalendarItem />
        <CalendarItem />
        <CalendarItem />
      </div>
      <div>
        <Button
          icon={<GoogleOutlined style={{ fontSize: '18px' }} />}
          className="addCalendar-btn"
          onClick={handleSyncGoogleEvents}
        >
          Connect Calendar
        </Button>
      </div>
    </div>
  )
}
export default GeneralSchedule
