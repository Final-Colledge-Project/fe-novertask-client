import { useState } from 'react'
import MasterCalendar from './MasterCalendar'
import SchedulePanel from './SchedulePanel'
import './style.scss'
import dayjs from 'dayjs'
import useInitSchedule from '~/hooks/useInitSchedule'
const MyTask = () => {
  useInitSchedule()
  const [date, setDate] = useState<Date>(dayjs().toDate())
  return (
    <div className="schedule-container">
      <header className="schedule-header">My task</header>
      <div className="schedule-body">
        <div className="schedule-left">
          <MasterCalendar date={date} setDate={setDate} />
        </div>
        <div className="schedule-right">
          <SchedulePanel date={date} setDate={setDate} />
        </div>
      </div>
    </div>
  )
}

export default MyTask
