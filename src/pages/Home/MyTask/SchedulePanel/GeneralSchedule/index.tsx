import { DateCalendar } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Button, Divider } from 'antd'
import './style.scss'
import CalendarItem from './CalendarItem'
import { GoogleOutlined } from '@ant-design/icons'
import utc from 'dayjs/plugin/utc'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
interface IGeneralScheduleProps {
  date: Date
  setDate: (event: Date) => void
}

const GeneralSchedule = ({ date, setDate }: IGeneralScheduleProps) => {
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
        >
          Connect Calendar
        </Button>
      </div>
    </div>
  )
}
export default GeneralSchedule
